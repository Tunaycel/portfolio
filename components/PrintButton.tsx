"use client";
export function PrintButton() {
  return (
    <button className="button dark print-button" onClick={() => window.print()}>
      Print / save as PDF ↓
    </button>
  );
}
