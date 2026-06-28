# Compact Service Hero Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modify the service details page hero section (the blue box) to have a smaller vertical footprint and a split two-column layout on desktop.

**Architecture:** We will update `ServiceDetail.jsx` markup to render a flex split container where the icon is placed on the left side, and the information (category, title, description, and CTA buttons) on the right side. We will then update `ServiceDetail.css` to align styles to the left on desktop and ensure it remains responsive on mobile.

**Tech Stack:** React, CSS

---

### Task 1: Update ServiceDetail.jsx Markup

**Files:**
- Modify: [ServiceDetail.jsx](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.jsx)

- [ ] **Step 1: Replace Centered Hero Content with Split Layout**
  Change the layout inside `.service-hero > .container` to have the breadcrumb first, followed by a `.service-hero-split` wrapper which divides into `.service-hero-left` and `.service-hero-right`.

  Code in `src/portals/user/ServiceDetail.jsx`:
  ```jsx
              {/* Hero Section */}
              <section className="service-hero" style={{
                  background: 'linear-gradient(135deg, #051020 0%, #0B1F3A 50%, #16325C 100%)',
                  padding: 'clamp(60px, 10vw, 100px) 0 clamp(40px, 8vw, 60px)',
                  paddingTop: '125px',
                  color: 'white'
              }}>
                  <div className="container">
                      <div className="service-hero-content">
                          <div className="breadcrumb">
                              <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                              <span> / </span>
                              <a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/', { state: { scrollTo: 'services' } }); }}>Services</a>
                              <span> / </span>
                              <span>{service.title}</span>
                          </div>
                          <div className="service-icon-large">{service.icon}</div>
                          <h1 className="service-title">{service.title}</h1>
                          <p className="service-category">{service.category}</p>
                          <p className="service-short-desc">{service.shortDesc}</p>
                          <div className="hero-actions">
                              <button className="btn btn-primary" onClick={() => navigate(`/?message=${encodeURIComponent(`I am interested in ${service.title}. `)}&type=${encodeURIComponent(service.category)}`)}>
                                  Get Started
                              </button>
                              <a href="tel:8928895195" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                  📞 Call: 8928895195
                              </a>
                              <a href="tel:9011424236" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                  📞 Call: 9011424236
                              </a>
                          </div>
                      </div>
                  </div>
              </section>
  ```
  replace with:
  ```jsx
              {/* Hero Section */}
              <section className="service-hero" style={{
                  background: 'linear-gradient(135deg, #051020 0%, #0B1F3A 50%, #16325C 100%)',
                  color: 'white'
              }}>
                  <div className="container">
                      <div className="breadcrumb">
                          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>Home</a>
                          <span> / </span>
                          <a href="/#services" onClick={(e) => { e.preventDefault(); navigate('/', { state: { scrollTo: 'services' } }); }}>Services</a>
                          <span> / </span>
                          <span>{service.title}</span>
                      </div>
                      <div className="service-hero-split">
                          <div className="service-hero-left">
                              <div className="service-icon-box">
                                  {service.icon}
                              </div>
                          </div>
                          <div className="service-hero-right">
                              <span className="service-category">{service.category}</span>
                              <h1 className="service-title">{service.title}</h1>
                              <p className="service-short-desc">{service.shortDesc}</p>
                              <div className="hero-actions">
                                  <button className="btn btn-primary" onClick={() => navigate(`/?message=${encodeURIComponent(`I am interested in ${service.title}. `)}&type=${encodeURIComponent(service.category)}`)}>
                                      Get Started
                                  </button>
                                  <a href="tel:8928895195" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                      📞 Call: 8928895195
                                  </a>
                                  <a href="tel:9011424236" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>
                                      📞 Call: 9011424236
                                  </a>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
  ```

- [ ] **Step 2: Commit markup changes**
  ```bash
  git add src/portals/user/ServiceDetail.jsx
  git commit -m "feat: restructure service hero to split layout"
  ```

---

### Task 2: Update ServiceDetail.css Styles

**Files:**
- Modify: [ServiceDetail.css](file:///c:/Users/Rahul/Downloads/FinTaxYug-main/FinTaxYug-main/src/portals/user/ServiceDetail.css)

- [ ] **Step 1: Update CSS rules for service-hero**
  Replace old centering styles and adjust padding for compact size.

  Add or replace CSS rules:
  ```css
  /* Hero Section */
  .service-hero {
      position: relative;
      overflow: hidden;
      padding: 120px 0 35px; /* Clear fixed navbar and keep bottom compact */
  }

  .service-hero::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></svg>');
      opacity: 0.3;
  }

  .service-hero-split {
      display: flex;
      align-items: center;
      gap: 32px;
      margin-top: 15px;
  }

  .service-hero-left {
      flex-shrink: 0;
  }

  .service-icon-box {
      width: 90px;
      height: 90px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 16px;
      font-size: 3rem;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
      backdrop-filter: blur(4px);
      transition: transform 0.3s;
  }

  .service-hero-split:hover .service-icon-box {
      transform: translateY(-4px);
  }

  .service-hero-right {
      flex-grow: 1;
      text-align: left;
  }

  .breadcrumb {
      font-size: 0.9rem;
      margin-bottom: 10px;
      opacity: 0.9;
      text-align: left;
  }

  .breadcrumb a {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s;
  }

  .breadcrumb a:hover {
      opacity: 0.7;
  }

  .breadcrumb span {
      margin: 0 8px;
  }

  .service-title {
      font-size: clamp(1.8rem, 4vw, 2.4rem);
      margin-bottom: 8px;
      font-weight: 800;
      color: #ffffff;
      text-shadow: 0 2px 12px rgba(0,0,0,0.3);
  }

  .service-category {
      display: inline-block;
      font-size: 0.85rem;
      margin-bottom: 8px;
      font-weight: 700;
      color: #4ade80;
      text-transform: uppercase;
      letter-spacing: 0.08em;
  }

  .service-short-desc {
      font-size: 0.95rem;
      line-height: 1.6;
      margin-bottom: 20px;
      color: rgba(255,255,255,0.85);
  }

  .hero-actions {
      display: flex;
      gap: 15px;
      justify-content: flex-start;
      flex-wrap: wrap;
  }

  @media (max-width: 768px) {
      .service-hero {
          padding: 110px 0 30px;
      }
      .service-hero-split {
          flex-direction: column;
          text-align: center;
          gap: 20px;
      }
      .service-hero-right {
          text-align: center;
      }
      .hero-actions {
          justify-content: center;
      }
      .breadcrumb {
          text-align: center;
      }
  }
  ```

- [ ] **Step 2: Commit styling changes**
  ```bash
  git add src/portals/user/ServiceDetail.css
  git commit -m "style: make service details hero compact and side-by-side"
  ```
