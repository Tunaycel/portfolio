# Release verification

## Automated checks

- Contact validation, malformed data, header injection, body limits, honeypot, same-origin enforcement and missing configuration.
- Process-local rate-limit exhaustion, expiry and bounded storage.
- Fixed-recipient provider requests, reply-to handling, provider rejection, invalid responses and timeout handling.
- Production build and TypeScript route checking.
- Production HTTP smoke checks for all content routes, unknown routes, security headers, robots/sitemap, generated share image, unsupported API methods and missing delivery credentials.
- Formatting checks in CI.

Tests use synthetic data and mocked provider responses. They do not send email. A provider acceptance response is not proof of final inbox delivery.

## Browser verification

The local production app is checked in the in-app Chromium browser. Check homepage and case studies at phone, tablet and desktop widths, all project filters, navigation, contact links, the printable profile and the 404 return path. Verify no horizontal overflow, readable content, focus behavior and console errors.

This is not a claim of exhaustive cross-browser certification. Email inbox delivery and the final production domain require deployment-specific checks.

## Release record

Redesign review on 2026-09-17: 16 unit tests (14 contact, 2 research), production build and route smoke checks pass. Browser review covered the mobile homepage, sculpture discipline selection, thesis layout, trial selection and expanded measurement table. Mobile illustration overflow found during review was fixed. PR 6 passed CI before merge. No live email was sent.

Verified locally on 2026-09-15:

- 14 backend tests pass. A production smoke test exposed a mismatch between Next's normalized request URL and the local Host header; the fix has its own regression test.
- Production build, TypeScript and formatting checks pass.
- Production HTTP tests pass for all seven content routes, two 404 cases, metadata endpoints, share-image response, security headers and API method/configuration handling.
- Homepage: no horizontal overflow at 320, 375, 768, 1,024 and 1,440 px.
- All five case-study pages: correct heading and no horizontal overflow at 375 px.
- All four project filters: correct result sets (1 AI, 2 full-stack, 2 cloud/backend, 5 total).
- Project navigation, the résumé route and the contact navigation work. The 768 px résumé and 1,024 px project grid were visually inspected.
- Keyboard entry focuses the visible skip link with a solid focus outline.
- Optional form: native empty-field validation focuses the name field. A synthetic valid message, with provider credentials disabled at runtime, displays the honest unavailable state. No real email was sent.
- No unexpected browser console errors appeared during navigation checks; the deliberate unavailable-form test returns the expected 503.

The native operating-system print dialog and physical/PDF printer output were not automated. Print styles and the print control are included; final printed pagination depends on browser print settings.
