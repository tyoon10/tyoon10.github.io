#!/usr/bin/env python3
"""Custom cover for the claude-ensemble post, in Claude/Anthropic design conventions:
warm ivory ground, a single coral accent, serif display, minimal. The motif is the kit itself —
several panel drafts converge through a judge into one verified answer (many -> one)."""
import os

W, H = 1200, 630
BG    = "#F0EEE6"   # Anthropic ivory
INK   = "#1A1915"   # warm near-black
CORAL = "#D97757"   # Claude coral
DEEP  = "#BE5D42"   # deeper coral (accents)
MUTED = "#6B6459"   # tagline
FAINT = "#A79E90"   # sub / draft dots
LINE  = "#CDC4B5"   # converging lines
PILL  = "#E7E3D7"   # command chip ground

s = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">']
s.append(f'<rect width="{W}" height="{H}" fill="{BG}"/>')

# --- motif: 3 drafts -> judge -> verified answer, centered on x=600, band y=175 ---
cy = 178
dx, jx, ax = 468, 600, 736
dys = [cy - 40, cy, cy + 40]
# converging lines (drawn first, nodes on top)
for y in dys:
    s.append(f'<line x1="{dx}" y1="{y}" x2="{jx}" y2="{cy}" stroke="{LINE}" stroke-width="1.6"/>')
s.append(f'<line x1="{jx}" y1="{cy}" x2="{ax}" y2="{cy}" stroke="{LINE}" stroke-width="1.6"/>')
# draft nodes (muted filled dots)
for y in dys:
    s.append(f'<circle cx="{dx}" cy="{y}" r="7" fill="{FAINT}"/>')
# judge node (coral ring)
s.append(f'<circle cx="{jx}" cy="{cy}" r="13" fill="{BG}" stroke="{CORAL}" stroke-width="2.4"/>')
# answer node (filled coral) with a verify halo
s.append(f'<circle cx="{ax}" cy="{cy}" r="22" fill="none" stroke="{CORAL}" stroke-width="1.5" opacity="0.45"/>')
s.append(f'<circle cx="{ax}" cy="{cy}" r="13" fill="{CORAL}"/>')
# tiny role labels under the nodes (small, faint — keeps it self-explanatory)
for x, lab in [(dx, "drafts"), (jx, "judge"), (ax, "answer")]:
    s.append(f'<text x="{x}" y="{cy+52}" text-anchor="middle" font-family="-apple-system,Segoe UI,Roboto,sans-serif" font-size="15" fill="{FAINT}" letter-spacing="0.4">{lab}</text>')

# --- wordmark (serif, Anthropic display feel) ---
s.append(f'<text x="{W/2}" y="352" text-anchor="middle" font-family="Georgia,\'Iowan Old Style\',\'Times New Roman\',serif" '
         f'font-size="70" font-weight="600" letter-spacing="0.5" fill="{INK}">claude-ensemble</text>')

# --- tagline (sans, muted) ---
s.append(f'<text x="{W/2}" y="404" text-anchor="middle" font-family="-apple-system,Segoe UI,Roboto,sans-serif" '
         f'font-size="26" fill="{MUTED}">A panel, a judge, and a verify-loop.</text>')

# --- sub-line ---
s.append(f'<text x="{W/2}" y="440" text-anchor="middle" font-family="-apple-system,Segoe UI,Roboto,sans-serif" '
         f'font-size="18" fill="{FAINT}">Frontier-level answers, entirely on a Claude subscription.</text>')

# --- command chip (ties to the CLI; mono) ---
pw, ph = 402, 52
px, py = (W - pw) / 2, 486
s.append(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="{ph/2}" fill="{PILL}"/>')
ty = py + ph / 2 + 7
s.append(f'<text x="{W/2}" y="{ty}" text-anchor="middle" font-family="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace" font-size="20">'
         f'<tspan fill="{DEEP}">&#10095; </tspan>'
         f'<tspan fill="{INK}">/ensemble</tspan>'
         f'<tspan fill="{MUTED}">  &lt;your hardest task&gt;</tspan></text>')

s.append('</svg>')
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cover.svg")
open(out, "w").write("\n".join(s))
print("wrote", out)
