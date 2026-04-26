// db.ts: PostgreSQL client with Identity Dividend logic
import postgres from 'postgres';
const sql = postgres(process.env.DATABASE_URL!);
export const promoteProfileToVerified = async (id: string, hih: Buffer) => {
  return await sql.begin(async sql => {
    const [user] = await sql`UPDATE profiles SET kyc_status = 'APPROVED', is_verified = true, hih = ${hih}, trust_score = greatest(trust_score, 50), updated_at = now() WHERE id = ${id} RETURNING *`;
    await sql`INSERT INTO trust_history (profile_id, reason, delta) VALUES (${id}, 'identity_dividend', 50)`;
    return user;
  });
};
export default sql;
