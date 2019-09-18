import { createHash } from 'crypto';

function encrypt(algorithm: string, content: string): string {
  return createHash(algorithm).update(content).digest('hex');
}

export function validateWxSignature(
  rawData: string, signature: string, sessionKey: string
): boolean {
  return signature === encrypt('sha1', rawData + sessionKey);
}