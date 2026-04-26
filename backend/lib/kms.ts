// kms.ts: Scaleway KMS client
export const decryptSalt = async (ciphertext: string) => {
  const resp = await fetch(`https://kms.fr-par.scw.cloud/v1/keys/${process.env.HIH_KMS_KEY_ID}/decrypt`, {
    method: 'POST',
    headers: { 'X-Auth-Token': process.env.SCW_SECRET_KEY!, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ciphertext })
  });
  const data = await resp.json();
  return Buffer.from(data.plaintext, 'base64');
};
