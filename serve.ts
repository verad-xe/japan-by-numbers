// Japan by Numbers — tiny static server for local testing.
// Serves app/ at http://localhost:8080 (use --port for another port).
// Standard library only. Refuses any path that escapes app/.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(join(fileURLToPath(import.meta.url), "..", "app"));

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

let port = 8080;
const portFlag = process.argv.indexOf("--port");
if (portFlag !== -1) {
  const p = Number(process.argv[portFlag + 1]);
  if (Number.isInteger(p) && p > 0 && p < 65536) port = p;
}

const server = createServer((req, res) => {
  const rawPath = decodeURIComponent(new URL(req.url ?? "/", "http://localhost").pathname);
  const rel = normalize(rawPath).replace(/^(\.\.[/\\])+/, "").replace(/^[/\\]/, "");
  const file = resolve(join(appRoot, rel === "" ? "index.html" : rel));
  if (!file.startsWith(appRoot + "/") && file !== appRoot) {
    res.writeHead(403, { "content-type": "text/plain" });
    res.end("forbidden");
    return;
  }
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("not found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[extname(file).toLowerCase()] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log("Japan by Numbers at http://localhost:" + port + "/");
});
