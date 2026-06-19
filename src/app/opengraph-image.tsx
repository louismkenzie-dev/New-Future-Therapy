import { ImageResponse } from "next/og";

/* Branded social/search link-preview card. Cream ground, the line-veined sage
   leaf mark, the stacked wordmark and the practice promise — matching the site
   chrome. Fonts are fetched at build with a graceful fallback to the default. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "NewFuture Therapy — Counselling & Couples Therapy in Wakefield & Online";

const CREAM = "#F5F3EF";
const SAGE = "#6B8C6F";
const SAGE_DARK = "#3A5A40";
const SAGE_LIGHT = "#C4D9C6";
const CHARCOAL = "#2D2926";
const MUTED = "#5C5651";

const LEAF_PATH = "M90 200 C20 150 10 80 90 20 C170 80 160 150 90 200Z";
const VEINS = [
  "M90 200 L90 28",
  "M90 120 L52 82",
  "M90 142 L128 102",
  "M90 162 L57 132",
  "M90 100 L124 72",
];

/* Google Fonts CSS2 serves TTF when no modern User-Agent is sent, which Satori
   can consume. Subset to the glyphs we draw to keep the payload small. */
async function loadFont(
  family: string,
  weight: number,
  text: string
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(
      text
    )}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!src) return null;
    return await (await fetch(src[1])).arrayBuffer();
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [cormorant, dmSans] = await Promise.all([
    loadFont("Cormorant+Garamond", 600, "NewFuture"),
    loadFont("DM+Sans", 500, "THERAPYCounseling&uplsCprWkfdOniBA "),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" }[] = [];
  if (cormorant) fonts.push({ name: "Cormorant", data: cormorant, weight: 600, style: "normal" });
  if (dmSans) fonts.push({ name: "DM Sans", data: dmSans, weight: 500, style: "normal" });

  const serif = cormorant ? "Cormorant" : "serif";
  const sans = dmSans ? "DM Sans" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: CREAM,
          position: "relative",
        }}
      >
        {/* Soft sage decoration */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 520,
            backgroundColor: SAGE_LIGHT,
            opacity: 0.35,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -180,
            left: -140,
            width: 460,
            height: 460,
            borderRadius: 460,
            backgroundColor: SAGE_LIGHT,
            opacity: 0.3,
            display: "flex",
          }}
        />

        {/* Leaf mark */}
        <svg width="132" height="161" viewBox="0 0 180 220" style={{ marginBottom: 28 }}>
          <path d={LEAF_PATH} fill={SAGE} stroke={SAGE_DARK} strokeWidth="3" />
          {VEINS.map((d, i) => (
            <path key={i} d={d} stroke={CREAM} strokeWidth="2.6" fill="none" opacity="0.85" />
          ))}
        </svg>

        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={{ fontFamily: serif, fontSize: 86, color: CHARCOAL, lineHeight: 1 }}>
            NewFuture
          </span>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: sans,
            fontSize: 26,
            letterSpacing: 14,
            color: SAGE_DARK,
            marginTop: 10,
          }}
        >
          THERAPY
        </div>

        {/* Divider */}
        <div
          style={{
            width: 64,
            height: 2,
            backgroundColor: SAGE,
            margin: "40px 0 28px",
            display: "flex",
          }}
        />

        {/* Promise */}
        <div
          style={{
            display: "flex",
            fontFamily: sans,
            fontSize: 32,
            color: MUTED,
            textAlign: "center",
          }}
        >
          Counselling &amp; Couples Therapy
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: sans,
            fontSize: 22,
            color: SAGE_DARK,
            letterSpacing: 2,
            marginTop: 16,
          }}
        >
          Wakefield &amp; Online  ·  Registered with BACP
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
