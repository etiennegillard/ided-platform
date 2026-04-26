import { Client } from 'pg';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

async function testConnection() {
  console.log("🛠️  Initializing Hardened Sovereign Connection...");
  
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: true,
      ca: readFileSync(process.env.DB_CA_PATH || '').toString(),
    },
  });

  try {
    await client.connect();
    console.log("✅ Secure connection to Scaleway DB established via DNS.");

    const res = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log("📊 Live Tables:", res.rows.map(r => r.table_name).join(', '));

    await client.end();
    console.log("🛡️  Integrity check passed. Rule of Law foundation is solid.");
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
    process.exit(1);
  }
}

testConnection();
