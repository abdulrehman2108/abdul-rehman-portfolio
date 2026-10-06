const fs = require("node:fs");
const path = require("node:path");
const root = process.cwd();
const out = path.resolve(root, "dist");
if (path.dirname(out) !== root || path.basename(out) !== "dist") throw new Error("Refusing to clean an unexpected output directory.");

const dataSource = fs.readFileSync("src/data.mjs", "utf8").replace(/^export const /gm, "const ");
const data = new Function(`${dataSource}\nreturn { profile, experience, projects, skills, education, certifications, training, leadership, nav };`)();
let renderSource = fs.readFileSync("src/render.mjs", "utf8");
renderSource = renderSource.replace(/^import \{[^}]+\} from "\.\/data\.mjs";\s*/m, "");
renderSource = renderSource.replace(/^export function /gm, "function ").replace(/^export \{ projectPage \};?\s*$/m, "");
const render = new Function("data", `const { profile, experience, projects, skills, education, certifications, training, leadership, nav } = data;\n${renderSource}\nreturn { homePage, projectPage };`)(data);

if (fs.existsSync(out)) fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.cpSync("public", out, { recursive: true });
fs.copyFileSync("src/site.css", path.join(out, "styles.css"));
fs.copyFileSync("src/overrides.css", path.join(out, "overrides.css"));
fs.copyFileSync("src/app.js", path.join(out, "app.js"));
const siteUrl = (process.env.SITE_URL || "https://abdul-rehman-portfolio-sable-xi.vercel.app").replace(/\/$/, "");
fs.writeFileSync(path.join(out, "index.html"), render.homePage(siteUrl), "utf8");
for (const project of data.projects) {
  const route = path.join(out, "projects", project.slug);
  fs.mkdirSync(route, { recursive: true });
  fs.writeFileSync(path.join(route, "index.html"), render.projectPage(project, siteUrl), "utf8");
}
const routes = ["/", ...data.projects.map(project => `/projects/${project.slug}/`)];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${siteUrl}${route}</loc></url>`).join("")}</urlset>`;
fs.writeFileSync(path.join(out, "sitemap.xml"), sitemap, "utf8");
fs.writeFileSync(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`, "utf8");
console.log(`Built ${routes.length} pages in ${out}${siteUrl ? ` for ${siteUrl}` : " (SITE_URL not set; canonical tags omitted)"}`);
