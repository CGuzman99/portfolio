import { FlowFigure } from "./flow-figure";

/** F1 Forecast Lab: from FastF1 data to the predicted-vs-actual dashboard. */
export function F1PipelineFigure() {
  return (
    <FlowFigure
      name="f1Pipeline"
      rows={[
        [{ id: "ingestion", note: true }],
        [{ id: "leakage" }],
        [{ id: "models", note: true, highlight: true }],
        [{ id: "backtests", note: true }],
        [{ id: "cli", note: true }],
        [{ id: "sync" }],
        [{ id: "dashboard", note: true }],
      ]}
      edges={[
        ["ingestion", "leakage"],
        ["leakage", "models"],
        ["models", "backtests"],
        ["backtests", "cli"],
        ["cli", "sync"],
        ["sync", "dashboard"],
      ]}
    />
  );
}
