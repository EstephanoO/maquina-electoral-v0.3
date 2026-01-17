import crypto from "crypto";

const SALT_BYTES = 16;
const KEY_BYTES = 64;

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(SALT_BYTES).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_BYTES).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) {
    return false;
  }
  const hash = crypto.scryptSync(password, salt, KEY_BYTES);
  const original = Buffer.from(originalHash, "hex");
  return (
    original.length === hash.length && crypto.timingSafeEqual(original, hash)
  );
}
