ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_vip BOOLEAN DEFAULT FALSE;
CREATE INDEX IF NOT EXISTS idx_vip_verified ON profiles(is_vip, is_verified);
