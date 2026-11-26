# How I Work With AI

**Author:** Sushruth Sastry  
**Updated:** November 2026

---

I write most of my code through agents now. My own work has moved to three things: deciding what gets built, building the place agents work in, and checking what comes back.

## What I believe

**Evidence earns trust.** I trust an agent's change when it arrives with proof I can look at: a screenshot, a recording, a passing run against real data. A model that wrote the code and then approved it has told me little. A second model reaching the same result tells me more. A model that confirms the outcome with no view of the code tells me the most.

**Different models catch different mistakes.** Every model carries the blind spots of its training. I put several in one conversation, open-weight ones included, so one model's miss is another's catch. I built [pi-committee](https://github.com/sushruth/pi-committee) to do this.

**Small, coordinated models do well on shared work.** When many agents work on one job, a few small models with clear roles have served me better than one large model doing everything. Large models plan well and then over-direct their collaborators. I give the lint fixes, retries, and formatting to small, fast models and keep the large model's context for the decisions.

**I prefer purpose-built agents.** An agent with one job, narrow permissions, and the right tools is easier to trust and cheaper to run than a general one with access to everything.

**Cost and openness count.** Inference is a bill someone pays. I watch what happens to the prompt cache when work moves between models, I run open models locally, and I prefer setups where the model can be swapped.

**Quality is a list of named problems.** "Quality" as a general goal sends people and agents down rabbit holes. I name the one problem I want gone and add a check for that problem alone. Each check has holes, and a stack of them covers most of what matters.

**A fresh start is useful.** An agent begins each session knowing nothing, the way a new teammate does. What survives that reset is whatever was written down: the instructions, the skills, the tests. Teams have always worked this way as people join and leave. Agents do it at a much faster pace.

## What I do with it

- At PushPress I work on the sandboxes and verification tooling that coding agents and engineers share. Agents in Claude Code, Codex, and the company's background agent run their own changes against real dev data and attach the evidence to the pull request.
- I hand batches of small tasks to cloud agent sessions overnight and review the pull requests in the morning, each with its screenshots or recording.
- My open-source work in this area: [pi-committee](https://github.com/sushruth/pi-committee), [zen-devtools-mcp](https://github.com/sushruth/zen-devtools-mcp), and [human-narrative-skill](https://github.com/sushruth/human-narrative-skill).

## The earlier version of this page

In January 2025 this page was titled "Why No AI Work on My Resume". I used the tools daily then and owned nothing built on them in production, so I left AI off. That changed in 2026, and the resume now lists the work.
