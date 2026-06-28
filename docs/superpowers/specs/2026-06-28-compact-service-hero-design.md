# Design Specification - Compact Service Hero Layout

This document specifies the design for making the service details page hero section (the blue header box) much smaller and split into a left column (small icon box) and a right column (info/text).

## Proposed Changes

### UI Restructuring

We will modify [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx) to introduce a two-column layout:
- The breadcrumbs will remain full-width.
- Below the breadcrumbs, we will wrap the icon and details in a `.service-hero-split` flex container.
- **Left side:** `.service-hero-left` wrapping a styled `.service-icon-box`.
- **Right side:** `.service-hero-right` containing the category, title, short description, and action buttons.

### Styling Updates

We will modify [ServiceDetail.css](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.css):
- Reduce `.service-hero` padding-top and padding-bottom.
- Style `.service-hero-split` with `flex` on desktop, stacking on mobile.
- Style `.service-icon-box` to have a size of `90px` by `90px` with a glassmorphism style.
- Align all text and actions to the left on desktop.

## Verification Plan

- Build the project using `npm run build`.
- Manually check the layout on desktop and mobile viewports.
