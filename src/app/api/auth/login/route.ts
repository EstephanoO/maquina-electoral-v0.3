import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { findUserByEmail, createUser } from "@/src/db/queries/users";
import { hashPassword, verifyPassword } from "@/src/db/password";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  mode: z.enum(["login", "register"]),
});

const AUTH_SECRET = process.env.AUTH_SECRET ?? "";
const ADMIN_EMAIL = "admin@goberna.com";
const ADMIN_PASSWORD = "admin123";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Payload invalido" }, { status: 400 });
  }

  if (!AUTH_SECRET) {
    return NextResponse.json(
      { error: "AUTH_SECRET no configurado" },
      { status: 500 },
    );
  }

  const { email, password, mode } = parsed.data;
  const resolvedRole = email === ADMIN_EMAIL ? "admin" : "cliente";
  const existing = await findUserByEmail(email);

  if (mode === "register") {
    if (email === ADMIN_EMAIL) {
      return NextResponse.json(
        { error: "El correo admin ya existe" },
        { status: 403 },
      );
    }
    if (existing) {
      return NextResponse.json({ error: "Usuario ya existe" }, { status: 409 });
    }
    const hashed = hashPassword(password);
    const user = await createUser(email, hashed);
    const token = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(`${user.id}:${user.email}`)
      .digest("hex");
    return NextResponse.json({
      userId: user.id,
      email: user.email,
      role: resolvedRole,
      token,
      createdAt: user.created_at,
    });
  }

  if (!existing) {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const adminUser = await createUser(email, hashPassword(password));
      const token = crypto
        .createHmac("sha256", AUTH_SECRET)
        .update(`${adminUser.id}:${adminUser.email}`)
        .digest("hex");
      return NextResponse.json({
        userId: adminUser.id,
        email: adminUser.email,
        role: "admin",
        token,
        createdAt: adminUser.created_at,
      });
    }
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const valid = verifyPassword(password, existing.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Credenciales invalidas" }, { status: 401 });
  }

  if (email === ADMIN_EMAIL && password !== ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Credenciales invalidas" },
      { status: 401 },
    );
  }

  const token = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${existing.id}:${existing.email}`)
    .digest("hex");

  return NextResponse.json({
    userId: existing.id,
    email: existing.email,
    role: resolvedRole,
    token,
    createdAt: existing.created_at,
  });
}
