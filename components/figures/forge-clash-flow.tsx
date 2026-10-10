import { FlowFigure } from "./flow-figure";

/** Forge Clash Insight: from a signed-in model to scored, explained clashes. */
export function ForgeClashFlowFigure() {
  return (
    <FlowFigure
      name="forgeClashFlow"
      rows={[
        [{ id: "signin", note: true }],
        [{ id: "processing", note: true }],
        [{ id: "detection", note: true, highlight: true }],
        [{ id: "scoring", note: true }],
        [{ id: "viewer", note: true }, { id: "llm", note: true }],
      ]}
      edges={[
        ["signin", "processing"],
        ["processing", "detection"],
        ["detection", "scoring"],
        ["scoring", "viewer"],
        ["scoring", "llm"],
      ]}
    />
  );
}
