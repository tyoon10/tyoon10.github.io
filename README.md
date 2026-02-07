# twyoon.com — Maintenance Guide

Private reference for maintaining and updating the personal portfolio site.

---

## Project Overview

| | |
|---|---|
| **Live URL** | https://twyoon.com |
| **Repository** | https://github.com/tyoon10/tyoon10.github.io |
| **Branch** | `main` (pushes trigger deployment) |
| **Engine** | Hugo Extended v0.155.1 |
| **Theme** | HugoBlox blox-bootstrap/v5 v5.9.7 |
| **Hosting** | GitHub Pages via GitHub Actions |
| **Domain** | twyoon.com (Cloudflare DNS) |
| **Dev environment** | Windows 11 |

---

## File Structure

```
twyoon/
├── .github/workflows/hugo.yaml   # CI/CD pipeline
├── .gitignore
├── assets/scss/custom.scss        # Style overrides
├── content/
│   ├── _index.md                  # Homepage (all landing page sections)
│   ├── authors/admin/
│   │   ├── _index.md              # Author profile
│   │   └── avatar.jpg             # Headshot (must be named avatar.*)
│   ├── project/                   # Each subfolder = one project page
│   │   └── _template/index.md     # Copy this to create new projects
│   └── post/                      # Each subfolder = one blog post
│       └── _template/index.md     # Copy this to create new posts
├── go.mod / go.sum                # Hugo module deps (go.sum is auto-generated)
├── hugo.yaml                      # Main config (appearance, features, nav)
├── CNAME                          # Custom domain for GitHub Pages
├── README.md                      # This file
└── ROADMAP.md                     # Product roadmap and task items
```

**Do not edit:** `go.sum`, `public/`, `resources/_gen/` (all auto-generated).

---

## Local Development

**Prerequisites:** Hugo Extended v0.155.1+, Git, Go 1.21+

```powershell
hugo server                 # Dev server at http://localhost:1313/
hugo --gc --minify          # Production build (what CI runs)
hugo mod get -u             # Update theme modules
hugo mod clean              # Clear module cache
```

---

## Editing Content

### Homepage

Edit `content/_index.md`. Sections are YAML blocks under `sections:` — file order = page order.

| Section  | Block Type     | `id`       | Controls                                    |
|----------|----------------|------------|---------------------------------------------|
| Hero     | `hero`         | `hero`     | Name, tagline, CTA buttons                  |
| About    | `about.avatar` | `about`    | Avatar, bio, education, interests, socials   |
| Projects | `collection`   | `projects` | Cards from `content/project/`                |
| Posts    | `collection`   | `posts`    | List from `content/post/`                    |
| Contact  | `contact`      | `contact`  | Email, LinkedIn, GitHub                      |

**Change hero text:** Edit `sections[0].content.text`
**Change CTA buttons:** Edit `sections[0].content.cta` / `cta_alt`
**Change project/post count:** Edit `count` in the relevant collection block
**Reorder sections:** Move YAML blocks up or down
**Remove a section:** Delete or comment out its `- block:` entry

### Author Profile

Edit `content/authors/admin/_index.md`.

| Field          | Controls                                         |
|----------------|--------------------------------------------------|
| `title`        | Display name                                     |
| `role`         | Subtitle (e.g., "AI Strategist")                 |
| `organizations`| Org names + URLs under role                      |
| `bio`          | One-liner for meta tags                          |
| `interests`    | Bullet list in About section                     |
| `education`    | Timeline in About section                        |
| `social`       | Icon links (use `fas` for solid, `fab` for brands)|
| Body text      | Paragraph below closing `---` = bio text         |

**Avatar:** Place `avatar.jpg` or `avatar.png` in `content/authors/admin/`.

### Adding a Project

```powershell
Copy-Item -Recurse content/project/_template content/project/my-project-name
```

Edit `index.md`: set `title`, `summary`, `tags`, `date`, set `draft: false`.
Optional: add `featured.jpg` to the folder for a card image.
Folder name = URL slug (`content/project/rag-bot/` → `twyoon.com/project/rag-bot/`).

### Adding a Blog Post

```powershell
Copy-Item -Recurse content/post/_template content/post/my-post-title
```

Edit `index.md`: set `title`, `summary`, `tags`, `date`, set `draft: false`.
Link to a project: add `projects: [my-project-name]` in frontmatter.

### Navigation Menu

In `hugo.yaml` under `menus.main`:

```yaml
- name: Display Text    # Navbar label
  url: '#section-id'    # Anchor (homepage) or /path/ (standalone page)
  weight: 10            # Sort order (lower = further left)
```

---

## Features

### Dark Mode

In `hugo.yaml` → `params.appearance`:
- Both `theme_day` and `theme_night` are set → navbar shows day/night toggle
- To force dark only: remove `theme_day` (theme defaults to dark when absent)
- Theme packs: `default`, `minimal`, `solar`, `dracula`, `synthwave`

### LaTeX Math

Enabled via `params.features.math.enable: true`. Rendered from CDN.
- Inline: `$E = mc^2$`
- Block: `$$\sum_{i=1}^{n} x_i$$`

### Syntax Highlighting

Configured via `params.features.syntax_highlighter`:
- Dark: `dracula` / Light: `github-light`
- Use fenced code blocks with language identifier (e.g., ` ```python `)

### Custom Styles

All overrides in `assets/scss/custom.scss`. Key selectors:

| Selector              | Purpose                              |
|-----------------------|--------------------------------------|
| `.powered-by`         | Hides "Published with Hugo Blox"     |
| `.wg-hero .hero-lead` | Hero text width + opacity            |
| `.dark pre`           | Dark mode code block styling         |
| `#profile .bio-text`  | Bio paragraph max-width              |
| `.navbar`             | Nav font size                        |

---

## Git Workflow

Single-branch on `main`. Every push triggers deployment.

```powershell
git status                                          # Check changes
hugo server                                         # Preview locally
git add content/project/my-project/index.md         # Stage specific files
git commit -m "Add project case study"              # Commit
git push origin main                                # Deploy
```

- **Always preview locally** before pushing (`hugo server` or `hugo --gc --minify`)
- **Stage specific files** — avoid `git add -A` (can catch secrets or binaries)
- **Pull first** if you edited from another machine: `git pull origin main`
- **Templates** (`_template/` folders) have `draft: true` — they never appear live
- **Never commit:** `.env`, API keys, `public/`, images over 1MB without compression

---

## Deployment

**Automatic:** Push to `main` → GitHub Actions builds with Hugo → deploys to GitHub Pages.
**Manual:** Trigger from the Actions tab (workflow_dispatch is enabled).
**Monitor:** https://github.com/tyoon10/tyoon10.github.io/actions

### Troubleshooting

| Problem | Fix |
|---------|-----|
| Hugo version mismatch | Update `HUGO_VERSION` in `.github/workflows/hugo.yaml` to match local |
| Module resolution error | Run `hugo mod get -u` locally, commit `go.mod` + `go.sum` |
| Template error | Run `hugo` locally first to catch errors before pushing |

### GitHub Pages Settings

Repository Settings → Pages → Source → **GitHub Actions** (not branch).

---

## Domain & DNS

**Wiring:** `CNAME` file (contains `twyoon.com`) → Cloudflare CNAME record (`twyoon.com` → `tyoon10.github.io`) → Cloudflare handles SSL + CDN.

### If the domain breaks

1. Check `CNAME` file exists in repo root with `twyoon.com`
2. Check Cloudflare DNS: CNAME `@` → `tyoon10.github.io`
3. Check GitHub Pages settings: custom domain = `twyoon.com`, DNS check passed
4. If redirect loops: set Cloudflare SSL to **Full** (not Flexible)

---

## Maintenance

### Updating Hugo

```powershell
hugo version                    # Check current
choco upgrade hugo-extended     # Update (Windows/Chocolatey)
# Then update .github/workflows/hugo.yaml → HUGO_VERSION to match
```

### Updating Theme

```powershell
hugo mod get -u                 # Updates go.mod + go.sum
hugo server                     # Test for breaking changes
# Commit go.mod and go.sum
```

### Known Issues

- **Sitemap warning** (`skipping template file ... sitemap.xml`) — harmless, from blox-seo module
- **Windows reserved filenames** — never create files named `nul`, `con`, `prn`, `aux`
