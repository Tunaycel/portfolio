// Controlled lab measurements, 3 September 2026. Seconds, rounded to one decimal.
// Public summary only: no infrastructure identifiers or raw security logs.
export const trials = [
  { id: 1, ingestion: 61.9, detection: 426.2, response: 13.1, total: 501.2 },
  { id: 2, ingestion: 76.8, detection: 300.7, response: 12.5, total: 390.0 },
  { id: 3, ingestion: 85.9, detection: 424.3, response: 10.3, total: 520.5 },
  { id: 4, ingestion: 74.9, detection: 532.6, response: 13.0, total: 620.5 },
  { id: 5, ingestion: 77.9, detection: 288.1, response: 13.4, total: 379.3 },
] as const;
export function median(values: readonly number[]) {
  if (!values.length) throw new Error("A median requires observations");
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}
export const researchMetrics = {
  response: median(trials.map((t) => t.response)),
  total: median(trials.map((t) => t.total)),
  detection: median(trials.map((t) => t.detection)),
};
