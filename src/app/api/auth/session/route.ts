import { NextResponse } from "next/server";
import { z } from "zod";
import { findUserByEmail } from "@/src/db/queries/users";

const QuerySchema = z.object({
  email: z.string().email(),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");
  const parsed = QuerySchema.safeParse({ email });
  if (!parsed.success) {
    return NextResponse.json({ error: "Email invalido" }, { status: 400 });
  }

  const user = await findUserByEmail(parsed.data.email);
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ userId: user.id, email: user.email });
}
