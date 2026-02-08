---
title: "AI Pipeline for Quantitative Finance Research"
summary: "Built a LightRAG pipeline that transforms 4,000+ academic papers into a queryable graph vector database, surfacing contrarian investment strategies with 2.4x more comprehensive responses than naive RAG."
authors:
  - admin
tags:
  - RAG
  - Python
  - Quantitative Finance
  - LLM
  - Enterprise AI
categories:
  - AI Systems
date: 2025-09-30

image:
  caption: ""
  focal_point: Smart
  preview_only: false

draft: false
---

## Problem

Professional investors rely on being "plugged in" to find strategies — a process prone to behavioral bias and impossible to scale. New quants face tens of thousands of academic papers published each quarter, strict API limits (SSRN: 500 requests/hour), and ~20% paywall failure rates. Dragging 4,000 PDFs into an LLM produces generic, context-free answers that destroy the relationships and hierarchies that make research actionable.

The central question: **How do you systematically surface niche, contrarian investment ideas from an ocean of academic literature?**

## Approach

Built an end-to-end, five-stage AI pipeline with Prof. Michael Robbins (six-time CIO, author of *Quantitative Asset Management*, McGraw-Hill) at Columbia.

### 1. Sourcing & Acquisition

Developed a three-phase funnel to handle volume constraints:

- **Harvest**: Automated metadata extraction (titles, abstracts, references) from Semantic Scholar, ArXiv, SSRN, and OpenAlex — no full PDFs yet
- **Classify & Screen**: Analytic learning process that scores and ranks papers on metadata alone, assessing relevance and quality before committing API calls
- **Download & Store**: Only papers passing screening are downloaded, turning an unmanageable firehose into a curated corpus of high-potential research

### 2. Cleaning & Structuring

Standard PDF-to-text extraction flattens documents, destroying the author's intended structure. Built a **custom academic paper ingestor** using GROBID, PyMuPDF, and scipdf-parser to convert each paper into structured JSON that preserves:

- Section hierarchy (titles, headers, nested lists)
- Table relationships and figure references
- Enriched metadata from OpenAlex and Semantic Scholar (author details, citation data, publication records)

### 3. Analyzing Structures

Programmatically answered the five questions a human analyst would ask:

| Question | Method |
|----------|--------|
| Does this paper matter? | Computational linguistics: Market-Lexicon Coverage, Finance Sentiment Profile (data-driven vs. sensationalist language) |
| What papers are similar? | k-Nearest Neighbors on document embeddings to find research clusters |
| Is the methodology reproducible? | Methodology token analysis + Citation Depth scoring |
| Who's talking to whom? | Citation network graph analysis (PageRank, centrality) to map influential research hubs |
| When does an idea emerge and fade? | Temporal topic tracking and sentiment analysis |

All computed features are written back into the JSON as enriched metadata — creating a dataset that enables queries impossible for out-of-the-box LLMs.

### 4. Ingestion & Vector Database (LightRAG)

Evaluated three retrieval architectures:

- **Naive RAG**: Flattened our structured metadata. Author relationships, citation networks, and section hierarchies were lost. Generic, short responses.
- **Full Graph RAG**: Preserves context but requires expensive graph neural networks. 2–3x slower ingestion, impractical at scale.
- **LightRAG** (selected): Preserves hierarchies and entity relationships while balancing graph awareness with efficiency. Key advantage: **incremental ingestion** — add new papers without rebuilding the database.

**Technical stack:**

| Component | Tool |
|-----------|------|
| Embeddings | SentenceTransformers (all-MiniLM-L6-v2) |
| Graph structure | NetworkX, LightRAG-HKU |
| Entity recognition | SpaCy (en_core_web) |
| Semantic matching | scikit-learn cosine similarity |
| Graph database | Neo4j |
| Orchestration | MATLAB with Python via MATLAB Engine API |

### 5. Prompting & Evaluation

Iterative prompt refinement against professional analyst standards. The enriched metadata enables queries like:

> *"Show me papers with high linguistic complexity, referenced by authors from top-tier universities, that are not widely cited."*

> *"Find papers with similar vector profiles to this niche Auction paper, but exclude any that rely on end-of-day data."*

These queries are only possible because we pre-calculated and embedded esoteric metadata into the database. You can't drag 4,000 PDFs into an LLM and expect this — you have to build the data foundation first.

## Results

| Metric | Value |
|--------|-------|
| Papers processed | 4,000+ financial research papers |
| Knowledge graph entities | 45,000+ with mapped relationships |
| Response quality vs. naive RAG | **2.4x more comprehensive** content |
| Context preservation | Maintains document relationships that naive RAG destroys |
| Evaluation coverage | 7 comprehensive test queries (portfolio optimization, risk management, computational finance) |
| Audience | Presented to **200+ industry professionals** at the MathWorks Annual Finance Conference (Sep 2025) |

## Key Insight

BloombergGPT demonstrated that specialized finance models can outperform general-purpose LLMs on domain tasks — but GPT-4 overtook it shortly after release. Simply specializing in a domain is not a durable edge. The durable edge is in **structured data and enrichment**: preserving context, enhancing with traditional ML, and targeting contrarian objectives that consensus-driven models are designed to ignore. The pipeline, not the model, is the moat.
