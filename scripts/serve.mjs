// Serves out/ the way GitHub Pages does, for the E2E tests:
// folders answer with their index.html, a folder without the trailing slash
// redirects to it, and anything missing gets out/404.html with status 404.
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve("out");
const port = Number(process.env.PORT ?? 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
};

function send(res, status, file) {
  res.writeHead(status, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}

createServer((req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  const path = normalize(join(root, decodeURIComponent(url.pathname)));
  if (!path.startsWith(root)) {
    res.writeHead(400).end();
    return;
  }
  if (existsSync(path) && statSync(path).isDirectory()) {
    if (!url.pathname.endsWith("/")) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    const index = join(path, "index.html");
    if (existsSync(index)) return send(res, 200, index);
  } else if (existsSync(path)) {
    return send(res, 200, path);
  }
  send(res, 404, join(root, "404.html"));
}).listen(port, () => console.log(`Serving out/ on http://localhost:${port}`));
