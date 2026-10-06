import test, { before } from "node:test";
import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { profile, projects, experience, skills, education, certifications, leadership } from "../src/data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const homePath = path.join(dist, "index.html");
let home;
let css;
let overrides;
let js;

before(async () => {
  const build = spawnSync(process.execPath, [path.join(root, "scripts", "build.mjs")], { cwd: root, encoding: "utf8" });
  assert.equal(build.status, 0, build.stderr || build.stdout);
  home = await readFile(homePath, "utf8");
  css = await readFile(path.join(dist, "styles.css"), "utf8");
  overrides = await readFile(path.join(dist, "overrides.css"), "utf8");
  js = await readFile(path.join(dist, "app.js"), "utf8");
});

test("identity, contact and repository links match the profile data", () => {
  assert.match(profile.linkedin, /^https:\/\/www\.linkedin\.com\/in\//);
  assert.equal(profile.github, "https://github.com/abdulrehman2108");
  assert.match(profile.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  for (const project of projects.filter(item => item.repo)) assert.match(project.repo, /^https:\/\/github\.com\/abdulrehman2108\//);
});

test("homepage leads with role and evidence, followed by recruiter-first sections", () => {
  assert.match(home, /<h1>Abdul Rehman Ansari<\/h1>/);
  assert.match(home, /Data Analyst/);
  assert.match(home, /View Projects/);
  assert.match(home, /href="\/resume\.pdf" download=/);
  assert.match(home, /LinkedIn/);
  assert.match(home, /GitHub/);
  const positions = ["top", "projects", "experience", "skills", "leadership", "education", "about", "contact"].map(id => home.indexOf(`id="${id}"`));
  assert.ok(positions.every((position, index) => position >= 0 && (!index || position > positions[index - 1])));
  assert.match(home, /property="og:title"/);
  assert.match(home, /application\/ld\+json/);
});

test("projects render as five ordered, structured case studies", async () => {
  assert.deepEqual(projects.map(project => project.slug), ["bluestock-mutual-fund-analytics", "customer-behaviour-analytics", "high-cloud-airlines", "sales-performance-analytics", "ferns-and-petals-business-analysis"]);
  for (const project of projects) {
    const page = await readFile(path.join(dist, "projects", project.slug, "index.html"), "utf8");
    assert.ok(page.includes(project.title));
    for (const section of ["Business question", "Data", "Approach", "Analysis", "Key findings", "Business context"]) assert.ok(page.includes(section));
  }
  assert.match(await readFile(path.join(dist, "projects", "sales-performance-analytics", "index.html"), "utf8"), /image\.png\?raw=1/);
});

test("experience, education, skills and leadership stay tied to verified data", () => {
  for (const item of experience) assert.ok(home.includes(item.company) && home.includes(item.role));
  for (const item of education) assert.ok(home.includes(item.institution) && home.includes(item.dates));
  for (const item of certifications) assert.ok(home.includes(item.name));
  for (const item of leadership) assert.ok(home.includes(item.role.replaceAll("&", "&amp;")) && home.includes(item.organization));
  for (const group of skills) for (const skill of group.items) assert.ok(home.includes(skill));
  assert.doesNotMatch(home, /results-driven professional|data enthusiast|leveraging cutting-edge technology|transforming data into actionable insights|passionate data analyst/i);
  assert.doesNotMatch(home, /the supplied project description|profile reports|not supplied/i);
  assert.doesNotMatch(home, /Â|â€™|â€“/);
});

test("resume, social assets, canonical metadata and crawl files ship in dist", async () => {
  const pdf = await readFile(path.join(dist, "resume.pdf"));
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.match(home, /download="Abdul-Rehman-Ansari-Resume\.pdf"/);
  assert.match(home, /rel="canonical" href="https:\/\/abdul-rehman-portfolio-sable-xi\.vercel\.app"/);
  for (const file of ["favicon.svg", "social-card.svg", "styles.css", "overrides.css", "app.js", "robots.txt", "sitemap.xml"]) await stat(path.join(dist, file));
});

test("root-relative site and asset links resolve to generated files", async () => {
  const pages = [home, ...await Promise.all(projects.map(project => readFile(path.join(dist, "projects", project.slug, "index.html"), "utf8")))];
  const paths = new Set();
  for (const html of pages) for (const match of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) paths.add(decodeURIComponent(match[1].split(/[?#]/)[0]));
  for (const route of paths) {
    if (route === "/") continue;
    let target = path.resolve(dist, `.${route}`);
    assert.ok(target.startsWith(`${dist}${path.sep}`));
    try { if ((await stat(target)).isDirectory()) target = path.join(target, "index.html"); }
    catch { /* File paths are checked below. */ }
    await stat(target);
  }
});

test("project titles fit the responsive grid and navigation remains accessible", () => {
  assert.match(css, /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/);
  assert.match(css, /@media \(max-width: 760px\)/);
  assert.match(css, /@media \(max-width: 420px\)/);
  assert.match(css, /overflow-wrap:\s*normal/);
  assert.match(overrides, /:focus-visible/);
  assert.match(overrides, /prefers-reduced-motion/);
  assert.match(js, /aria-expanded/);
  assert.match(js, /event\.key === "Escape"/);
  assert.match(home, /aria-label="Main navigation"/);
});
