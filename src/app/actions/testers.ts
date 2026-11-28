"use server";

import { after } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { getUser } from "@/lib/auth/session";
import { issueWelcomeToken } from "@/lib/memberInvites";
import { EMAIL_PATTERN, ensureMember, linkCouple } from "@/lib/memberAccounts";
import { isValidTesterKey, testerCap, testerPlacesUsed } from "@/lib/testers";
import { brandedEmail, escapeHtml, sendEmailTo, sendToOwners } from "@/lib/email";
import { LIMITS, TOO_MANY, rateLimitByIp } from "@/lib/rateLimit";
import { MAX, clean } from "@/lib/limits";
import { siteUrl } from "@/lib/siteUrl";

export interface TesterFormState {
  status: "idle" | "success" | "error";
  message?: string;
}

const para = (text: string) => `<p style="margin:0 0 14px;">${text}</p>`;

/* ---------------------------------------------------------------------
   Claim free access from the private tester page
   ------------------------------------------------------------------ */

async function emailAccessLink(opts: {
  userId: string;
  name: string;
  email: string;
  existing: boolean;
  invitedBy?: string;
}): Promise<void> {
  const first = escapeHtml(opts.name.split(" ")[0]);
  // A welcome link even for existing accounts: someone who claimed before
  // but never set a password still needs one, and it only reaches their inbox.
  const url = `${siteUrl()}/welcome/${await issueWelcomeToken(opts.userId)}`;
  const button = "Choose Your Password";

  const intro = opts.invitedBy
    ? `${escapeHtml(opts.invitedBy)} has invited you to try <strong style="color:#3A5A40;">Growing Together</strong>, our online relationship programme for couples, with them. Your place is completely free of charge.`
    : `Thank you for agreeing to try <strong style="color:#3A5A40;">Growing Together</strong>, our online relationship programme for couples. Your place is completely free of charge.`;
  const next = opts.existing
    ? "You already have an account with us, so free access has simply been added to it. Sign in as usual, or use the button below to choose a new password. The link works once and lasts for fourteen days."
    : "Choose a password using the button below and you will go straight in. The link works once and lasts for fourteen days.";

  await sendEmailTo(opts.email, {
    subject: opts.invitedBy
      ? `${opts.invitedBy.split(" ")[0]} has invited you to Growing Together`
      : "Your free access to Growing Together",
    html: brandedEmail({
      heading: `Welcome, ${opts.name.split(" ")[0]}`,
      bodyHtml:
        para(`Hello ${first},`) +
        para(intro) +
        para(next) +
        para(
          "Work through it at your own pace. When you are ready, we would love your honest feedback: there is a feedback form on your invitation page and in your course area."
        ) +
        para("With warm wishes,<br />Laura &amp; Esther"),
      button: { label: button, url },
    }),
    text: `Hello ${opts.name.split(" ")[0]},

${intro.replace(/<[^>]+>/g, "")}

${next}

${button}: ${url}

With warm wishes,
Laura & Esther
NewFuture Therapy`,
  });
}

export async function claimTesterAccess(_prev: TesterFormState, formData: FormData): Promise<TesterFormState> {
  if (clean(formData.get("website"), MAX.shortText)) return { status: "success" };
  if (!(await isValidTesterKey(formData.get("key")?.toString() ?? ""))) {
    return { status: "error", message: "This invitation link is no longer active. Please ask Laura or Esther for a new one." };
  }
  if (!(await rateLimitByIp(LIMITS.testerClaim))) return { status: "error", message: TOO_MANY };

  const name = clean(formData.get("name"), MAX.name);
  const email = clean(formData.get("email"), MAX.email).toLowerCase();
  const partnerName = clean(formData.get("partner-name"), MAX.name);
  const partnerEmail = clean(formData.get("partner-email"), MAX.email).toLowerCase();
  const withPartner = Boolean(partnerName || partnerEmail);

  if (!name || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please give your first name and a valid email address." };
  }
  if (withPartner && (!partnerName || !EMAIL_PATTERN.test(partnerEmail))) {
    return {
      status: "error",
      message: "Please give your partner's first name and a valid email address, or leave both partner fields empty.",
    };
  }
  if (withPartner && email === partnerEmail) {
    return { status: "error", message: "The two email addresses are the same. Each person needs their own." };
  }
  if (formData.get("consent")?.toString() !== "on") {
    return { status: "error", message: "Please tick the box so we have your permission to set up your account." };
  }

  const [cap, used] = await Promise.all([testerCap(), testerPlacesUsed()]);
  if (used + (withPartner ? 2 : 1) > cap) {
    return {
      status: "error",
      message:
        "All of the free tester places have now been taken. Thank you so much for your interest. Please get in touch with Laura or Esther directly.",
    };
  }

  try {
    const you = await ensureMember(name, email);
    const partner = withPartner ? await ensureMember(partnerName, partnerEmail) : null;
    const link = partner ? await linkCouple(you.id, partner.id) : null;

    await supabaseAdmin().from("tester_signups").insert({
      name,
      email,
      partner_name: partner ? partnerName : null,
      partner_email: partner ? partnerEmail : null,
      user_id: you.id,
      partner_user_id: partner?.id ?? null,
      linked_as_couple: link === "linked" || link === "already",
    });

    await emailAccessLink({ userId: you.id, name, email, existing: you.existing });
    if (partner) {
      await emailAccessLink({ userId: partner.id, name: partnerName, email: partnerEmail, existing: partner.existing, invitedBy: name });
    }

    after(() =>
      sendToOwners({
        subject: `New programme tester: ${name}${partner ? ` and ${partnerName}` : ""}`,
        html: brandedEmail({
          heading: "A New Tester Has Joined",
          bodyHtml:
            para(
              `<strong style="color:#3A5A40;">${escapeHtml(name)}</strong> (${escapeHtml(email)}) has claimed free access from the private tester page.`
            ) +
            (partner
              ? para(
                  `Their partner <strong style="color:#3A5A40;">${escapeHtml(partnerName)}</strong> (${escapeHtml(partnerEmail)}) has access too${
                    link === "conflict" ? ", but one of them was already linked to someone else, so they are not linked as a couple yet" : " and they are linked as a couple"
                  }.`
                )
              : "") +
            para(`${used + (partner ? 2 : 1)} of ${cap} free places are now taken.`),
          button: { label: "See All Testers", url: `${siteUrl()}/admin/testers` },
        }),
        text: `${name} (${email}) claimed free access from the private tester page.${
          partner ? ` Partner: ${partnerName} (${partnerEmail}).` : ""
        } ${used + (partner ? 2 : 1)} of ${cap} places are now taken. ${siteUrl()}/admin/testers`,
      })
    );
  } catch (error) {
    console.error("Tester claim failed:", error);
    return { status: "error", message: "Something went wrong setting up your access. Please try again in a moment." };
  }

  return {
    status: "success",
    message: withPartner
      ? `You are all set. We have emailed you and ${partnerName} a link to get started. If it has not arrived in a few minutes, please check your spam folder.`
      : "You are all set. We have emailed you a link to get started. If it has not arrived in a few minutes, please check your spam folder.",
  };
}

/* ---------------------------------------------------------------------
   Feedback (private page or member area)
   ------------------------------------------------------------------ */

export async function submitFeedback(_prev: TesterFormState, formData: FormData): Promise<TesterFormState> {
  if (clean(formData.get("website"), MAX.shortText)) return { status: "success" };

  // Either the private page's key or a signed-in member: never an open form.
  const user = await getUser();
  if (!user && !(await isValidTesterKey(formData.get("key")?.toString() ?? ""))) {
    return { status: "error", message: "Please sign in, or use the link Laura and Esther sent you, to share feedback." };
  }
  if (!(await rateLimitByIp(LIMITS.feedback))) return { status: "error", message: TOO_MANY };

  const name = clean(formData.get("name"), MAX.name) || user?.profile.displayName || "";
  const email = (clean(formData.get("email"), MAX.email) || user?.email || "").toLowerCase();
  const ratingRaw = Number(formData.get("rating"));
  const rating = Number.isInteger(ratingRaw) && ratingRaw >= 1 && ratingRaw <= 5 ? ratingRaw : null;
  const progress = clean(formData.get("progress"), MAX.shortText);
  const workedWell = clean(formData.get("worked-well"), MAX.message);
  const couldImprove = clean(formData.get("could-improve"), MAX.message);
  const professionalView = clean(formData.get("professional-view"), MAX.message);
  const partnerInterest = formData.get("partner-interest")?.toString() === "on";
  const mayQuote = formData.get("may-quote")?.toString() === "on";

  if (!name || !EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please give your name and a valid email address so we can thank you." };
  }
  if (!rating && !workedWell && !couldImprove && !professionalView && !partnerInterest) {
    return { status: "error", message: "Please share a little feedback, or tick the referral partnership box." };
  }

  const { error } = await supabaseAdmin().from("programme_feedback").insert({
    user_id: user?.id ?? null,
    name,
    email,
    rating,
    progress: progress || null,
    worked_well: workedWell || null,
    could_improve: couldImprove || null,
    professional_view: professionalView || null,
    partner_interest: partnerInterest,
    may_quote: mayQuote,
  });
  if (error) {
    console.error("Feedback save failed:", error);
    return { status: "error", message: "Something went wrong sending your feedback. Please try again in a moment." };
  }

  const block = (label: string, value: string) =>
    value
      ? `<p style="margin:18px 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#3A5A40;">${label}</p>` +
        `<p style="margin:0;white-space:pre-wrap;color:#2D2926;">${escapeHtml(value)}</p>`
      : "";
  const textBlock = (label: string, value: string) => (value ? `\n${label}\n${value}\n` : "");

  after(() =>
    sendToOwners({
      subject: `Programme feedback from ${name}${partnerInterest ? " (interested in referrals)" : ""}`,
      replyTo: email,
      html: brandedEmail({
        heading: "New Programme Feedback",
        bodyHtml:
          para(`From <strong style="color:#3A5A40;">${escapeHtml(name)}</strong> (${escapeHtml(email)}). Reply to this email to answer them directly.`) +
          block("Overall rating", rating ? `${rating} out of 5` : "") +
          block("How far they have got", progress) +
          block("What worked well", workedWell) +
          block("What could be better", couldImprove) +
          block("Professional perspective", professionalView) +
          block("Referral partnership", partnerInterest ? "Yes, they would like to talk about becoming a referral partner." : "") +
          block("Quoting", mayQuote ? "They are happy for their feedback to be quoted anonymously." : "Please do not quote this feedback."),
        button: { label: "See All Feedback", url: `${siteUrl()}/admin/testers` },
      }),
      text:
        `Programme feedback from ${name} (${email})\n` +
        textBlock("Overall rating", rating ? `${rating} out of 5` : "") +
        textBlock("How far they have got", progress) +
        textBlock("What worked well", workedWell) +
        textBlock("What could be better", couldImprove) +
        textBlock("Professional perspective", professionalView) +
        textBlock("Referral partnership", partnerInterest ? "Interested in becoming a referral partner." : "") +
        `\nQuoting: ${mayQuote ? "happy to be quoted anonymously" : "do not quote"}\n\nAll feedback: ${siteUrl()}/admin/testers`,
    }).catch((err) => console.error("Feedback email failed:", err))
  );

  return {
    status: "success",
    message: "Thank you so much. Your feedback has gone straight to Laura and Esther, and it means a great deal to them.",
  };
}
