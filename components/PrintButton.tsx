"use client";
import { ArrowIcon } from "./ArrowIcon";
export function PrintButton() {
  return (
    <button className="button dark print-button" onClick={() => window.print()}>
      Print this profile <ArrowIcon direction="down" />
    </button>
  );
}
