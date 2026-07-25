# 데이터베이스 (Supabase)

## 현재 구성

- 프로젝트: `how-much-did-i-spend` (region: `us-east-1`)
- Vercel Marketplace를 통해 프로비저닝됨(`vercel integration add supabase`). 사용자 개인 Supabase 조직이 아니라 **Vercel이 관리하는 별도 조직**(`vercel_icfg_...`) 소속
- 환경변수는 Vercel 프로젝트(`money-book`)에 자동 연동되고, 로컬에서는 `vercel env pull`로 `.env.local`에 반영
- 빌링은 별도 Supabase 결제수단 없이 **Vercel 청구서에 통합**
- 스키마는 `supabase/migrations/`의 마이그레이션 파일로 관리(imperative migrations 방식). `supabase link`로 원격 프로젝트에 연결한 뒤 `supabase db push`로 반영

## 나중에 DB를 옮기거나 정리할 때 주의할 점

- **"연결 해제"와 "통합 삭제"는 다르다**
  - 프로젝트 연결 해제(Disconnect): DB/데이터는 그대로 유지되고 `money-book`과의 연결만 끊김
  - 리소스 삭제(Delete the product): 이 DB 하나만 삭제됨
  - **통합 자체 삭제(Uninstall the integration)**: 이 통합에 연결된 모든 리소스와 데이터가 함께 삭제됨. Vercel 대시보드에서 Supabase 통합을 지울 때 각별히 주의할 것
- 팀 간 이전(Transfer a resource to another team)은 지원되지만, Vercel 관리를 완전히 벗어나 개인 Supabase 계정 소유로 이전하는 공식 절차는 문서화되어 있지 않음 — 필요해지면 Supabase 지원팀에 직접 확인
- 데이터 자체는 순수 Postgres이므로, 어떤 방식으로 관리되든 `pg_dump`/`pg_restore`로 다른 DB(다른 리전의 Supabase, Neon 등)로 이전 가능 — Vercel 전용 포맷에 갇히지 않음

## 참고

- https://vercel.com/docs/marketplace-storage
- https://vercel.com/docs/integrations/install-an-integration/product-integration
- https://supabase.com/docs/guides/platform/project-transfer
