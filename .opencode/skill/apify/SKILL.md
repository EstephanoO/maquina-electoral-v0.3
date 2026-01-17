---
name: apify
description: >
  Apify integration patterns for social intelligence ingestion.
  Trigger: When wiring ingestion, webhooks, or dataset processing.
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root, integrations]
  auto_invoke: "Apify ingestion"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Ingestion Patterns
- Use Route Handlers for Apify webhooks.
- Validate payloads with Zod before persistence.
- Persist ingestion status for UI reporting.

## Basic Request Shape

```typescript
type ApifyWebhookPayload = {
  actorId: string;
  runId: string;
  datasetId: string;
  status: "SUCCEEDED" | "FAILED" | "RUNNING";
};
```
