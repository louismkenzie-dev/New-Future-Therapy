import "server-only";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
} from "@react-pdf/renderer";
import type { Resource } from "@/lib/dal/resources";
import { RESOURCE_TYPE_LABELS } from "@/lib/dal/resources";
import { parseArticleBody } from "@/lib/resources/articleBody";

/* Branded PDF for written resources — downloaded from the public library.
   Uses the built-in Times (serif, standing in for Cormorant Garamond) and
   Helvetica faces so no font files need bundling in serverless. */

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F5F3EF",
    paddingTop: 56,
    paddingBottom: 72,
    paddingHorizontal: 60,
    fontFamily: "Helvetica",
    color: "#2D2926",
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 2.5,
    color: "#3A5A40",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  title: {
    fontFamily: "Times-Roman",
    fontSize: 28,
    lineHeight: 1.2,
    marginBottom: 10,
  },
  description: {
    fontSize: 11,
    lineHeight: 1.6,
    color: "#5C5651",
    marginBottom: 6,
  },
  rule: {
    height: 2,
    width: 32,
    backgroundColor: "#6B8C6F",
    marginTop: 14,
    marginBottom: 22,
  },
  heading: {
    fontFamily: "Times-Roman",
    fontSize: 17,
    lineHeight: 1.3,
    marginTop: 14,
    marginBottom: 8,
    color: "#2D2926",
  },
  paragraph: {
    fontSize: 10.5,
    lineHeight: 1.75,
    color: "#5C5651",
    marginBottom: 9,
  },
  bulletRow: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 2,
  },
  bulletDash: {
    width: 14,
    height: 1.5,
    backgroundColor: "#6B8C6F",
    marginTop: 6,
    marginRight: 8,
  },
  bulletText: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 1.6,
    color: "#5C5651",
  },
  footer: {
    position: "absolute",
    bottom: 36,
    left: 60,
    right: 60,
    borderTopWidth: 1,
    borderTopColor: "#E4E0DB",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 8.5,
    color: "#5C5651",
  },
  footerBrand: {
    fontSize: 8.5,
    color: "#3A5A40",
  },
});

function ResourcePdf({ resource }: { resource: Resource }) {
  const blocks = parseArticleBody(resource.body ?? "");
  return (
    <Document
      title={resource.title}
      author="NewFuture Therapy"
      subject={resource.description}
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.eyebrow}>
          Client Resources — {RESOURCE_TYPE_LABELS[resource.resourceType]}
        </Text>
        <Text style={styles.title}>{resource.title}</Text>
        {resource.description !== "" && (
          <Text style={styles.description}>{resource.description}</Text>
        )}
        <View style={styles.rule} />

        {blocks.map((block, i) => {
          if (block.kind === "heading") {
            return (
              <Text key={i} style={styles.heading}>
                {block.text}
              </Text>
            );
          }
          if (block.kind === "bullets") {
            return (
              <View key={i}>
                {block.items.map((item, j) => (
                  <View key={j} style={styles.bulletRow}>
                    <View style={styles.bulletDash} />
                    <Text style={styles.bulletText}>{item}</Text>
                  </View>
                ))}
              </View>
            );
          }
          return (
            <Text key={i} style={styles.paragraph}>
              {block.text}
            </Text>
          );
        })}

        <View style={styles.footer} fixed>
          <Text style={styles.footerBrand}>NewFuture Therapy</Text>
          <Text style={styles.footerText}>
            Wakefield &amp; Online — Registered with BACP
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function renderResourcePdf(resource: Resource): Promise<Buffer> {
  return renderToBuffer(<ResourcePdf resource={resource} />);
}
