import { readFile, readdir } from 'node:fs/promises';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type LegacyPageProps = {
  params: Promise<{
    path?: string[];
  }>;
};

export const dynamic = 'force-static';
export const dynamicParams = false;

function fileForPath(path?: string[]) {
  if (!path || path.length === 0) return 'index.html';
  const last = path[path.length - 1];
  if (!last) return 'index.html';
  if (last.endsWith('.html')) return last;
  return `${last}.html`;
}

async function listHtmlPages() {
  const entries = await readdir(process.cwd(), { withFileTypes: true });
  return entries
    .filter((e) => e.isFile())
    .map((e) => e.name)
    .filter((name) => name.endsWith('.html'))
    .filter((name) => name !== 'index.template.html');
}

export async function generateStaticParams(): Promise<Array<{ path?: string[] }>> {
  const pages = await listHtmlPages();
  const params: Array<{ path?: string[] }> = [{ path: [] }]; // root -> index.html

  for (const file of pages) {
    if (file === 'index.html') continue;
    params.push({ path: [file] }); // keep `.html` URLs working
  }

  return params;
}

function extractTagText(html: string, tag: string) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
  const m = html.match(re);
  return m ? m[1].trim() : '';
}

function extractBody(html: string) {
  const re = /<body[^>]*>([\s\S]*?)<\/body>/i;
  const m = html.match(re);
  return m ? m[1] : '';
}

function stripScripts(html: string) {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, '');
}

function normalizeAssetPaths(html: string) {
  // Make relative links absolute so they work under any route.
  // href="about.html" -> href="/about.html"
  html = html.replace(/\shref="(?!https?:\/\/|mailto:|#|\/)([^"]+)"/g, (_m, href) => {
    return ` href="/${href}"`;
  });

  // src="logo.svg" -> src="/logo.svg"
  html = html.replace(/\ssrc="(?!https?:\/\/|data:|\/)([^"]+)"/g, (_m, src) => {
    return ` src="/${src}"`;
  });

  return html;
}

export async function generateMetadata({ params }: LegacyPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const file = fileForPath(resolvedParams.path);
  try {
    const html = await readFile(file, 'utf8');
    const title = extractTagText(html, 'title');
    return title ? { title } : {};
  } catch {
    return {};
  }
}

export default async function LegacyPage({ params }: LegacyPageProps) {
  const resolvedParams = await params;
  const file = fileForPath(resolvedParams.path);
  let html: string;
  try {
    html = await readFile(file, 'utf8');
  } catch {
    notFound();
  }

  let body = extractBody(html);
  body = stripScripts(body);
  body = normalizeAssetPaths(body);

  // Render the original HTML body inside Next.js.
  // This preserves your existing markup and CSS while Next.js handles routing and rendering.
  return <div dangerouslySetInnerHTML={{ __html: body }} />;
}

