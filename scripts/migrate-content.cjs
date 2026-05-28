const fs = require('fs');
const path = require('path');

const LEGACY_DIR = '/home/taewan/projects/code/twyoon';
const NEW_DIR = '/home/taewan/projects/code/twyoon-astro';

// Custom lightweight YAML parser/serializer to avoid external dependencies
function parseFrontMatter(content) {
  const parts = content.split('---');
  if (parts.length < 3) return { yaml: {}, body: content };
  const yamlStr = parts[1];
  const body = parts.slice(2).join('---');
  
  const yaml = {};
  const lines = yamlStr.split('\n');
  
  let currentKey = null;
  let currentArray = null;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Detect array item in simple list
    if (trimmed.startsWith('-') && currentArray) {
      const val = trimmed.substring(1).trim().replace(/^["']|["']$/g, '');
      currentArray.push(val);
      continue;
    }

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.substring(0, colonIndex).trim();
    let val = line.substring(colonIndex + 1).trim();

    // Check if it's the start of a multi-line array
    if (val === '') {
      currentKey = key;
      currentArray = [];
      yaml[key] = currentArray;
      continue;
    }

    // Parse single-line values
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    else if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);

    if (val === 'true') val = true;
    else if (val === 'false') val = false;
    else if (!isNaN(val) && val !== '') val = Number(val);
    else if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
      if (val.length === 1 && val[0] === '') val = [];
    }

    yaml[key] = val;
    currentKey = null;
    currentArray = null;
  }

  return { yaml, body };
}

function serializeFrontMatter(yaml) {
  let str = '---\n';
  for (const [key, val] of Object.entries(yaml)) {
    if (typeof val === 'boolean' || typeof val === 'number') {
      str += `${key}: ${val}\n`;
    } else if (Array.isArray(val)) {
      if (val.length === 0) {
        str += `${key}: []\n`;
      } else {
        str += `${key}:\n`;
        val.forEach(item => {
          if (typeof item === 'object') {
            str += `  - `;
            const itemEntries = Object.entries(item);
            itemEntries.forEach(([k, v], idx) => {
              const formattedVal = String(v).replace(/"/g, '\\"');
              if (idx === 0) {
                str += `${k}: "${formattedVal}"\n`;
              } else {
                str += `    ${k}: "${formattedVal}"\n`;
              }
            });
          } else {
            str += `  - "${String(item).replace(/"/g, '\\"')}"\n`;
          }
        });
      }
    } else if (val instanceof Date) {
      str += `${key}: ${val.toISOString().split('T')[0]}\n`;
    } else if (typeof val === 'string') {
      str += `${key}: "${val.replace(/"/g, '\\"')}"\n`;
    } else if (val !== null && val !== undefined) {
      // fallback
      str += `${key}: "${String(val).replace(/"/g, '\\"')}"\n`;
    }
  }
  str += '---\n';
  return str;
}

// Helper to recursively copy directories
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Migrate Writings (Posts)
function migrateWritings() {
  console.log('Migrating writings...');
  const legacyPostDir = path.join(LEGACY_DIR, 'content/post');
  const targetWritingsDir = path.join(NEW_DIR, 'src/content/writings');

  if (!fs.existsSync(legacyPostDir)) {
    console.error('Legacy posts folder not found!');
    return;
  }

  fs.mkdirSync(targetWritingsDir, { recursive: true });

  const folders = fs.readdirSync(legacyPostDir);
  for (let folder of folders) {
    if (folder.startsWith('_') || folder.startsWith('.')) continue; // skip templates and hidden

    const legacyFolder = path.join(legacyPostDir, folder);
    const targetFolder = path.join(targetWritingsDir, folder);

    if (fs.statSync(legacyFolder).isDirectory()) {
      // Create new folder
      fs.mkdirSync(targetFolder, { recursive: true });

      // Copy assets (images, pdfs)
      fs.readdirSync(legacyFolder).forEach(file => {
        if (file !== 'index.md' && file !== '_index.md') {
          fs.copyFileSync(path.join(legacyFolder, file), path.join(targetFolder, file));
        }
      });

      // Parse and modernize index.md
      const mdPath = path.join(legacyFolder, 'index.md');
      if (fs.existsSync(mdPath)) {
        const rawContent = fs.readFileSync(mdPath, 'utf8');
        const { yaml, body } = parseFrontMatter(rawContent);

        // Standardize keys
        const modernizedYaml = {
          title: yaml.title || folder,
          date: yaml.date ? new Date(yaml.date) : new Date(),
          description: yaml.summary || '',
          featured: yaml.featured === true || folder === 'student-ai-tools', // standard student featured item
          tags: Array.isArray(yaml.tags) ? yaml.tags : []
        };

        const newContent = serializeFrontMatter(modernizedYaml) + body;
        fs.writeFileSync(path.join(targetFolder, 'index.md'), newContent, 'utf8');
        console.log(` -> Migrated writing: ${folder}`);
      }
    }
  }
}

// 2. Migrate Projects
function migrateProjects() {
  console.log('Migrating projects...');
  const legacyProjectDir = path.join(LEGACY_DIR, 'content/project');
  const targetProjectsDir = path.join(NEW_DIR, 'src/content/projects');

  if (!fs.existsSync(legacyProjectDir)) {
    console.error('Legacy projects folder not found!');
    return;
  }

  fs.mkdirSync(targetProjectsDir, { recursive: true });

  const folders = fs.readdirSync(legacyProjectDir);
  for (let folder of folders) {
    if (folder.startsWith('_') || folder.startsWith('.')) continue;

    const legacyFolder = path.join(legacyProjectDir, folder);
    const targetFolder = path.join(targetProjectsDir, folder);

    if (fs.statSync(legacyFolder).isDirectory()) {
      // Create new folder
      fs.mkdirSync(targetFolder, { recursive: true });

      // Copy assets
      fs.readdirSync(legacyFolder).forEach(file => {
        if (file !== 'index.md' && file !== '_index.md') {
          fs.copyFileSync(path.join(legacyFolder, file), path.join(targetFolder, file));
        }
      });

      // Parse and modernize index.md
      const mdPath = path.join(legacyFolder, 'index.md');
      if (fs.existsSync(mdPath)) {
        const rawContent = fs.readFileSync(mdPath, 'utf8');
        const { yaml, body } = parseFrontMatter(rawContent);

        // Modernize links array
        const links = [];
        if (yaml.external_link) {
          links.push({ name: 'View Project', url: yaml.external_link, icon: 'external-link' });
        }
        if (Array.isArray(yaml.links)) {
          yaml.links.forEach(l => {
            if (l.url) {
              links.push({ name: l.name || 'Link', url: l.url, icon: l.icon || '' });
            }
          });
        }

        const modernizedYaml = {
          title: yaml.title || folder,
          date: yaml.date ? new Date(yaml.date) : new Date(),
          description: yaml.summary || '',
          featured: yaml.featured === true || folder === 'causal-inference', // default featured project
          tags: Array.isArray(yaml.tags) ? yaml.tags : [],
          links: links
        };

        const newContent = serializeFrontMatter(modernizedYaml) + body;
        fs.writeFileSync(path.join(targetFolder, 'index.md'), newContent, 'utf8');
        console.log(` -> Migrated project: ${folder}`);
      }
    }
  }
}

// Run migration
try {
  migrateWritings();
  migrateProjects();
  console.log('\nMigration completed successfully!');
} catch (e) {
  console.error('Migration failed:', e);
}
