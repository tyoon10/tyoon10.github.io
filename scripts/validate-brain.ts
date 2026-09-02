import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateBrainData } from '../src/data/brain/validate.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'src/styles/brain/tokens.json'), 'utf8'));
const css = readFileSync(join(root, 'src/styles/brain/tokens.css'), 'utf8');

const issues: string[] = [];

if (tokens.version !== '1.0' || tokens.locked !== '2026-09-02' || tokens.direction !== 3) {
  issues.push('tokens.json: version, locked date, or direction drifted from Brand kit v1.0');
}
if (tokens.hermes !== 'preview-only') issues.push('tokens.json: hermes must be preview-only');
if (tokens.themes.light.canvas !== '#fefefc') issues.push('tokens.json: light canvas must be #fefefc');
if (tokens.themes.light.accent !== '#17324d') issues.push('tokens.json: light accent must be #17324d');
if (tokens.themes.light.onAccent !== '#ffffff') issues.push('tokens.json: light onAccent must be #ffffff');
if (tokens.themes.dark.canvas !== '#111417') issues.push('tokens.json: dark canvas must be #111417');
if (tokens.themes.dark.accent !== '#9dbdde') issues.push('tokens.json: dark accent must be #9dbdde');
if (tokens.themes.dark.onAccent !== '#111417') issues.push('tokens.json: dark onAccent must be #111417');

const requiredCss = [
  '--canvas:       #fefefc',
  '--accent:       #17324d',
  '--on-accent:    #ffffff',
  '--canvas:       #111417',
  '--accent:       #9dbdde',
  '--on-accent:    #111417',
  '--school-columbia:      #2b62a8',
  '--school-nyu:           #57068c',
  '--school-cornell-tech:  #b31b1b',
  '--school-yale:          #00356b',
  '--r-surface:    2px',
  '--r-action:     6px',
  '--r-pill:       999px',
  '--measure:      1120px',
  '--prose-width:  580px',
  '--gutter:       32px',
];

for (const needle of requiredCss) {
  if (!css.includes(needle)) issues.push(`tokens.css missing locked declaration: ${needle}`);
}

const dataIssues = validateBrainData();
for (const issue of dataIssues) issues.push(`${issue.module}: ${issue.message}`);

if (issues.length) {
  console.error('BRAIN validation failed:\n' + issues.map((i) => `  - ${i}`).join('\n'));
  process.exit(1);
}

console.log('BRAIN validation passed (tokens + five public modules).');
