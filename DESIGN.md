# Design system

## Direction

An editorial engineering notebook: strong display typography, warm paper, precise rules and conceptual diagrams. The recruiting journey is immediate: identity and specialization, selected work, ownership and decisions, experience, then contact.

## Visual language

- Paper: `#f4f2eb`; ink: `#262820`; muted text: `#686a60`.
- Action accent: `#b44020`; illustration orange: `#de5129`.
- Instrument Serif provides expressive italic display phrases. DM Sans carries readable product content. IBM Plex Mono is reserved for compact labels and annotations.
- All fonts ship locally through Fontsource. The page does not depend on a third-party font request.
- Main content width caps at 1,320 px. Gutters step down for tablet and mobile.
- Project illustrations use CSS and SVG shapes. They are labelled conceptual illustrations and do not imply real product screenshots.

## Interaction

Project filters preserve predictable button semantics and announce the result count. Native anchors handle section navigation. Links and buttons have visible keyboard focus. The hero's gentle movement ends after five seconds; reduced-motion preferences disable it immediately. Do not reintroduce a loading gate, hidden native cursor or scroll hijacking.

The contact form has visible labels, native field constraints, server validation, pending feedback and a result announcement. It preserves the message on failure and reports ambiguous delivery honestly. Email and profile links remain available without form configuration.

## Responsive review

Verify 320, 375/390, 768, 1,024 and 1,440 px widths. Check navigation touch targets, line wrapping, illustration bounds, card stacking and case-study flow diagrams. The professional profile includes print styles that remove controls and preserve project blocks where possible.
