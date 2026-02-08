---
title: "Investment Strategies Ideation Using LLMs and Structured Multi-Modal Data"
event: MathWorks Global Conference 2025
event_url: https://www.mathworks.com/videos/investment-strategies-ideation-using-large-language-models-and-structured-multi-modal-data-1760424545621.html
location: "New York, NY"

summary: "Presented a LightRAG pipeline that transforms 4,000+ academic papers into a queryable graph vector database for quantitative finance research."

date: 2025-09-30
all_day: true

authors:
  - admin

tags:
  - RAG
  - Python
  - Quantitative Finance
  - LLM
  - Enterprise AI

links:
  - icon: video
    icon_pack: fas
    name: Conference Recording
    url: https://www.mathworks.com/videos/investment-strategies-ideation-using-large-language-models-and-structured-multi-modal-data-1760424545621.html
---

Presented to 200+ industry professionals at MathWorks Global Conference on building AI pipelines for quantitative finance research.

## What We Presented

A five-stage AI pipeline that transforms 4,000+ unstructured academic papers into a queryable knowledge graph, enabling researchers to surface contrarian investment strategies through natural language queries.

**Pipeline Architecture:**
1. **Sourcing & Acquisition** — Automated collection from SSRN, arXiv, and NBER
2. **Cleaning & Structuring** — NLP-driven extraction of entities, methodologies, and findings
3. **Analyzing Structures** — Knowledge graph construction with 45,000+ entities using NetworkX and SpaCy
4. **Ingestion & Analysis** — LightRAG architecture combining graph-aware and vector retrieval
5. **Prompting & Evaluation** — Systematic evaluation across naive RAG, graph RAG, and LightRAG approaches

## Key Result

LightRAG delivered **2.4x more comprehensive responses** than naive RAG by preserving hierarchical relationships between financial concepts, asset classes, and research methodologies.
