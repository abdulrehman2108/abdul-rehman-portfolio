import { profile, experience, projects, skills, education, certifications, training, leadership, nav } from "./data.mjs";

const esc = (s = "") => String(s).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const tags = (items = []) => items.map(item => `<span class="tag">${esc(item)}</span>`).join("");
const icon = name => ({
  arrow: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h12m-5-5 5 5-5 5"/></svg>',
  external: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M11 4h5v5M16 4 9 11M15 11v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"/></svg>',
  mark: '<svg viewBox="0 0 44 44" aria-hidden="true"><rect x="1" y="1" width="42" height="42" rx="13"/><path d="M12 29V15l10 9 10-9v14M22 24v7"/></svg>'
})[name];
const externalLink = (url, label, cls = "text-link") => url ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>` : "";
const resumeLink = (cls = "button button-dark") => `<a class="${cls}" href="/resume.pdf" download="Abdul-Rehman-Ansari-Resume.pdf">Download Resume ${icon("arrow")}</a>`;

function header(base = "") {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="nav-wrap">
    <a class="brand" href="${base}#top" aria-label="${esc(profile.name)} home">${icon("mark")}<span>${esc(profile.name)}</span></a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation"><span></span><span></span></button>
    <nav id="primary-nav" class="primary-nav" aria-label="Main navigation">${nav.map(([label, id]) => `<a href="${base}#${id}">${label}</a>`).join("")}${resumeLink("nav-resume")}</nav>
  </div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-inner"><a class="brand footer-brand" href="#top">${icon("mark")}<span>${esc(profile.name)}</span></a><p>${esc(profile.role)} <span aria-hidden="true">/</span> ${esc(profile.location)}</p><span>&copy; <span data-year></span> ${esc(profile.name)}</span></div></footer>`;
}

function projectCard(project, index) {
  return `<article class="project-card${index === 0 ? " project-card-featured" : ""}">
    <div class="project-card-top"><span class="project-index">${String(index + 1).padStart(2, "0")}</span><span class="project-type">${esc(project.category)}</span></div>
    <h3><a href="/projects/${esc(project.slug)}/">${esc(project.title)} ${icon("arrow")}</a></h3>
    <p class="project-deck">${esc(project.deck)}</p>
    <div class="project-metrics" aria-label="Project measures">${project.scope.slice(0, 3).map(metric => `<span>${esc(metric)}</span>`).join("")}</div>
    <div class="tag-list">${tags(project.tools.slice(0, 5))}</div>
    <div class="project-links"><a class="text-link" href="/projects/${esc(project.slug)}/">View case study ${icon("arrow")}</a>${externalLink(project.repo, `GitHub ${icon("external")}`)}</div>
  </article>`;
}

function experienceCard(item, index) {
  return `<article class="experience-card"><div class="experience-rail"><span>${String(index + 1).padStart(2, "0")}</span><i aria-hidden="true"></i></div><div class="experience-main">
    <div class="experience-heading"><div><p class="eyebrow">${esc(item.dates)} <span aria-hidden="true">/</span> ${esc(item.location)}</p><h3>${esc(item.role)}</h3><p class="company">${esc(item.company)}</p></div><span class="experience-kind">Internship</span></div>
    <p class="experience-summary">${esc(item.summary)}</p><ul class="evidence-list">${item.bullets.map(bullet => `<li>${esc(bullet)}</li>`).join("")}</ul><div class="tag-list">${tags(item.skills)}</div>
  </div></article>`;
}

function projectPage(project, siteUrl = "") {
  const canonical = siteUrl ? `<link rel="canonical" href="${esc(`${siteUrl}/projects/${project.slug}/`)}">` : "";
  const scope = project.scope.map((metric, i) => `<div class="metric-card"><span class="metric-value">${esc(metric)}</span><span class="metric-label">${String(i + 1).padStart(2, "0")} / scope</span></div>`).join("");
  const workflow = project.approach.map((step, i) => `<li class="workflow-step"><span>${String(i + 1).padStart(2, "0")}</span><strong>${esc(step)}</strong></li>`).join("");
  const visual = project.visual ? `<section class="case-section" aria-labelledby="visual-title"><div class="case-section-heading"><span>07</span><h2 id="visual-title">Dashboard view</h2></div><figure class="project-visual"><img src="${esc(project.visual)}" alt="${esc(project.visualAlt)}" loading="lazy" decoding="async"><figcaption>Sales Performance Analytics Dashboard</figcaption></figure></section>` : "";
  const repository = externalLink(project.repo, `Open project repository ${icon("external")}`, "button button-outline");
  const linksIndex = project.visual ? "08" : "07";
  const linksSection = project.repo ? `<section class="case-section case-links" aria-labelledby="links-title"><div class="case-section-heading"><span>${linksIndex}</span><h2 id="links-title">Project link</h2></div>${repository}</section>` : "";
  const jsonLd = { "@context": "https://schema.org", "@type": "CreativeWork", name: project.title, author: { "@type": "Person", name: profile.name }, description: project.deck, keywords: project.tools.join(", ") };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f5f5f1"><title>${esc(project.title)} | ${esc(profile.name)} - Data Analyst</title><meta name="description" content="${esc(project.deck)} ${esc(project.tools.slice(0, 4).join(", "))}."><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/overrides.css">${canonical}<meta property="og:type" content="article"><meta property="og:title" content="${esc(project.title)} | ${esc(profile.name)}"><meta property="og:description" content="${esc(project.deck)}"><meta property="og:image" content="${esc(siteUrl ? `${siteUrl}/social-card.svg` : "/social-card.svg")}"><meta name="twitter:card" content="summary_large_image"><script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head><body>${header("/")}<main id="main" class="case-main"><div class="page-shell">
    <a class="back-link" href="/#projects">${icon("arrow")} All projects</a>
    <header class="case-hero"><p class="eyebrow">${esc(project.category)}</p><h1>${esc(project.title)}</h1><p class="case-deck">${esc(project.deck)}</p><div class="case-tools-inline">${tags(project.tools)}</div><div class="case-actions">${repository}<a class="button button-light" href="mailto:${esc(profile.email)}?subject=${encodeURIComponent(`Project: ${project.title}`)}">Ask about this work ${icon("arrow")}</a></div></header>
    <section class="case-metrics" aria-label="Project scope">${scope}</section>
    <section class="case-section" aria-labelledby="question-title"><div class="case-section-heading"><span>01</span><h2 id="question-title">Business question</h2></div><p class="case-copy">${esc(project.question)}</p></section>
    <section class="case-section" aria-labelledby="data-title"><div class="case-section-heading"><span>02</span><h2 id="data-title">Data</h2></div><p class="case-copy">${esc(project.data)}</p></section>
    <section class="case-section" aria-labelledby="approach-title"><div class="case-section-heading"><span>03</span><h2 id="approach-title">Approach</h2></div><ol class="workflow">${workflow}</ol></section>
    <section class="case-section" aria-labelledby="analysis-title"><div class="case-section-heading"><span>04</span><h2 id="analysis-title">Analysis</h2></div><p class="case-copy">${esc(project.analysis)}</p><p class="case-deliverable"><strong>What I built</strong><span>${esc(project.deliverable)}</span></p></section>
    <section class="case-section" aria-labelledby="findings-title"><div class="case-section-heading"><span>05</span><h2 id="findings-title">Key findings</h2></div><ul class="findings-list">${project.findings.map((finding, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span><p>${esc(finding)}</p></li>`).join("")}</ul></section>
    <section class="case-section takeaway-section" aria-labelledby="takeaway-title"><div class="case-section-heading"><span>06</span><h2 id="takeaway-title">Business context</h2></div><p class="case-copy">${esc(project.takeaway)}</p></section>
    ${visual}
    ${linksSection}
    <div class="case-bottom"><p>More analytics work</p><a class="text-link" href="/#projects">Browse all projects ${icon("arrow")}</a></div>
  </div></main>${footer()}<script type="module" src="/app.js"></script></body></html>`;
}

export function homePage(siteUrl = "") {
  const experiences = experience.map(experienceCard).join("");
  const skillGroups = skills.map(group => `<article class="skill-group"><h3>${esc(group.title)}</h3><div class="tag-list">${tags(group.items)}</div></article>`).join("");
  const leadershipRows = leadership.map(item => `<article class="leadership-row"><div><p class="eyebrow">${esc(item.dates)}</p><h3>${esc(item.role)}</h3><p>${esc(item.organization)}</p></div><p>${esc(item.detail)}</p></article>`).join("");
  const schools = education.map(item => `<article class="education-card"><p class="eyebrow">${esc(item.dates)}</p><h3>${esc(item.degree)}</h3><p>${esc(item.institution)}</p>${item.detail ? `<span class="credential-detail">${esc(item.detail)}</span>` : ""}</article>`).join("");
  const certs = certifications.map(item => `<article class="cert-row"><div><h3>${esc(item.name)}</h3><p>${esc(item.issuer)} <span aria-hidden="true">/</span> ${esc(item.date)}${item.detail ? ` <span aria-hidden="true">/</span> ${esc(item.detail)}` : ""}</p></div></article>`).join("");
  const proof = profile.quickProof.map(item => `<article class="proof-item"><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></article>`).join("");
  const canonical = siteUrl ? `<link rel="canonical" href="${esc(siteUrl)}"><meta property="og:url" content="${esc(siteUrl)}">` : "";
  const ogImage = siteUrl ? `${siteUrl}/social-card.svg` : "/social-card.svg";
  const jsonLd = { "@context": "https://schema.org", "@type": "Person", name: profile.name, jobTitle: profile.role, address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" }, email: `mailto:${profile.email}`, sameAs: [profile.linkedin, profile.github], knowsAbout: profile.tools };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f5f5f1"><title>${esc(profile.name)} | Data Analyst | SQL | Power BI | Excel | Python</title><meta name="description" content="Data Analyst in Mumbai with internship and project experience using SQL, Power BI, Excel and Python for customer, financial and operational analytics."><meta name="author" content="${esc(profile.name)}"><meta name="robots" content="index,follow"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/overrides.css">${canonical}<meta property="og:type" content="website"><meta property="og:title" content="${esc(profile.name)} | Data Analyst"><meta property="og:description" content="SQL, Power BI, Excel and Python for financial, customer and operational analysis."><meta property="og:image" content="${esc(ogImage)}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(profile.name)} | Data Analyst"><meta name="twitter:description" content="Analytics, reporting and business intelligence from Mumbai."><meta name="twitter:image" content="${esc(ogImage)}"><script type="application/ld+json">${JSON.stringify(jsonLd)}</script></head><body>${header()}<main id="main">
  <section class="hero-section" id="top"><div class="hero-grid"><div class="hero-copy"><p class="eyebrow hero-kicker">DATA ANALYST <span aria-hidden="true">/</span> ${esc(profile.location.toUpperCase())}</p><h1>${esc(profile.name)}</h1><p class="hero-role">${esc(profile.role)}</p><p class="hero-tools">${esc(profile.headline)}</p><p class="hero-summary">${esc(profile.intro)}</p><div class="hero-actions"><a class="button button-dark" href="#projects">View Projects ${icon("arrow")}</a>${resumeLink()}${externalLink(profile.linkedin, `LinkedIn ${icon("external")}`, "button button-outline")}${externalLink(profile.github, `GitHub ${icon("external")}`, "button button-outline")}</div><p class="hero-location">Based in ${esc(profile.location)}</p></div>
    <aside class="hero-proof" aria-label="Portfolio snapshot"><p class="proof-label">AT A GLANCE</p><div><span>01</span><p>Customer, financial, sales and operational analysis</p></div><div><span>02</span><p>SQL and Python analysis, Power BI and Excel reporting</p></div><div><span>03</span><p>Internship experience at ${esc(experience.map(item => item.company).join(" and "))}</p></div><div class="hero-proof-bottom"><span>SELECTED TOOLKIT</span><div class="tag-list">${tags(profile.tools.slice(0, 6))}</div></div></aside>
  </div></section>

  <section class="proof-strip" aria-label="Selected scope"><div class="proof-inner">${proof}</div></section>

  <section class="content-section projects-section" id="projects"><div class="section-heading"><div><p class="eyebrow">SELECTED WORK</p><h2>Projects built around<br><em>business questions.</em></h2></div><p>Each case study shows the question, data, analytical steps and key findings.</p></div><div class="project-grid">${projects.map(projectCard).join("")}</div></section>

  <section class="content-section experience-section" id="experience"><div class="section-heading"><div><p class="eyebrow">EXPERIENCE</p><h2>Analytics in<br><em>working contexts.</em></h2></div><p>Internships across financial analytics and airline operations reporting.</p></div><div class="experience-list">${experiences}</div></section>

  <section class="content-section skills-section" id="skills"><div class="section-heading"><div><p class="eyebrow">ANALYTICS TOOLKIT</p><h2>Tools I use<br><em>in the work.</em></h2></div><p>Grouped by how the tools appear across my experience and project work.</p></div><div class="skills-grid">${skillGroups}</div></section>

  <section class="content-section leadership-section" id="leadership"><div class="section-heading"><div><p class="eyebrow">LEADERSHIP & CAMPUS EXPERIENCE</p><h2>Coordination and<br><em>event operations.</em></h2></div><p>College roles alongside my Information Technology degree.</p></div><div class="leadership-list">${leadershipRows}</div></section>

  <section class="content-section education-section" id="education"><div class="section-heading"><div><p class="eyebrow">EDUCATION & CREDENTIALS</p><h2>Study and<br><em>formal learning.</em></h2></div><p>Degrees, certifications and additional analytics training.</p></div><div class="education-grid">${schools}</div><div class="credentials-block"><div class="subsection-heading"><h3>Certifications</h3></div><div class="cert-list">${certs}</div><article class="training-card"><p class="eyebrow">ADDITIONAL TRAINING</p><h3>${esc(training[0].name)}</h3><p>${esc(training[0].provider)} <span aria-hidden="true">/</span> ${esc(training[0].detail)}</p></article></div></section>

  <section class="content-section about-section" id="about"><div class="section-heading"><div><p class="eyebrow">WORKING APPROACH</p><h2>Start with the<br><em>business question.</em></h2></div><p>How I move from a question to a report.</p></div><div class="about-copy"><p>${esc(profile.about)}</p></div></section>

  <section class="contact-section" id="contact"><div class="contact-inner"><div><p class="eyebrow">OPEN TO ANALYTICS ROLES</p><h2>Hiring for an<br><em>analytics role?</em></h2><p>Open to entry-level Data Analyst, BI Analyst, Business Data Analyst, Reporting Analyst and Business Analyst roles.</p></div><div class="contact-card"><span class="contact-kicker">GET IN TOUCH</span><a class="contact-email" href="mailto:${esc(profile.email)}">${esc(profile.email)} ${icon("arrow")}</a><div class="contact-actions">${resumeLink()}${externalLink(profile.linkedin, `LinkedIn ${icon("external")}`, "button button-outline")}${externalLink(profile.github, `GitHub ${icon("external")}`, "button button-outline")}</div></div></div></section>
  </main>${footer()}<script type="module" src="/app.js"></script></body></html>`;
}

export { projectPage };
