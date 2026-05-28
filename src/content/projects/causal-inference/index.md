---
title: "Causal Inference — Interactive Study Guide"
date: 2026-03-11
description: "A single-page interactive web app covering causal inference from potential outcomes to Double ML, with canvas visualizations, KaTeX formulas, and a full method comparison framework."
featured: false
coverImage: "./cover.svg"
tags:
  - "Causal Inference"
  - "Data Science"
  - "Interactive Visualization"
  - "JavaScript"
links:
  - name: "Live App"
    url: "https://tyoon10.github.io/causal-inference/"
    icon: "globe"
  - name: "Codebase"
    url: "https://github.com/tyoon10/causal-inference"
    icon: "github"
---


## Problem

Causal inference is a technically dense subject spanning graph theory, probability, and econometrics. Traditional study materials — lecture slides, textbooks, static PDFs — make it hard to build intuition for concepts like propensity score overlap, the algebraic equivalence of BDA and IPW, or why ML regularization bias matters for causal but not predictive modeling.

The challenge: **How do you make abstract causal reasoning tangible and interactive?**

## Approach

Built a self-contained, single-file HTML application with no external dependencies (beyond KaTeX CDN for math rendering). The study guide covers the full pipeline from fundamentals to advanced methods:

- **Potential Outcomes Framework** — counterfactuals, ATE/ATT/ATC, selection bias decomposition
- **Causal Graphs** — chains, forks, colliders, d-separation, back-door criterion and adjustment formula
- **Matching Methods** — exact matching, nearest-neighbor (Mahalanobis distance), propensity score matching with calipers
- **IPW** — inverse propensity weighting with "surprising units" intuition
- **Regression & BDA** — OLS for causal inference, predict-and-average, extrapolation dangers
- **Double ML** — residualization, cross-fitting, R-learner for CATE
- **Sensitivity Analysis** — breakdown point interpretation and robustness assessment

### Interactive Visualizations

Canvas-based visualizations make key concepts tangible:

- **Propensity score overlap** — slider controls confounding strength; watch distributions separate and overlap shrink
- **PS as sufficient summary** — clickable propensity score bands showing diverse covariate profiles mapping to the same score
- **IPW vs BDA equivalence** — toggle between stratification and reweighting views of the same computation
- **Breakdown point** — drag confounder strength slider to see ATE shrink toward zero, with robustness gauge

## Results

A zero-dependency, browser-based study tool that makes causal inference concepts interactive rather than static. Covers 9 methods with a unified decision framework for choosing between them.
