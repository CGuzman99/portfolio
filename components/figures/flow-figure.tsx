import type { Messages } from "next-intl";
import { getMessages } from "next-intl/server";
import { FlowDiagram } from "./flow-diagram";

type FigureName = keyof Messages["figures"];
type NodeSpec = { id: string; note?: boolean; highlight?: boolean };

/**
 * A FlowDiagram whose words all come from messages/{en,es}.json, under
 * `figures.<name>`: `title`, `description`, and `<node>.label` (plus
 * `<node>.note` where the spec asks for one). Each figure file only says how
 * the nodes are arranged and joined.
 */
export async function FlowFigure({
  name,
  rows,
  edges,
}: {
  name: FigureName;
  rows: NodeSpec[][];
  edges: [string, string][];
}) {
  // Node ids are data, not literal keys, so the strings are read as one
  // object; a missing label fails the build below rather than rendering blank.
  const strings = (await getMessages()).figures[name];
  const nodes = strings as unknown as Record<string, { label?: string; note?: string }>;
  const text = (id: string, field: "label" | "note") => {
    const value = nodes[id]?.[field];
    if (!value) throw new Error(`messages: figures.${name}.${id}.${field} is missing`);
    return value;
  };

  return (
    <FlowDiagram
      id={`fig-${name}`}
      title={strings.title}
      description={strings.description}
      rows={rows.map((row) =>
        row.map(({ id, note, highlight }) => ({
          id,
          highlight,
          label: text(id, "label"),
          note: note ? text(id, "note") : undefined,
        })),
      )}
      edges={edges}
    />
  );
}
