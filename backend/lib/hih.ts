// hih.ts: HMAC-SHA256 Identity Hashing
import { createHmac } from 'crypto';
export const generateHIH = (idDocNumber: string, salt: Buffer) => {
  return createHmac('sha256', salt).update(idDocNumber.trim().toUpperCase()).digest();
};
