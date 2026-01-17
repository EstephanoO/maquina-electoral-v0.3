---
name: gemini
description: >
  Gemini AI analysis patterns.
  Trigger: When using Gemini for summaries, clustering, or insight generation.
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root, integrations]
  auto_invoke: "Gemini AI analysis"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Integration Rules
- Use Route Handlers for public or webhook-driven analysis.
- Use Server Actions for UI-triggered analysis.
- Store prompts and responses for traceability.

## Suggested Payload Shape

```typescript
type GeminiRequest = {
  prompt: string;
  context?: string;
  model?: string;
};
```
