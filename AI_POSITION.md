# My Position on AI in Software Engineering

**Author:** Sushruth Sastry  
**Date:** January 2025

---

## I Use AI Extensively

I use AI daily for coding, planning, and analysis. I work with Claude CLI, Gemini CLI, GPT Codex CLI, opencode, aider, and evaluate models on OpenRouter. I also curate MCP server configurations for long-running codebase work.

## The Fossiq Case Study

I built [fossiq.github.io](https://fossiq.github.io), a browser tool to query local CSV files with KQL (Kusto Query Language). The scope included a KQL parser (tree-sitter), a Lezer rewrite for the browser, a KQL-to-DuckDB SQL transformer, and a UI to tie it together.

It looks impressive, but most of the work was low-leverage prompting, not architecture. That is not principal-level impact.

## What AI Cannot Do

The hard problems have not changed:

1. **Judgment in ambiguous organizational contexts** -- deciding what to build, getting buy-in, and navigating tradeoffs across politics, budget, and timelines
2. **Debugging production issues in proprietary systems** -- AI does not have your logs, infra, incident history, or the tribal knowledge that matters
3. **Maintaining systems over multiple years** -- handling migrations, deprecations, edge cases, and the accumulated context no prompt can capture
4. **Integrating with messy internal systems** -- the undocumented work that requires human relationships and institutional memory

## What I Value in AI Work

I evaluate AI adoption based on **operational cost and failure modes**, not hype.

Work that matters:
- Shipping AI features to real users and operating them in production
- Measuring reliability with rigor
- Making organizational decisions about whether to adopt AI tooling, not just how

Work that does not impress me:
- Wrapper projects that call `openai.chat.completions.create()` and add a UI
- "AI-powered" features that are one API call deep
- RAG pipelines that anyone can build in a weekend with cursor

## My Approach

I leverage AI tooling for velocity, but I treat "AI work" as resume-worthy only when it reflects principal-level ownership: strategy, reliability, and long-term impact. Using AI tools is now baseline; the differentiation is judgment, operational responsibility, and durability over time.

The bar for "technically impressive AI work" will keep rising as the tools improve. The bar for "made a hard organizational decision and shipped something that is still running two years later" stays the same.

---

*This document reflects my views as of January 2025. It will evolve as the tools do.*
