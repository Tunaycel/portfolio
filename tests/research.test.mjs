import test from "node:test";
import assert from "node:assert/strict";
import { trials, median, researchMetrics } from "../lib/research.ts";
test("research medians preserve stage versus end-to-end distinction", () => {
  assert.equal(researchMetrics.response, 13);
  assert.equal(researchMetrics.total, 501.2);
  assert.equal(researchMetrics.detection, 424.3);
  assert.equal(trials.filter((t) => t.total < 600).length, 4);
  for (const t of trials)
    assert.ok(Math.abs(t.ingestion + t.detection + t.response - t.total) < 0.11);
});
test("median sorts numerically without mutating measurements", () => {
  const values = [100, 2, 10, 4];
  assert.equal(median(values), 7);
  assert.deepEqual(values, [100, 2, 10, 4]);
  assert.throws(() => median([]));
});
