# Fix Header Spacing, Mobile Friendliness, and Headings Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Correct the overlapping services ticker, make the detail page 100% mobile-friendly, remove pricing, apply a green border-left accent to headings, increase header z-indexes, and adjust scroll margin offsets.

**Architecture:** We will increase `.service-detail-container` / `.service-page-content` padding-top in `ServiceDetail.css` to `150px` (desktop) and `155px` (mobile). We will hide heavy sidebar elements on mobile so only the horizontal services directory menu stays at the top. We will increase header z-indexes in `index.css` and `Navbar.jsx` to `9999`. We will apply borders to h2/h3 headings and set `scroll-margin-top: 120px;`.

---

### Task 1: Update z-index in Navbar.jsx and index.css

**Files:**
- Modify: [Navbar.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/components/common/Navbar.jsx)
- Modify: [index.css](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/index.css)

- [ ] **Step 1: Increase ticker z-index in Navbar.jsx**
  Change `zIndex: 999` to `zIndex: 9999` for the ticker wrapper.

- [ ] **Step 2: Increase navbar and top-header z-indexes in index.css**
  Change `.navbar` `z-index: 1000` to `z-index: 9999`.
  Change `.top-header` `z-index: 1001` to `z-index: 9999`.

- [ ] **Step 3: Commit z-index changes**
  ```bash
  git add src/components/common/Navbar.jsx src/index.css
  git commit -m "style: set higher z-index (9999) for header and ticker elements"
  ```

---

### Task 2: Modify ServiceDetail.jsx Classes & Anchors

**Files:**
- Modify: [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx)

- [ ] **Step 1: Add classes and IDs**
  Add `.service-page` to the outer layout div.
  Add `.service-page-content` to `.service-detail-container`.
  Add `id="..."` anchors to `.details-section` containers.

- [ ] **Step 2: Commit markup changes**
  ```bash
  git add src/portals/user/ServiceDetail.jsx
  git commit -m "feat: add service-page helper classes and anchor IDs"
  ```

---

### Task 3: Rewrite ServiceDetail.css rules for Headline, Headings, and Mobile Spacing

**Files:**
- Modify: [ServiceDetail.css](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.css)

- [ ] **Step 1: Set Headline (h1) styles**
  Style `.service-main-title, .service-page h1` with size `2rem`, weight `700`, color `#1a1a2e`, and margin-bottom `1rem`.

- [ ] **Step 2: Set Heading (h2, h3) left-borders**
  Apply `border-left: 4px solid #2e7d32;` and `padding-left: 12px;` to all section headers. Remove pseudo-element rules.

- [ ] **Step 3: Increase padding-top for desktop and mobile**
  Set `.service-page-content` top padding to `150px` on desktop and `155px` on mobile.
  Set `scroll-margin-top: 120px;` on `.details-section`.

- [ ] **Step 4: Optimize mobile sidebar**
  Hide image, contact, and why choose us cards under `992px` width. Style services directory horizontal slider.

- [ ] **Step 5: Commit styling changes**
  ```bash
  git add src/portals/user/ServiceDetail.css
  git commit -m "style: apply header spacing, heading border accents, and mobile optimization"
  ```
