## Project WakaMoe
### Quick Start
```bash
npm install
npm run dev
npm run build
```
### Local to Git
```bash
git add .
git commit -m "Your message"
git push
```

### Git to Local
```bash
git pull origin main
```

### Supabase 카드 관리 설정
1. Supabase 프로젝트를 만든 다음 SQL Editor에서 [`supabase/schema.sql`](./supabase/schema.sql)을 실행하세요. 실행하기 전에 SQL의 `YOUR_ADMIN_EMAIL`을 관리자 계정 이메일로 바꾸세요.
2. Supabase Authentication에서 위 이메일로 관리자를 생성하고, 공개 회원가입은 비활성화하세요. 테이블 RLS 정책은 해당 이메일 계정에만 쓰기 권한을 줍니다.
3. 프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 입력하세요. Supabase의 anon/publishable 키만 사용하고 `service_role` 키는 절대 브라우저 환경에 넣지 마세요.

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   NEXT_PUBLIC_SUPABASE_ADMIN_EMAIL=admin@example.com
   ```

   Vite 표준 환경변수 이름인 `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_SUPABASE_ADMIN_EMAIL`도 지원합니다. 둘 중 한 형식만 설정하면 됩니다.
4. 개발 서버를 다시 시작하세요. 카드가 DB에서 로드되며, 처음 접속했을 때 `cards` 테이블이 비어 있으면 관리자 로그인 후 **Import existing cards into Supabase**를 눌러 현재 정적 카드를 가져올 수 있습니다.
5. 관리자 계정으로 로그인하면 카드 추가/수정/삭제 컨트롤이 표시됩니다. DB 쓰기 권한은 클라이언트 UI가 아니라 `schema.sql`의 RLS 정책으로 제한됩니다.

`NEXT_PUBLIC_`와 `VITE_` 값은 빌드된 웹 앱에서 볼 수 있습니다. URL, anon 키, 관리자 이메일만 설정하고 비밀 키는 저장하지 마세요.
