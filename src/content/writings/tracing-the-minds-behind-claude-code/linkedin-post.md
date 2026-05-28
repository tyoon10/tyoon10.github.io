# LinkedIn Post: Tracing the Minds Behind Claude Code

## Metadata
```yaml
topic: "Claude Code source code deep-dive"
pillar: "AI Strategy / Technical Learning"
format: "story"
```

---

I spent a weekend reading two leaked Claude Code source trees side by side. Not to catalogue features. To extract the design beliefs behind the architecture.

v0.2.8: 211 files, 26K lines. v2.1.88: 1,902 files, 514K lines. Thirteen months of decisions.

Six things I found:

1. The entire product is one recursive loop. Everything else is infrastructure around it.

2. The sandbox bypass parameter is intentionally hidden from the model's own schema. It can't learn to bypass what it doesn't know exists.

3. More engineering goes into what NOT to send to the model than what to send. Five compaction stages, cheapest first.

4. A single cache boundary marker splits the system prompt into a prefix shared across every user on the planet and a session-specific suffix. If a developer accidentally puts session-specific content in the shared prefix, the global cache breaks for everyone.

5. Cron schedulers, background memory consolidation, remote planning that delivers PRs. It's becoming a system that runs while you're not looking.

6. The team that built the compaction stack also built a virtual pet. One species name is hex-encoded because the literal collides with a model codename in the build scanner. They made the Easter egg comply with the safety system, not the other way around.

Full article and conversation log in the comments.

#ClaudePartner #ClaudeCode #AgenticAI #SystemDesign

---
<actual-post>
I spent a weekend reading two leaked Claude Code source trees side by side. Not to catalogue features. To extract the design beliefs behind the architecture.



v0.2.8: 211 files, 26K lines. v2.1.88: 1,902 files, 514K lines. Thirteen months of decisions.



Six things I found:



1. The entire product is one recursive loop. Everything else is infrastructure around it.



2. The sandbox bypass parameter is intentionally hidden from the model's own schema. It can't learn to bypass what it doesn't know exists.



3. More engineering goes into what NOT to send to the model than what to send. Five compaction stages, cheapest first.



4. A single cache boundary marker splits the system prompt into a prefix shared across every user on the planet and a session-specific suffix. Move the wrong content past it and you silently corrupt everyone's cache.



5. Cron schedulers, background memory consolidation, remote planning that delivers PRs. It's becoming a system that runs while you're not looking.



6. The team that built the compaction stack also built a virtual pet. One species name is hex-encoded because the literal collides with a model codename in the build scanner. They made the Easter egg comply with the safety system, not the other way around.



Full article and conversation log in the comments.



#ClaudePartner #ClaudeCode #AgenticAI #SystemDesign
</actual-post>
