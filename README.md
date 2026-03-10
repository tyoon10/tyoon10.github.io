# twyoon.com

Personal portfolio site for **Taewan Yoon** — MBA/MS at Columbia, AI strategist, builder.

**Live site:** [twyoon.com](https://twyoon.com)

## Tech Stack

- **Engine:** [Hugo](https://gohugo.io/) with [HugoBlox](https://hugoblox.com/) (blox-bootstrap/v5)
- **Hosting:** GitHub Pages via GitHub Actions
- **Domain:** twyoon.com (Cloudflare DNS)
- **CI/CD:** Push to `main` triggers automatic build and deploy

## Local Development

**Prerequisites:** Hugo Extended v0.155.1+, Git, Go 1.21+

```bash
hugo server             # Dev server at localhost:1313
hugo --gc --minify      # Production build
```

## License

All rights reserved.
