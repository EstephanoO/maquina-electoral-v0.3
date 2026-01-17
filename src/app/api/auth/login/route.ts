import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { findUserByEmail, createUser } from "@/src/db/queries/users";
import { hashPassword, verifyPassword } from "@/src/db/password";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["cliente", "admin"]),
  mode: z.enum(["login", "register"]),
});

const AUTH_SECRET = process.env.AUTH_SECRET ?? "";

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

  const { email, password, role, mode } = parsed.data;
  const existing = await findUserByEmail(email);

  if (mode === "register") {
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
      role,
      token,
      createdAt: user.created_at,
    });
  }

  if (!existing) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  const valid = verifyPassword(password, existing.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Credenciales invalidas" }, { status: 401 });
  }

  const token = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${existing.id}:${existing.email}`)
    .digest("hex");

  return NextResponse.json({
    userId: existing.id,
    email: existing.email,
    role,
    token,
    createdAt: existing.created_at,
  });
}
