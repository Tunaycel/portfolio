# Design system

## Direction

A graphite engineering studio: condensed display typography, spatial geometry, precise rules and a contrasting light research chapter. The recruiting journey moves from identity and specialization through selected work, research evidence, experience and contact.

## Visual language

- Background: `#111713`; text: `#e9efe6`; muted text: `#a2ada1`.
- Action accent: `#c5f58b`; research chapter: `#e5e8dc`.
- Antonio carries condensed display headings. IBM Plex Sans carries body text; IBM Plex Mono marks annotations. Instrument Serif remains in a few secondary editorial phrases.
- All fonts ship locally through Fontsource. The page does not depend on a third-party font request.
- Main content width caps at 1,440 px. Gutters step down for tablet and mobile.
- Project illustrations use CSS and SVG shapes. They are labelled conceptual illustrations and do not imply real product screenshots.

## Interaction

Project filters preserve predictable button semantics and announce the result count. Native anchors handle section navigation. Links and buttons have visible keyboard focus. The lazy-loaded Three.js sculpture provides a pause control, respects reduced-motion preferences and suspends animation offscreen or in hidden tabs. An SVG fallback covers unavailable WebGL. Do not introduce a loading gate, hidden native cursor or scroll hijacking.

The research explorer uses a common 650-second scale for all trials, with labelled stages, announced selection and a native expandable data table. The chart represents documented measurements, never simulated live security telemetry.

The hero object uses three continuous satin-metal bands and a polished core. Studio reflections are generated locally with Three.js RoomEnvironment; no external texture service is used. Its coordinated motion is time-based, the paused pose stays fixed, and the canvas reserves space above the discipline readout on mobile. The rest of the page design is unchanged by this refinement.

The contact form has visible labels, native field constraints, server validation, pending feedback and a result announcement. It preserves the message on failure and reports ambiguous delivery honestly. Email and profile links remain available without form configuration.

## Responsive review

Verify 320, 375/390, 768, 1,024 and 1,440 px widths. Check navigation touch targets, line wrapping, illustration bounds, card stacking and case-study flow diagrams. The professional profile includes print styles that remove controls and preserve project blocks where possible.
