-- Codifies the Identity Dividend logic
UPDATE profiles SET trust_score = 50 WHERE is_verified = TRUE;

CREATE TABLE IF NOT EXISTS trust_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id),
    previous_score INTEGER,
    new_score INTEGER,
    reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
