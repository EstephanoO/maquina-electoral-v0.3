---
name: drizzle
description: >
  Drizzle ORM patterns for Neon Postgres.
  Trigger: When defining schemas, relations, migrations, or queries with Drizzle in Postgres projects.
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root, data]
  auto_invoke: "Drizzle ORM schema and queries"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Core Principles
- Keep camelCase for DB and TS models.
- Define schemas in module-owned data layers.
- Validate inputs with Zod before persistence.

## Schema Declaration (Postgres)

```typescript
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull(),
  passwordHash: text("passwordHash").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
```

## Shape Your Data Schema

```typescript
import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const candidates = pgTable("candidates", {
  id: uuid("id").defaultRandom().primaryKey(),
  campaignId: uuid("campaignId").notNull(),
  name: text("name").notNull(),
});

export const campaignRelations = relations(campaigns, ({ many }) => ({
  candidates: many(candidates),
}));
```

## Querying

```typescript
import { eq } from "drizzle-orm";

const result = await db
  .select()
  .from(users)
  .where(eq(users.email, email))
  .limit(1);
```

## Migrations

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

## Neon Connection

```typescript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql);
```
