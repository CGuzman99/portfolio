"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Tailwind's `sm` breakpoint: at and above it the header shows everything inline.
const INLINE_QUERY = "(min-width: 40rem)";

/**
 * The header's menu below `sm`: a button that opens a panel from the top with
 * the nav and both toggles. The panel is a modal dialog, so focus is trapped
 * in it, Escape and a click on the backdrop close it, and focus returns to the
 * button.
 *
 * Its contents come from the server as `brand` and `children`; this component
 * only owns the open state.
 */
export function MobileMenu({
  label,
  closeLabel,
  brand,
  children,
}: {
  label: string;
  closeLabel: string;
  brand: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Widening past `sm` hides the trigger, so close a panel left open.
  useEffect(() => {
    const query = window.matchMedia(INLINE_QUERY);
    const close = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  // Any link in the panel navigates (or is the current page), so close then.
  function closeOnLink(event: MouseEvent) {
    if ((event.target as Element).closest("a[href]")) setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label={label} />}
      >
        <MenuIcon aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side="top"
        className="gap-0 bg-background shadow-none"
        onClick={closeOnLink}
      >
        <SheetTitle className="sr-only">{label}</SheetTitle>
        {/* Mirrors the header row, so the panel reads as the bar unfolding. */}
        <div className="mx-auto flex h-(--header-height) w-full max-w-5xl items-center justify-between px-6">
          {brand}
          <SheetClose
            render={
              <Button variant="ghost" size="icon-sm" aria-label={closeLabel} />
            }
          >
            <XIcon aria-hidden="true" />
          </SheetClose>
        </div>
        <div className="mx-auto w-full max-w-5xl px-6 pb-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
