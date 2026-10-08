import { FlowFigure } from "./flow-figure";

/** Fibrant: how the AI analyst answers a question about a portfolio. */
export function FibrantAnalystFigure() {
  return (
    <FlowFigure
      name="fibrantAnalyst"
      rows={[
        [{ id: "question", note: true }],
        [{ id: "model", note: true }],
        [{ id: "prompt", note: true }, { id: "memory", note: true }],
        [{ id: "tools", note: true, highlight: true }],
        [{ id: "data", note: true }],
        [{ id: "answer" }],
      ]}
      edges={[
        ["question", "model"],
        ["model", "prompt"],
        ["model", "memory"],
        ["prompt", "tools"],
        ["memory", "tools"],
        ["tools", "data"],
        ["data", "answer"],
      ]}
    />
  );
}
