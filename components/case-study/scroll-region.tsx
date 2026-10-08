import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Code blocks and tables scroll sideways on a phone, so keyboard users need to
 * reach them (tabIndex). Inside a Figure or CodeExcerpt they also become a
 * named region, labelled by that frame's caption; a bare block has no caption
 * to borrow, and a region without a name is worse than none, so it stays a
 * plain focusable element.
 */
type Labelled = { labelledBy?: string };

const focusRing =
  "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring";

export function ScrollPre({
  labelledBy,
  ...props
}: ComponentProps<"pre"> & Labelled) {
  return (
    <pre
      tabIndex={0}
      {...(labelledBy && { role: "region", "aria-labelledby": labelledBy })}
      {...props}
    />
  );
}

export function ScrollTable({
  labelledBy,
  ...props
}: ComponentProps<"table"> & Labelled) {
  return (
    <div
      className={cn("overflow-x-auto", focusRing)}
      tabIndex={0}
      {...(labelledBy && { role: "region", "aria-labelledby": labelledBy })}
    >
      <table {...props} />
    </div>
  );
}

/** Passes `labelledBy` to every ScrollPre and ScrollTable in `children`. */
export function labelScrollRegions(
  children: ReactNode,
  labelledBy: string,
): ReactNode {
  return Children.map(children, (child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return child;
    if (child.type === ScrollPre || child.type === ScrollTable) {
      return cloneElement(child as ReactElement<Labelled>, {
        labelledBy,
      });
    }
    if (child.props.children === undefined) return child;
    return cloneElement(child, {
      children: labelScrollRegions(child.props.children, labelledBy),
    });
  });
}
