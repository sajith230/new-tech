"use client";

import React from "react";
import { Rocket } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./Dialog";

type ComingSoonProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ComingSoon: React.FC<ComingSoonProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onClose={() => onOpenChange(false)}
        className="border-primary/30 max-w-[90vw] rounded-2xl border p-[2.5em] text-center text-[12px] shadow-2xl sm:text-[13px] md:text-[14px] lg:text-[15px] xl:text-[16px]"
      >
        <div className="from-primary/25 mx-auto mb-[1.2em] flex size-[4em] items-center justify-center rounded-full bg-radial to-transparent">
          <div className="bg-primary text-primary-foreground flex size-[2.6em] items-center justify-center rounded-full">
            <Rocket className="size-[1.4em]" />
          </div>
        </div>

        <DialogTitle className="font-primary text-foreground text-[2em] font-semibold tracking-wide uppercase">
          Coming Soon
        </DialogTitle>

        <DialogDescription className="text-muted-foreground mt-[0.8em] text-[1.1em] leading-relaxed">
          The forum is under construction and will be launching shortly. Stay
          tuned — we can&apos;t wait to have you in the community!
        </DialogDescription>

        <button
          onClick={() => onOpenChange(false)}
          className="font-secondary bg-primary text-primary-foreground hover:bg-primary/90 mt-[1.8em] rounded-full px-[2.2em] py-[0.7em] text-[1em] font-medium uppercase transition-colors"
        >
          Got it
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default ComingSoon;
