import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { ensureDirSync } from 'fs-extra/esm';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const TEMPLATES_DIR = join(__dirname, '../../templates');

export function replacePlaceholders(content, vars) {
  let result = content;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, value);
  }
  return result;
}

export function copyTemplate(srcPath, destPath, vars = {}) {
  ensureDirSync(dirname(destPath));
  const content = readFileSync(srcPath, 'utf8');
  const replaced = replacePlaceholders(content, vars);
  writeFileSync(destPath, replaced, 'utf8');
}

export function listTemplates(subdir) {
  const dir = join(TEMPLATES_DIR, subdir);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

export function getAllTemplateFiles(srcDir) {
  const files = [];
  function walk(dir) {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        walk(full);
      } else {
        files.push(full);
      }
    }
  }
  walk(srcDir);
  return files.map(f => ({ abs: f, rel: relative(srcDir, f) }));
}
