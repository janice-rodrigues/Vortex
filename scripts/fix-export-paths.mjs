import { readdir, rename, stat, unlink } from 'node:fs/promises';
import path from 'node:path';

/**
 * Next.js static export (app router) will write routes like `/about.html`
 * as `out/about.html.html`. This script normalizes those back to
 * `out/about.html` so plain static hosts serve them correctly.
 */

const outDir = path.join(process.cwd(), 'out');

async function existsDir(p) {
  try {
    const s = await stat(p);
    return s.isDirectory();
  } catch {
    return false;
  }
}

function shouldRename(fileName) {
  return fileName.endsWith('.html.html');
}

function targetName(fileName) {
  return fileName.replace(/\.html\.html$/i, '.html');
}

if (!(await existsDir(outDir))) {
  // Nothing to do (e.g. export disabled)
  process.exit(0);
}

const entries = await readdir(outDir, { withFileTypes: true });
const files = entries.filter((e) => e.isFile()).map((e) => e.name);

for (const fileName of files) {
  if (!shouldRename(fileName)) continue;

  const from = path.join(outDir, fileName);
  const to = path.join(outDir, targetName(fileName));

  // Special case: if the project includes a `404.html` route, Next export may
  // produce `out/404.html.html`. Static hosts typically look for `out/404.html`,
  // so we normalize this and intentionally allow overwrite.
  if (fileName === '404.html.html') {
    try {
      await unlink(to);
    } catch {
      // ok (file doesn't exist)
    }
    await rename(from, to);
    continue;
  }

  // Avoid overwriting if the target somehow exists.
  try {
    await stat(to);
    continue;
  } catch {
    // ok
  }

  await rename(from, to);
}

