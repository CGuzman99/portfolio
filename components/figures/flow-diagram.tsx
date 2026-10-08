/**
 * The one drawing primitive behind every diagram in components/figures/: a
 * top-to-bottom flow of boxed nodes in rows, joined by arrows.
 *
 * Every colour is a theme token (`fill-background`, `stroke-border`,
 * `fill-muted-foreground`, `stroke-brand`…), so a diagram follows the light
 * and dark themes without a single hex value. The SVG is one image to
 * assistive technology: `role="img"`, named by its <title> and described by
 * its <desc>, which spells the flow out in words.
 *
 * The viewBox is narrow (400 units) and the figure is capped at 32rem, so the
 * mono notes stay readable from a 320px phone (about 8.5px) to the desktop column
 * (about 15px).
 */

export type FlowNode = {
  id: string;
  label: string;
  note?: string;
  /** The one node the diagram is about, drawn in the brand colour. */
  highlight?: boolean;
};

const WIDTH = 400;
const PAD = 12;
const GAP_X = 12;
const GAP_Y = 28;
const NODE_HEIGHT = 48;
const NODE_HEIGHT_PLAIN = 34;

type Box = { x: number; y: number; w: number; h: number };

function layout(rows: FlowNode[][]) {
  const boxes = new Map<string, Box>();
  let y = PAD;
  for (const row of rows) {
    const h = row.some((n) => n.note) ? NODE_HEIGHT : NODE_HEIGHT_PLAIN;
    const w = (WIDTH - 2 * PAD - (row.length - 1) * GAP_X) / row.length;
    row.forEach((node, i) => {
      boxes.set(node.id, { x: PAD + i * (w + GAP_X), y, w, h });
    });
    y += h + GAP_Y;
  }
  return { boxes, height: y - GAP_Y + PAD };
}

/** A straight arrow from one box's edge to the other's, top or bottom. */
function arrowPoints(from: Box, to: Box) {
  const x1 = from.x + from.w / 2;
  const x2 = to.x + to.w / 2;
  const down = to.y > from.y;
  const y1 = down ? from.y + from.h : from.y;
  // Stop short of the box so the arrowhead sits on its edge, not inside it.
  const y2 = down ? to.y - 2 : to.y + to.h + 2;
  return { x1, y1, x2, y2 };
}

export function FlowDiagram({
  id,
  title,
  description,
  rows,
  edges,
}: {
  /** Unique on the page: prefixes the title, desc and marker ids. */
  id: string;
  title: string;
  description: string;
  rows: FlowNode[][];
  /** [from, to] node ids. Rows are top to bottom; an edge may point up. */
  edges: [string, string][];
}) {
  const { boxes, height } = layout(rows);
  const nodes = rows.flat();
  const marker = `${id}-arrow`;

  return (
    <svg
      role="img"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-desc`}
      viewBox={`0 0 ${WIDTH} ${height}`}
      className="mx-auto block h-auto w-full max-w-lg bg-background font-mono"
    >
      <title id={`${id}-title`}>{title}</title>
      <desc id={`${id}-desc`}>{description}</desc>
      <defs>
        <marker
          id={marker}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L8 4 L0 8 z" className="fill-muted-foreground" />
        </marker>
      </defs>

      {edges.map(([from, to]) => {
        const a = boxes.get(from);
        const b = boxes.get(to);
        if (!a || !b) throw new Error(`${id}: unknown edge ${from} → ${to}`);
        return (
          <line
            key={`${from}-${to}`}
            {...arrowPoints(a, b)}
            className="stroke-muted-foreground"
            strokeWidth={1}
            markerEnd={`url(#${marker})`}
          />
        );
      })}

      {nodes.map((node) => {
        const box = boxes.get(node.id)!;
        const cx = box.x + box.w / 2;
        return (
          <g key={node.id}>
            <rect
              x={box.x}
              y={box.y}
              width={box.w}
              height={box.h}
              rx={2}
              className={
                node.highlight
                  ? "fill-background stroke-brand"
                  : "fill-background stroke-border"
              }
              strokeWidth={node.highlight ? 1.5 : 1}
            />
            <text
              x={cx}
              y={node.note ? box.y + 20 : box.y + box.h / 2 + 4}
              textAnchor="middle"
              fontSize={13}
              className={node.highlight ? "fill-brand" : "fill-foreground"}
            >
              {node.label}
            </text>
            {node.note && (
              <text
                x={cx}
                y={box.y + 36}
                textAnchor="middle"
                fontSize={11.5}
                className="fill-muted-foreground"
              >
                {node.note}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
