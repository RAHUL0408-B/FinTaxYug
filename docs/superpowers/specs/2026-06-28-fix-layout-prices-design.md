# Design Specification - Fix Layout and Remove Prices

This document specifies the layout corrections to avoid navbar/ticker collision and the removal of prices from the service details pages.

## Proposed Changes

### UI Components (ServiceDetail.jsx)
- Update the bottom banner in [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx) to hide prices and show a generic consultation call-to-action instead.

### Styling Updates (ServiceDetail.css)
- Increase `.service-detail-container` padding-top from `110px` to `150px` to clear the fixed navbar + scrolling services ticker.

## Verification Plan
- Build the project using `npm run build`.
- Manually verify layout and check that pricing card doesn't show prices anymore.
