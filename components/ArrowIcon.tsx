type ArrowDirection = "up-right" | "down-right" | "down" | "left";

const paths: Record<ArrowDirection, string> = {
  "up-right": "M5 19 19 5M8 5h11v11",
  "down-right": "M5 5 19 19M8 19h11V8",
  down: "M12 4v16m-7-7 7 7 7-7",
  left: "M20 12H4m7-7-7 7 7 7",
};

export function ArrowIcon({ direction = "up-right" }: { direction?: ArrowDirection }) {
  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

export function SparkIcon() {
  return (
    <svg
      className="contact-asterisk"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M24 4v40M4 24h40M10 10l28 28M38 10 10 38" />
    </svg>
  );
}
