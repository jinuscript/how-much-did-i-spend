<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 브랜치 / 이슈 / PR 워크플로우

이슈, 브랜치, PR을 생성할 때는 반드시 [docs/CONTRIBUTING.md](./docs/CONTRIBUTING.md)의 전략을 따를 것:

- 브랜치는 `prod`, `dev`, `hotfix/{이슈번호}-{설명}`만 사용하고 `stg`는 두지 않는다.
- `dev`에서 분기하는 브랜치는 `feat|fix|refactor|docs|chore/{이슈번호}-{설명}` 형식을 지킨다.
- 이슈 하나 = 브랜치 하나 = PR 하나로 스코프를 작게 유지한다.
- 이슈는 `.github/ISSUE_TEMPLATE/issue_template.md`, PR은 `.github/PULL_REQUEST_TEMPLATE.md` 형식을 따르고, PR은 관련 이슈를 `Closes #`로 연결한다.
- 커밋 메시지는 `{type}: {설명} (#이슈번호)` 형식을 따르고, 필요시 본문에 상세 변경점을 나열한다. `dev`로 머지할 때는 Squash and merge, `prod`로 머지할 때는 Merge commit을 사용한다.
