# twyoon.com — Personal Portfolio (Astro Edition)

This is the high-performance, custom-designed personal portfolio and article showcase for **Taewan Yoon**. 

It has been rebuilt from scratch using **Astro**, replacing a legacy, rigid Hugo Blox theme configuration. The site is designed for extreme performance (100/100 Core Web Vitals) and premium Paco Coursey/Linear-style Alabaster Light aesthetics, while maintaining a pure markdown content workflow.

---

## 🚀 Key Features

*   **100% Custom Layout Engine:** Built entirely on **Astro** and **Vanilla CSS**—free from rigid Bootstrap grids or template overrides.
*   **Islands of Hydration:** Ships zero client-side JavaScript by default, only compiling and serving script logic for active interactive blocks.
*   **Type-Safe Content Collections:** Powered by **Zod schemas** inside Astro's v5 Content Layer to validate and auto-generate dynamic feeds for your projects and articles at build time.
*   **Paco-Style Alabaster Light Aesthetics:** Clean minimalist Alabaster base (`#fafafc`), high-contrast slate text (`#0f172a`), ambient glow overlays, and fluid micro-transitions. Completely stripped of dark-mode switches to ensure extreme loading speeds and typographic clarity.
*   **Bespoke Image & Logos Tray:** Biography displays actual brand logo images (`cbs.png`, `anthropic.svg`, etc.) with grayscale hover filters instead of vector icons.
*   **Interactive Sandboxes:** Features native, inline client-side consoles (such as the *Causal Inference simulator*) running with sub-pixel precision.

---

## 📂 File System Architecture

Below is the directory mapping for your active website filesystem:

```
twyoon/
├── public/                       # Static public assets
│   ├── favicon.svg               # Browser icon
│   ├── resume.pdf                # PDF Resume (accessible at /resume.pdf)
│   └── media/
│       └── logos/                # Brand partner logos (cbs.png, anthropic.svg, etc.)
│
├── src/
│   ├── components/               # Reusable UI elements
│   │   ├── Navigation.astro      # Header navigation pill bar
│   │   ├── Footer.astro          # Clean structural footer
│   │   └── LogoTray.astro        # Grayscale image-based logo tray
│   │
│   ├── content/                  # Structured site content (markdown database)
│   │   ├── projects/             # Project directories (index.md + case study media)
│   │   └── writings/             # Article folders (index.md + essay media)
│   │
│   ├── content.config.ts         # Astro v5 Content Layer collections & Zod schemas
│   │
│   ├── layouts/                  # Base document wrapper templates
│   │   └── BaseLayout.astro      # Master layout (HTML head, SEO tags, global grids)
│   │
│   ├── pages/                    # Explicit, folder-based page routes
│   │   ├── index.astro           # Homepage (Hero, Bento Projects, Sandbox, Writings, Events)
│   │   ├── projects/
│   │   │   └── [...slug].astro   # Dynamic route for single project pages
│   │   └── writings/
│   │       ├── index.astro       # Full writings list
│   │       └── [...slug].astro   # Dynamic route for single articles
│   │
│   └── styles/                   # Core styling system
│       └── global.css            # Custom visual tokens, animations, & base rules
│
├── scripts/                      # Auxiliary folders
│   └── migrate-content.cjs       # Node content migration utility (housekeeping item)
│
├── astro.config.mjs              # Astro runtime settings
├── package.json                  # NPM packages, build scripts, & Zod dependencies
├── tsconfig.json                 # TypeScript strict compilation settings
└── README.md                     # This file
```

---

## BRAIN NYC Roundtable — preview (not production)

HERMES: drafting and preview are allowed. **Production publish is forbidden.** This does not replace the personal homepage. GitHub Pages still deploys the personal site from `main`; `/brain` is a noindex preview route.

Brand kit v1.0 (2026-09-02) lives at `src/styles/brain/tokens.css` and `src/styles/brain/tokens.json`. Parchment & Navy is a **working preview skin** because this route sits on twyoon.com until a domain is picked — not a settled homepage direction. Do not invent tokens, wordmarks, or chrome.

```bash
npm install
npm run dev
```

Then open **http://localhost:4321/brain**. Nested preview routes: `/brain/offers`, `/brain/docket`, `/brain/programs`, `/brain/brief`.

```bash
npm run validate:brain   # tokens + five public data modules
npm test                 # upcoming, lexicon, offer-book gate, outbound sittings
npm run check            # astro / TypeScript
npm run build
```

The door is free. This preview is not a box office: no tickets, checkout, paid seats, or funding story. Partner slots are a reserved mark — no logos.

The personal homepage (`/`) is unchanged in meaning. Do not merge this preview as the live site. `/brain` homepage direction remains open.

---

## 🛠️ Local Development & Scripts

Prerequisites: **Node.js v18.14.1+** and **NPM** inside WSL.

### 1. Project Setup
Install development dependencies:
```bash
npm install
```

### 2. Live Dev Server
Launch the local hot-reloading development preview at `http://localhost:4321`:
```bash
npm run dev
```

### 3. Build & Compile
Compile the entire project into highly optimized, minified static HTML files ready for hosting:
```bash
npm run build
```
*Compiled files are outputted to the local `dist/` directory.*

### 4. Code Checks & Validation
Verify markdown schema integrity and TypeScript compiling:
```bash
npx astro check
```

---

## ✍️ Writing a New Article

To write a new blog post or case study:
1. Create a new directory under `src/content/writings/my-article-title/`.
2. Inside that directory, create an `index.md` file.
3. Define the metadata front-matter at the top of the file:
   ```markdown
   ---
   title: "Causal Inference in Product Strategy"
   date: 2026-05-27
   description: "A summary of calculating treatment effects in complex digital workflows."
   featured: true
   tags: ["Product Strategy", "Data Science"]
   ---
   Your markdown body text goes here...
   ```
4. Put any article-specific screenshots directly inside that folder and reference them using standard relative markdown syntax:
   `![My Diagram](./my-diagram.png)`
5. Run `npm run dev` to preview the article instantly. The homepage "Writings" feed will automatically pull, sort, and render your new post dynamically!

---

## 🧹 Housekeeping To-Do

The auxiliary folder `scripts/` contains the `migrate-content.cjs` script used for the sanitization of legacy files. 
*   **Status:** Retained for reference.
*   **Plan:** Once the Astro codebase is fully deployed and finalized on production, this directory can be safely deleted to keep the production bundle as lean as possible.
