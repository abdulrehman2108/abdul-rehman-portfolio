const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const root = process.cwd();
const dist = path.join(root, "dist");
const dataSource = fs.readFileSync("src/data.mjs", "utf8").replace(/^export const /gm, "const ");
const { profile, projects, experience, skills, education, certifications, leadership } = new Function(`${dataSource}\nreturn { profile, projects, experience, skills, education, certifications, leadership };`)();
const home = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const css = fs.readFileSync(path.join(dist, "styles.css"), "utf8");
const overrides = fs.readFileSync(path.join(dist, "overrides.css"), "utf8");
const js = fs.readFileSync(path.join(dist, "app.js"), "utf8");
const pass = label => console.log(`PASS ${label}`);

assert.match(profile.linkedin, /^https:\/\/www\.linkedin\.com\/in\//);
assert.equal(profile.github, "https://github.com/abdulrehman2108");
assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
for (const project of projects.filter(item => item.repo)) assert.match(project.repo, /^https:\/\/github\.com\/abdulrehman2108\//);
pass("profile and project links use the verified identity");

assert.match(home, /<title>Abdul Rehman Ansari \| Data Analyst \| SQL \| Power BI \| Excel \| Python<\/title>/);
assert.match(home, /<h1>Abdul Rehman Ansari<\/h1>/);
assert.match(home, /Data Analyst/);
assert.match(home, /View Projects/);
assert.match(home, /href="\/resume\.pdf" download="Abdul-Rehman-Ansari-Resume\.pdf"/);
assert.match(home, /LinkedIn/);
assert.match(home, /GitHub/);
assert.match(home, /rel="canonical" href="https:\/\/abdul-rehman-portfolio-sable-xi\.vercel\.app"/);
assert.match(home, /property="og:title"/);
assert.match(home, /twitter:card/);
assert.match(home, /application\/ld\+json/);
const sectionOrder = ["top", "projects", "experience", "skills", "leadership", "education", "about", "contact"].map(id => home.indexOf(`id="${id}"`));
assert.ok(sectionOrder.every((position, index) => position >= 0 && (!index || position > sectionOrder[index - 1])), "homepage sections should follow the recruiter-first order");
for (const label of ["Home", "Projects", "Experience", "Skills", "Education", "Contact"]) assert.ok(home.includes(`>${label}</a>`));
pass("hero, resume CTA, SEO metadata, and recruiter-first section order render");

assert.deepEqual(projects.map(project => project.slug), ["bluestock-mutual-fund-analytics", "customer-behaviour-analytics", "high-cloud-airlines", "sales-performance-analytics", "ferns-and-petals-business-analysis"]);
for (const project of projects) {
  const page = fs.readFileSync(path.join(dist, "projects", project.slug, "index.html"), "utf8");
  assert.ok(page.includes(project.title), `missing project title: ${project.title}`);
  for (const label of ["Business question", "Data", "Approach", "Analysis", "Key findings", "Business context"]) assert.ok(page.includes(label), `${project.title}: missing ${label}`);
  assert.match(page, /<main id="main"/);
  assert.doesNotMatch(page, /the supplied profile|the source description|no public dashboard URL|internal audit/i);
}
assert.ok(projects[0].findings.length >= 3);
assert.match(fs.readFileSync(path.join(dist, "projects", "sales-performance-analytics", "index.html"), "utf8"), /image\.png\?raw=1/);
pass("five case studies render in evidence-backed order with a consistent structure");

for (const item of experience) assert.ok(home.includes(item.company) && home.includes(item.role));
for (const item of education) assert.ok(home.includes(item.institution) && home.includes(item.dates));
for (const item of certifications) assert.ok(home.includes(item.name));
for (const item of leadership) assert.ok(home.includes(item.role.replaceAll("&", "&amp;")) && home.includes(item.organization));
for (const group of skills) for (const skill of group.items) assert.ok(home.includes(skill));
assert.match(home, /<strong>2<\/strong><span>analytics internships<\/span>/);
assert.match(home, /<strong>5<\/strong><span>analytics project case studies<\/span>/);
assert.doesNotMatch(home, /results-driven professional|data enthusiast|leveraging cutting-edge technology|transforming data into actionable insights|passionate data analyst/i);
assert.doesNotMatch(home, /profile reports|the supplied project description|not supplied/i);
assert.doesNotMatch(home, /Â|â€™|â€“/);
const aboutWords = profile.about.trim().split(/\s+/).length;
assert.ok(aboutWords >= 80 && aboutWords <= 120, `About section should be 80-120 words; found ${aboutWords}`);
pass("career details are retained; generic and internal-audit copy is absent");

const resume = fs.readFileSync(path.join(dist, "resume.pdf"));
assert.equal(resume.subarray(0, 5).toString("ascii"), "%PDF-");
assert.match(home, /download="Abdul-Rehman-Ansari-Resume\.pdf"/);
for (const file of ["favicon.svg", "social-card.svg", "styles.css", "overrides.css", "app.js"]) assert.ok(fs.existsSync(path.join(dist, file)), `missing built asset ${file}`);
assert.match(fs.readFileSync(path.join(dist, "sitemap.xml"), "utf8"), /https:\/\/abdul-rehman-portfolio-sable-xi\.vercel\.app/);
assert.match(fs.readFileSync(path.join(dist, "robots.txt"), "utf8"), /Sitemap: https:\/\/abdul-rehman-portfolio-sable-xi\.vercel\.app\/sitemap\.xml/);
pass("resume, crawl files, and static assets are present in the production output");

const internalPaths = new Set();
for (const htmlFile of [path.join(dist, "index.html"), ...projects.map(project => path.join(dist, "projects", project.slug, "index.html"))]) {
  const html = fs.readFileSync(htmlFile, "utf8");
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const pathname = decodeURIComponent(match[1].split(/[?#]/)[0]);
    if (pathname === "/") continue;
    const localPath = path.resolve(dist, `.${pathname}`);
    assert.ok(localPath.startsWith(`${dist}${path.sep}`), `path escapes output: ${pathname}`);
    internalPaths.add(pathname);
  }
}
for (const pathname of internalPaths) {
  let localPath = path.resolve(dist, `.${pathname}`);
  if (fs.existsSync(localPath) && fs.statSync(localPath).isDirectory()) localPath = path.join(localPath, "index.html");
  assert.ok(fs.existsSync(localPath), `broken local link or asset: ${pathname}`);
}
pass("all root-relative route and asset links resolve in dist");

assert.match(css, /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
assert.match(css, /@media \(max-width: 760px\)/);
assert.match(css, /@media \(max-width: 420px\)/);
assert.match(css, /overflow-wrap:\s*normal/);
assert.match(overrides, /:focus-visible/);
assert.match(overrides, /prefers-reduced-motion/);
assert.match(js, /aria-expanded/);
assert.match(js, /Close navigation/);
assert.match(js, /event\.key === "Escape"/);
assert.match(js, /project-visual img/);
assert.match(home, /aria-label="Main navigation"/);
assert.match(home, /aria-label="Open navigation"/);
assert.match(fs.readFileSync(path.join(dist, "favicon.svg"), "utf8"), /<svg/);
pass("mobile layout, normal card-title wrapping, keyboard navigation, and reduced-motion support are present");

console.log("7 checks passed.");
