import type { ComponentType } from "react";
import { ExpressusCheckoutFigure } from "./expressus-checkout";
import { F1PipelineFigure } from "./f1-pipeline";
import { FibrantAnalystFigure } from "./fibrant-analyst";
import { ForgeClashFlowFigure } from "./forge-clash-flow";
import { VdcSystemFigure } from "./vdc-system";

export {
  ExpressusCheckoutFigure,
  F1PipelineFigure,
  FibrantAnalystFigure,
  ForgeClashFlowFigure,
  VdcSystemFigure,
};

/** The figures a project's `hero: { kind: "figure", src }` may name. */
export const figures: Record<string, ComponentType> = {
  "fibrant-analyst": FibrantAnalystFigure,
  "vdc-system": VdcSystemFigure,
  "f1-pipeline": F1PipelineFigure,
  "expressus-checkout": ExpressusCheckoutFigure,
  "forge-clash-flow": ForgeClashFlowFigure,
};
