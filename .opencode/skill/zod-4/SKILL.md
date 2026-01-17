---
name: zod-4
description: >
  Zod 4 schema validation patterns.
  Trigger: When creating or updating Zod v4 schemas for validation/parsing (forms, request payloads, adapters), including v3 -> v4 migration patterns.
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root, ui]
  auto_invoke: "Creating Zod schemas"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## Breaking Changes from Zod 3

```typescript
z.string().email();
z.string().uuid();
z.string().url();
z.string().nonempty();
z.object({ name: z.string() }).required_error("Required");

z.email();
z.uuid();
z.url();
z.string().min(1);
z.object({ name: z.string() }, { error: "Required" });
```

## Basic Schemas

```typescript
import { z } from "zod";

const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();
const dateSchema = z.date();

const emailSchema = z.email();
const uuidSchema = z.uuid();
const urlSchema = z.url();

const nameSchema = z.string().min(1).max(100);
const ageSchema = z.number().int().positive().max(150);
const priceSchema = z.number().min(0).multipleOf(0.01);
```

## Object Schemas

```typescript
const userSchema = z.object({
  id: z.uuid(),
  email: z.email({ error: "Invalid email address" }),
  name: z.string().min(1, { error: "Name is required" }),
  age: z.number().int().positive().optional(),
  role: z.enum(["admin", "user", "guest"]),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

type User = z.infer<typeof userSchema>;
```

## Arrays and Records

```typescript
const tagsSchema = z.array(z.string()).min(1).max(10);
const numbersSchema = z.array(z.number()).nonempty();

const scoresSchema = z.record(z.string(), z.number());
const coordinatesSchema = z.tuple([z.number(), z.number()]);
```

## Unions and Discriminated Unions

```typescript
const stringOrNumber = z.union([z.string(), z.number()]);

const resultSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.unknown() }),
  z.object({ status: z.literal("error"), error: z.string() }),
]);
```

## Transformations

```typescript
const lowercaseEmail = z.email().transform((email) => email.toLowerCase());

const numberFromString = z.coerce.number();
const dateFromString = z.coerce.date();

const trimmedString = z.preprocess(
  (val) => (typeof val === "string" ? val.trim() : val),
  z.string()
);
```

## Refinements

```typescript
const passwordSchema = z.string()
  .min(8)
  .refine((val) => /[A-Z]/.test(val), {
    message: "Must contain uppercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Must contain number",
  });

const formSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  }
});
```

## Optional and Nullable

```typescript
z.string().optional();
z.string().nullable();
z.string().nullish();

z.string().default("unknown");
z.number().default(() => Math.random());
```

## Error Handling

```typescript
const schema = z.object({
  name: z.string({ error: "Name must be a string" }),
  email: z.email({ error: "Invalid email format" }),
  age: z.number().min(18, { error: "Must be 18 or older" }),
});

const customSchema = z.string({
  error: (issue) => {
    if (issue.code === "too_small") {
      return "String is too short";
    }
    return "Invalid string";
  },
});
```

## React Hook Form Integration

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;
```
