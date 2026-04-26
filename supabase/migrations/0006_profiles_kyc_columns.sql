create extension if not exists citext;
do $$ begin create type kyc_status_t as enum ('PENDING', 'IN_REVIEW', 'APPROVED', 'DECLINED', 'RESUBMISSION_REQUESTED', 'EXPIRED', 'REVOKED'); exception when duplicate_object then null; end $$;
do $$ begin create type user_role_t as enum ('user', 'moderator', 'admin'); exception when duplicate_object then null; end $$;
do $$ begin create type verification_method_t as enum ('VERIFF', 'EIDAS', 'BOTH'); exception when duplicate_object then null; end $$;
alter table profiles add column if not exists kyc_status kyc_status_t not null default 'PENDING', add column if not exists role user_role_t not null default 'user', add column if not exists verification_method verification_method_t, add column if not exists hih bytea unique, add column if not exists veriff_session_id text, add column if not exists is_trusted_contributor boolean not null default false, add column if not exists vip_eligible_since timestamptz, add column if not exists last_penalty_at timestamptz, add column if not exists updated_at timestamptz not null default now();
alter table profiles add constraint profiles_hih_length check (hih is null or octet_length(hih) = 32);
alter table profiles add constraint profiles_hih_required_when_approved check (kyc_status <> 'APPROVED' or hih is not null);
alter table profiles add constraint profiles_trust_score_range check (trust_score between 0 and 100);
