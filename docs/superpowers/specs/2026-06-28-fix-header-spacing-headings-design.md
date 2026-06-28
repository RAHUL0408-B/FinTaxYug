# Design Specification - Fix Layout, Mobile Friendliness, and Remove Prices

This document specifies the layout corrections to avoid navbar/ticker collision, make the page fully mobile-friendly, and remove pricing details.

## Proposed Changes

### UI Components (ServiceDetail.jsx)
- Add class `.service-page` to the outer page div.
- Add class `.service-page-content` to the inner container div.
- Add standard anchor IDs to details sections (e.g. `id="overview"`, `id="features"`, `id="process"`, `id="faq"`).
- Update the bottom banner in [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx) to hide prices and show a generic consultation call-to-action instead.

### Styling Updates (ServiceDetail.css)
- Increase `.service-detail-container` and `.service-page-content` padding-top to `150px` on desktop and `155px` on mobile to clear the fixed navbar + scrolling services ticker.
- Define `.service-main-title` / `.service-page h1` with:
  - `font-size: 2rem;`
  - `font-weight: 700;`
  - `color: #1a1a2e;` (dark navy)
  - `margin-bottom: 1rem;`
- Add `border-left: 4px solid #2e7d32;` and `padding-left: 12px;` to all section headers (`h2`, `h3`).
- Remove pseudo-element `h2::before` rule.
- Set `scroll-margin-top: 120px;` on `.details-section`.
- Optimize mobile layout by hiding non-essential sidebar elements (images, contact card, why choose us) and transforming the services directory list into a sleek horizontal slider at the top of the content details.

### Navbar & Header (index.css & Navbar.jsx)
- Increase z-index to `9999` for `.navbar`, `.top-header`, and the scrolling ticker wrapper to ensure they stay on top of other content layers.

## Verification Plan
- Build the project using `npm run build`.
- Manually verify layout on desktop and mobile viewports.
