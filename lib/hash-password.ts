import { hashSync } from "bcryptjs";

export function setHash(password: string) {
  const saltRounds = 16;
  const passwordHash = hashSync(password, saltRounds);

  return passwordHash.toString();
}

export function getHash(password: string) {
  const hash = setHash(password);
  return hash.toString();
}
