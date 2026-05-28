# twyoon.com — Astro Migration & Technical Decision Record

This document records the architectural audit of the personal portfolio site, the exploration of redesign pathways, the technical trade-offs analyzed, and the active roadmap for migrating from **Hugo + HugoBlox** to **Astro**.

---

## 1. Context & Architectural Audit
The original codebase of `twyoon.com` was built using the **Hugo** engine coupled with the **HugoBlox (formerly Academic / Wowchemy)** theme module. 

While HugoBlox is an excellent framework for rapid, out-of-the-box academic profiles, it poses severe layout limitations when attempting to elevate a website to an **elite, highly custom, Design Engineering standard** (e.g., Paco Coursey, Linear, Stripe-style micro-interactions).

### Key Constraints of the Hugo Blox System:
1. **Theme Rigidity:** HugoBlox compiles pages dynamically via predefined widgets mapped to deep-nested Bootstrap 5 grids. Custom styling (such as asymmetric Bento grids, ambient radial glows, or card borders) requires writing complex CSS overrides to "fight" the theme's core layouts.
2. **Compilation Instability:** Because the theme is loaded as a remote module, local compiling is highly fragile. A minor Hugo version shift recently broke compilation globally due to the deprecation of the `getCSV` template function, requiring custom layout overrides simply to compile.
3. **Interactive Sandboxes:** Incorporating rich, modern, client-side interactions (like the *Causal Inference ATE slider sandbox*) is extremely difficult due to the theme's isolated scripting scopes.

---

## 2. Explored Pathways & Trade-offs

We evaluated three potential architectural directions to achieve a stunning, responsive, widescreen dark-mode portfolio.

### Option A: Force Overrides on the Hugo Theme (Status Quo)
*   **Approach:** Keep the Hugo engine and use SCSS overrides inside `assets/scss/custom.scss` to force styling.
*   **Pros:** Preserves existing content structure; sitemaps and SEO configurations remain unchanged.
*   **Cons:** Extremely high friction. Responsive breaking points occur easily because the HTML classes cannot be modified.

### Option B: Pure Custom Static Site (HTML / CSS / JS)
*   **Approach:** Build a decoupled website entirely from scratch with static HTML pages, vanilla CSS, and clean JS scripts.
*   **Pros:** 100% design freedom. Absolutely zero compile-time dependencies. Zero JavaScript runtime overhead unless explicitly written. Perfect layout rendering.
*   **Cons:** **Content Maintenance Trap.** To add a new writing or project, you must write HTML tags manually. If the site navigation or footer changes, you must manually update every single HTML file in your project, leading to high maintenance overhead.

### Option C: The Astro Framework (Selected Path)
*   **Approach:** Migrate to **Astro**, a modern Static Site Generator built specifically for content-rich portfolios.
*   **Pros:** 
    *   **Islands Architecture:** Ships zero client-side JavaScript by default, ensuring lightning-fast load times (Lighthouse 100/100).
    *   **Bespoke Design Freedom:** Write your HTML and CSS from scratch without any framework layout opinions.
    *   **Content Collections:** Preserves your markdown-driven workflow. You write articles and projects in standard Markdown/MDX, and Astro automatically compiles them into your custom layouts.
    *   **Type Safety:** Uses Zod schemas to validate your content metadata during compilation, preventing broken links or missing fields.
*   **Cons:** Requires a one-time migration of your Markdown files and visual assets.

---

## 3. Standardized Visual & Layout Decisions

During our design review sessions, we aligned on the following structural decisions:
1.  **Light Mode Default (Alabaster Minimalist):** We locked in a clean, high-contrast, text-first Light Theme base (using `#fafafc` base and slate text `#0f172a`). Dark mode toggle elements and scripts have been completely removed to ensure styling clarity and extreme loading performance.
2.  **Pure Typographic Hero & Bio:** Stripped any profile headshots or initial graphic badges from the top sections, focusing 100% on surgical, high-fidelity variable font grids.
3.  **Original Logo Assets Integration:** The Biography section renders the original image assets (`cbs.png`, `anthropic.svg`, `columbia-engineering.png`, `cfany.png`) rather than generic vector icons. We styled custom grayscale filters (`filter: grayscale(100%) opacity(60%)`) that ease into full color on mouse hover.
4.  **Events Section Renaming:** Remapped the Speaking & Ecosystem timeline to a minimalist "Events" section with a custom "View more events" action redirecting to your professional network logs.
5.  **Astro Folder Housekeeping:** The migration script (`scripts/migrate-content.cjs`) remains active in the active directory as a record during transition and will be cleaned up once fully deployed.

---

## 4. Active Migration Progress (Astro v5)

```
[x] Step 1: Design Prototype Verification
    - Confirmed 100% design fidelity and layout freedom using standard CSS variables.

[x] Step 2: Formulate Migration Plan
    - Created detailed `implementation_plan.md` in the project archives.

[x] Step 3: Initialize Astro Repository
    - Set up Astro minimal project directly inside WSL Ubuntu at `/home/taewan/projects/code/twyoon`
    - Configured Astro v5 modern Content Layer glob loaders in `src/content.config.ts`

[x] Step 4: Run Front-Matter Migration Script
    - Executed `scripts/migrate-content.cjs` to copy and sanitize all 9 blog essays and 3 project case studies.
    - Standardized date objects, descriptions, and tag structures under Zod type contracts.

[x] Step 5: Implement Custom Layouts & Styling
    - Ported all visual variables, grids, and transitions into `src/styles/global.css`.
    - Enforced strict Light Mode and typography rules.

[x] Step 6: Fix QA Image Rendering inside Markdown
    - Resolved image loader rendering by converting legacy Hugo shortcodes into standard relative markdown links `./image.png`.
    - Placed high-fidelity generated Diagrams into the content folder; Astro v5 successfully compiles, compresses, and optimizes them into responsive WebP outputs.

[x] Step 7: Sibling Folder Rename & Archives
    - Renamed legacy active folder to `/home/taewan/projects/code/twyoon-backup`
    - Renamed `/home/taewan/projects/code/twyoon-astro` to `/home/taewan/projects/code/twyoon` (Active folder)

[ ] Step 8: Deploy & Future Housekeeping
    - Run Astro Folder Housekeeping scripts cleanup.
    - Set up automatic GitHub Actions pipeline.
```
