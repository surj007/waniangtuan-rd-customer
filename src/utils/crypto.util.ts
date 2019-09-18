import { createHash } from 'crypto';

export function encrypt(
  algorithm: string, content: string, digest: 'latin1' | 'hex' | 'base64' = 'hex'
): string {
  return createHash(algorithm).update(content).digest(digest);
}