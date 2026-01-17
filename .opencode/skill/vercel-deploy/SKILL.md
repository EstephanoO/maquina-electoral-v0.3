---
name: vercel-deploy
description: >
  Vercel deployment and runtime considerations for Next.js.
  Trigger: When configuring deployment, runtime settings, or environment variables.
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root, platform]
  auto_invoke: "Vercel deployment"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Deployment Guidelines
- Prefer serverless runtime where possible.
- Keep environment variables in Vercel project settings.
- Avoid filesystem writes at runtime.

## Environment Variables
- `DATABASE_URL`
- `JWT_SECRET`
- `APIFY_TOKEN`
- `GEMINI_API_KEY`
