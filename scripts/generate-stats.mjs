// Generates stats/github-stats.svg and stats/top-languages.svg from the GitHub API.
// Run by .github/workflows/stats.yml. Uses GITHUB_TOKEN, so only public repos are counted.
import { writeFileSync, mkdirSync } from "node:fs";

const USER = process.env.GH_USER || "yaseenmlm";
const TOKEN = process.env.GITHUB_TOKEN;
const EXCLUDE_LANGS = new Set(["Jupyter Notebook"]); // notebooks dwarf the real code bytes
const TOP_N = 6;

const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "profile-stats",
  ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
};
async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

const user = await api(`/users/${USER}`);
const repos = (await api(`/users/${USER}/repos?per_page=100&type=owner`)).filter((r) => !r.fork);
const stars = repos.reduce((n, r) => n + r.stargazers_count, 0);
const commits = (await api(`/search/commits?q=author:${USER}&per_page=1`)).total_count;
const prs = (await api(`/search/issues?q=author:${USER}+type:pr&per_page=1`)).total_count;

const bytes = {};
for (const r of repos) {
  const langs = await api(`/repos/${USER}/${r.name}/languages`);
  for (const [name, b] of Object.entries(langs)) if (!EXCLUDE_LANGS.has(name)) bytes[name] = (bytes[name] || 0) + b;
}
const total = Object.values(bytes).reduce((a, b) => a + b, 0) || 1;
const top = Object.entries(bytes).sort((a, b) => b[1] - a[1]).slice(0, TOP_N);

const C = { bg: "#1a1b27", title: "#70a5fd", text: "#c0caf5", muted: "#787c99", bar: "#38bdae", track: "#2a2b3d" };
const font = `font-family="Segoe UI, Ubuntu, Helvetica, Arial, sans-serif"`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const card = (w, h, title, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}">
  <title>${esc(title)}</title>
  <rect width="${w}" height="${h}" rx="6" fill="${C.bg}"/>
  <text x="25" y="35" ${font} font-size="18" font-weight="600" fill="${C.title}">${esc(title)}</text>
${body}
</svg>
`;

const rows = [
  ["Public repos", repos.length],
  ...(stars > 0 ? [["Total stars", stars]] : []),
  ["Commits", commits],
  ["Pull requests", prs],
  ["Followers", user.followers],
];
const statsBody = rows.map(([k, v], i) => `  <text x="25" y="${68 + i * 26}" ${font} font-size="14" fill="${C.muted}">${esc(k)}</text>
  <text x="270" y="${68 + i * 26}" ${font} font-size="14" font-weight="600" fill="${C.text}" text-anchor="end">${v.toLocaleString("en-US")}</text>`).join("\n");
const statsH = 68 + rows.length * 26 + 4;

const langBody = top.map(([name, b], i) => {
  const pct = (b / total) * 100, y = 55 + i * 34;
  return `  <text x="25" y="${y + 10}" ${font} font-size="13" fill="${C.text}">${esc(name)}</text>
  <text x="270" y="${y + 10}" ${font} font-size="13" fill="${C.muted}" text-anchor="end">${pct.toFixed(1)}%</text>
  <rect x="25" y="${y + 16}" width="245" height="6" rx="3" fill="${C.track}"/>
  <rect x="25" y="${y + 16}" width="${Math.max(3, (245 * pct) / 100).toFixed(1)}" height="6" rx="3" fill="${C.bar}"/>`;
}).join("\n");

mkdirSync("stats", { recursive: true });
writeFileSync("stats/github-stats.svg", card(295, statsH, `${user.name || USER}'s GitHub Stats`, statsBody));
writeFileSync("stats/top-languages.svg", card(295, 55 + top.length * 34 + 8, "Top Languages", langBody));
console.log({ repos: repos.length, stars, commits, prs, followers: user.followers, top });
