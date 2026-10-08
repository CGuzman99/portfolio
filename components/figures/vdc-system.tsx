import { FlowFigure } from "./flow-figure";

/** VDC Plugins: the add-in, its licensing gate and the subscription side. */
export function VdcSystemFigure() {
  return (
    <FlowFigure
      name="vdcSystem"
      rows={[
        [{ id: "storefront", note: true }],
        [{ id: "addin", note: true }],
        [{ id: "gate", note: true, highlight: true }],
        [{ id: "registry", note: true }],
        [{ id: "subscriptions", note: true }],
        [{ id: "webhooks", note: true }],
      ]}
      edges={[
        ["storefront", "addin"],
        ["addin", "gate"],
        ["gate", "registry"],
        ["registry", "subscriptions"],
        ["webhooks", "subscriptions"],
      ]}
    />
  );
}
