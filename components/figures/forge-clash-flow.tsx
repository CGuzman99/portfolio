import { FlowFigure } from "./flow-figure";

/** Forge Clash Insight: from a signed-in model to scored, explained clashes. */
export function ForgeClashFlowFigure() {
  return (
    <FlowFigure
      name="forgeClashFlow"
      rows={[
        [{ id: "signin", note: true }],
        [{ id: "processing" }],
        [{ id: "gjk", highlight: true }],
        [{ id: "severity" }],
        [{ id: "viewer", note: true }, { id: "llm", note: true }],
      ]}
      edges={[
        ["signin", "processing"],
        ["processing", "gjk"],
        ["gjk", "severity"],
        ["severity", "viewer"],
        ["severity", "llm"],
      ]}
    />
  );
}
