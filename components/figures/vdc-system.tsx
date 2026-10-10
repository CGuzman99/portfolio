import { FlowFigure } from "./flow-figure";

/** VDC Plugins: the add-in, its licence check and the subscription side. */
export function VdcSystemFigure() {
  return (
    <FlowFigure
      name="vdcSystem"
      rows={[
        [{ id: "storefront", note: true }],
        [{ id: "addin", note: true }],
        [{ id: "gate", note: true, highlight: true }],
        [{ id: "subscriptions", note: true }],
      ]}
      edges={[
        ["storefront", "addin"],
        ["addin", "gate"],
        ["gate", "subscriptions"],
      ]}
    />
  );
}
