# NewFuture Therapy — SEO Playbook

The repeatable method for getting pages onto the first page of Google, adapted
from Stephen Baker's "first page in under a week" approach and tailored to a
local therapy practice (Wakefield & Online).

The site is already built to support this: an **Articles** section
(`src/lib/content/articles.ts`) and a **local landing page**
(`/counselling-wakefield`), both with proper titles, canonicals, headings,
internal links and schema. This doc covers the recurring loop and the two
steps that run on **your** accounts (keyword research + Search Console).

---

## The loop (repeat per target page)

### 1. Find low-competition, high-volume keywords

1. Go to **semrush.com** → sign up for a free trial → open the **Keyword Magic Tool**.
2. Enter a **broad umbrella term** for the practice, e.g. `counselling`, `therapy`,
   `couples therapy`, `anxiety`. (Broad first — it surfaces more of the long tail.)
3. **Filter by Keyword Difficulty (KD)** and sort to the lowest (aim for **KD 0–20**).
4. Note the **Volume** column (approx. monthly searches).
5. Pick **5–10** keywords that are low difficulty *and* relevant to what we offer.
6. Put them in a Google Sheet with their volumes and **total them up**. Aim for a
   **combined volume above ~500/month** before committing a page to that cluster.

**Starter clusters to validate** (these tend to be low-competition for a local
practice — confirm the real numbers in Semrush):

- **Local service**: `counselling Wakefield`, `therapist Wakefield`,
  `couples counselling Wakefield`, `anxiety counselling Wakefield`,
  `online counselling UK` → already targeted by `/counselling-wakefield`.
- **Couples / relationships**: `when to seek couples counselling`,
  `signs you need couples therapy`, `relationship counselling near me`
  → article: *How to Know When It Is Time for Couples Counselling*.
- **Getting started**: `what to expect first therapy session`,
  `starting therapy nervous`, `do I need a GP referral for counselling`
  → article: *What to Expect From Your First Therapy Session*.
- **Next ideas to build**: `online therapy vs in person`,
  `how to support a partner with anxiety`, `signs of burnout`,
  `LGBTQIA+ affirming therapist`, `therapy for low self-esteem`,
  `counselling for life transitions`.

### 2. Create the optimised page

We do **not** paste raw ChatGPT output — the brand rules (British English, no
contractions, inclusive language, single green family) and Google both reward
genuinely useful, human copy. Use AI only to draft a skeleton, then rewrite.

A safe drafting prompt (then edit heavily for brand voice):

> We are NewFuture Therapy, a BACP-registered counselling practice in Wakefield
> offering therapy face to face and online for individuals and couples. I am
> writing an article for people considering therapy. Write a clear, warm,
> non-judgemental ~1,200–1,500 word draft using these keywords naturally:
> [paste your 5–10 keywords]. Use British English, no contractions, and never
> assume a client's gender, sexuality or relationship structure.

**To publish a new article:** add an entry to the `articles` array in
[`src/lib/content/articles.ts`](src/lib/content/articles.ts) (slug, title,
description, keywords, intro, sections, faqs, related). It is automatically
added to `/articles`, gets its own page, schema (Article + Breadcrumb + FAQ),
and is included in the sitemap. Commit and push — Vercel deploys it.

**On-page checklist** (the template already does most of this):
- Target keyword in the **title**, the **H1**, and the **first paragraph**.
- Use **H2s** for sections (the headings are real `<h2>`s).
- Add **internal links** to related pages (the `related` field).
- Keep it genuinely helpful and answer the search intent fully.

### 3. Publish, then request indexing (Google Search Console)

1. Go to **search.google.com/search-console** and add the property
   **`newfuturetherapy.co.uk`** (Domain property is best).
2. Verify ownership. Easiest options:
   - **DNS TXT record** at GoDaddy (Domain property), or
   - **HTML meta tag** — send me the `content="..."` value and I will add it to
     the site `<head>` via Next metadata (`verification.google`), then redeploy.
3. Submit the sitemap once: **`https://newfuturetherapy.co.uk/sitemap.xml`**.
4. For each new page: paste its URL into the top **URL inspection** bar →
   **Request Indexing**. Check back in **2–3 days** to confirm it is indexed.

### 4. Wait, then iterate

Give a new page **3–5 days** to settle. If it is not on page one:
- Add more depth and a few more related keywords to the page.
- Add more **internal links** pointing to it from other pages/articles.
- Earn a few **backlinks** (see below).

---

## Backlinks & local SEO (the biggest extra lever for a local practice)

- **Google Business Profile** — create/claim it for Wakefield. This is the
  single highest-impact local SEO move; it powers the map pack for
  "counselling near me" / "therapist Wakefield".
- **Therapy directories** (high-quality, relevant backlinks + referrals):
  the BACP "Find a Therapist" directory, Counselling Directory
  (counselling-directory.org.uk), Psychology Today UK.
- **Local citations** — consistent Name/Address/Phone on local business listings.

---

## What is already done in the codebase

- Rich metadata, per-page canonicals, OpenGraph/Twitter, `en-GB`.
- `sitemap.xml` (auto-includes new articles) and `robots.txt`.
- JSON-LD: `LocalBusiness`/`ProfessionalService` (home), `Service` + `FAQPage`
  (`/counselling-wakefield`), `Article` + `Breadcrumb` + `FAQPage` (articles).
- Branded OpenGraph image for link previews.
- Articles section + the first two articles, plus the Wakefield landing page,
  linked sitewide from the header/footer.

> To add the Google Search Console verification meta tag, give me the value and
> I will wire `verification: { google: "..." }` into `src/app/layout.tsx`.
