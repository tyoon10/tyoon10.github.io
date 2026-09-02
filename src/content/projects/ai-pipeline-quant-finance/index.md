---
title: "RAG Pipeline for Quantitative Investment Research"
date: 2025-09-30
description: "Built a LightRAG pipeline that combines a knowledge graph with vector embeddings to make 4,000+ academic papers queryable, surfacing contrarian investment strategies with 2.4x more comprehensive responses than naive RAG. Presented at MathWorks."
venue: "MathWorks Finance Conference 2025"
featured: true
coverImage: "./cover.png"
tags:
  - "RAG"
  - "Quantitative Finance"
  - "LLM"
  - "Enterprise AI"
links:
  - name: "Conference Recording"
    url: "https://www.mathworks.com/videos/investment-strategies-ideation-using-large-language-models-and-structured-multi-modal-data-1760424545621.html"
    icon: "globe"
---


## Problem

Professional investors rely on being "plugged in" to find strategies — a process prone to behavioral bias and impossible to scale. New quants face tens of thousands of academic papers published each quarter, strict API limits (SSRN: 500 requests/hour), and ~20% paywall failure rates. Dragging 4,000 PDFs into an LLM produces generic, context-free answers that destroy the relationships and hierarchies that make research actionable.

The central question: **How do you systematically surface niche, contrarian investment ideas from an ocean of academic literature?**

Most retrieval systems converge on consensus papers — by design. This pipeline is built to do the opposite: surface high-quality work the consensus has missed.

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

*What structural elements survive ingestion?* The architecture choice rides on this question — every downstream query depends on what isn't flattened here.

<figure class="article-figure">
  <iframe src="/projects/ai-pipeline-quant-finance/figures/01-structural-preservation.html" loading="lazy" title="Structural preservation under three retrieval architectures" style="display:block; width:100%; aspect-ratio: 16 / 9; border: 0;"></iframe>
  <figcaption>One paper, three architectures. Naive RAG flattens hierarchy, tables, citations, and metadata into undifferentiated text. Full Graph RAG preserves everything but requires rebuild on each ingest. LightRAG preserves the structural signals downstream queries depend on while supporting incremental ingestion.</figcaption>
</figure>

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

Every query in this section rides on metadata pre-computed by an earlier stage. Drop a stage and the query dies.

<figure class="article-figure">
  <iframe src="/projects/ai-pipeline-quant-finance/figures/02-backward-dependency-trace.html" loading="lazy" title="Backward dependency trace from query to pipeline stages" style="display:block; width:100%; aspect-ratio: 16 / 9; border: 0;"></iframe>
  <figcaption>One advanced query, traced backward to the upstream pipeline stages that made it possible. Linguistic complexity, author affiliation, citation depth, and embedding identity each come from a different stage — drop any one and the query returns nothing.</figcaption>
</figure>

Iterative prompt refinement against professional analyst standards. The enriched metadata enables queries like:

> *"Show me papers with high linguistic complexity, referenced by authors from top-tier universities, that are not widely cited."*

> *"Find papers with similar vector profiles to this niche Auction paper, but exclude any that rely on end-of-day data."*

These queries are only possible because we pre-calculated and embedded esoteric metadata into the database. You can't drag 4,000 PDFs into an LLM and expect this — you have to build the data foundation first.

## Results

<figure class="article-figure">
  <iframe src="/projects/ai-pipeline-quant-finance/figures/03-strategic-geometry.html" loading="lazy" title="Strategic geometry — why the pipeline targets the alpha zone" style="display:block; width:100%; aspect-ratio: 16 / 9; border: 0;"></iframe>
  <figcaption>Citation count × quality. Standard RAG retrieves from the consensus zone — high-citation, well-trodden papers. This pipeline is built to target the alpha zone: high-quality work the consensus has missed, surfaced by linguistic-complexity, author-affiliation, and citation-depth filters layered on top of LightRAG.</figcaption>
</figure>

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
