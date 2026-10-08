import { FlowFigure } from "./flow-figure";

/** Expressus Café: a guest's cart through to paid stock changes. */
export function ExpressusCheckoutFigure() {
  return (
    <FlowFigure
      name="expressusCheckout"
      rows={[
        [{ id: "cart", note: true }],
        [{ id: "shipping", note: true }],
        [{ id: "totals", note: true, highlight: true }],
        [{ id: "checkout" }],
        [{ id: "webhook" }],
        [{ id: "stock", note: true }],
      ]}
      edges={[
        ["cart", "shipping"],
        ["shipping", "totals"],
        ["totals", "checkout"],
        ["checkout", "webhook"],
        ["webhook", "stock"],
      ]}
    />
  );
}
