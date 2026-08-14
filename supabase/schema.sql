create extension if not exists pgcrypto;

create table if not exists public.moving_estimates (
  id uuid primary key default gen_random_uuid(),
  receipt_no text not null unique,
  moving_type text not null,
  origin_sido text not null,
  origin_district text not null,
  destination_sido text not null,
  destination_district text not null,
  moving_date date not null,
  options jsonb not null default '[]'::jsonb,
  customer_name text not null,
  phone text not null,
  memo text not null default '',
  privacy_agreed boolean not null default false,
  source text not null default 'website',
  page_path text not null default '',
  status text not null default 'new' check (status in ('new','contacting','quoted','completed','cancelled')),
  admin_memo text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists moving_estimates_created_at_idx on public.moving_estimates(created_at desc);
create index if not exists moving_estimates_status_idx on public.moving_estimates(status);
create index if not exists moving_estimates_moving_date_idx on public.moving_estimates(moving_date);

alter table public.moving_estimates enable row level security;
-- 브라우저에서 이 테이블을 직접 읽거나 쓰는 공개 정책은 만들지 않습니다.
-- 고객 접수와 관리자 조회는 Vercel 서버 API + SUPABASE_SERVICE_ROLE_KEY를 통해 처리합니다.

create or replace function public.set_moving_estimates_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists moving_estimates_updated_at on public.moving_estimates;
create trigger moving_estimates_updated_at
before update on public.moving_estimates
for each row execute function public.set_moving_estimates_updated_at();
