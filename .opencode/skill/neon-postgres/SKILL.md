---
name: neon-postgres
description: >
  Neon Postgres integration patterns.
  Trigger: When configuring Neon connection, pooling, or environment setup.
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root, data]
  auto_invoke: "Neon Postgres setup"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Connection Rules
- Use Neon serverless driver for edge-friendly environments.
- Store connection strings in `DATABASE_URL`.
- Keep camelCase in DB schema.

## Basic Setup

```typescript
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
```
