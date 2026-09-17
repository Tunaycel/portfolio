# Thesis content and measurement provenance

The public chapter describes an ongoing Azure incident-response thesis, not a defended thesis or a production security product. It uses the project's implementation README and experiment summary dated 3 September 2026, inspected with authenticated repository access. Only aggregate professional research results are included; no raw logs, cloud identifiers, credentials or private repository links are published.

`lib/research.ts` stores the five documented trial measurements in seconds. Ingestion, detection and response are distinct stages. The median response stage is 13.0 seconds; median total containment is 501.2 seconds. Medians are calculated independently and must not be added together. Individually rounded stage values can differ from a trial total by 0.1 seconds.

Scope: one monitored host, one SSH brute-force scenario, one deployment and a fixed configuration. All five trials reached containment; four finished below 600 seconds. One below-threshold benign burst is only a sanity check. The original 60% improvement target remains unproven without a comparable manual baseline.

The architecture depicts Terraform provisioning, Ubuntu authentication syslog through Azure Monitor Agent and a data collection rule, Log Analytics, a scheduled Sentinel KQL rule, entity mapping, Logic Apps and NSG containment. The visual is explanatory; the website does not access infrastructure or execute attacks.

## Updating the chapter

Update the documented source, `lib/research.ts`, corresponding narrative and tests together. Preserve units, sample size, environment and status. Separate future work from implemented capabilities. Degree wording is intentionally omitted because supplied sources disagree on the degree label. Do not invent a presentation date.

The Windows cleaner/protector remains outside the portfolio until its source location and working capabilities are available for review.
