import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { homePage, projectPage } from "../src/render.mjs";
import { projects } from "../src/data.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(root, "dist");
if (!out.startsWith(`${root}${path.sep}`) || path.basename(out) !== "dist") throw new Error("Refusing to clean an unexpected output directory.");
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, "public"), out, { recursive: true });
await cp(path.join(root, "src", "site.css"), path.join(out, "styles.css"));
await cp(path.join(root, "src", "overrides.css"), path.join(out, "overrides.css"));
await cp(path.join(root, "src", "app.js"), path.join(out, "app.js"));

const siteUrl = (process.env.SITE_URL ?? "https://abdul-rehman-portfolio-sable-xi.vercel.app").replace(/\/$/, "");
await writeFile(path.join(out, "index.html"), homePage(siteUrl), "utf8");
for (const project of projects) {
  const route = path.join(out, "projects", project.slug);
  await mkdir(route, { recursive: true });
  await writeFile(path.join(route, "index.html"), projectPage(project, siteUrl), "utf8");
}
const routes = ["/", ...projects.map(project => `/projects/${project.slug}/`)];
const base = siteUrl || "";
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(route => `<url><loc>${base}${route}</loc></url>`).join("")}</urlset>`;
await writeFile(path.join(out, "sitemap.xml"), sitemap, "utf8");
await writeFile(path.join(out, "robots.txt"), `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`, "utf8");
console.log(`Built ${routes.length} pages in ${out}${siteUrl ? ` for ${siteUrl}` : " (SITE_URL not set; canonical tags omitted)"}`);
