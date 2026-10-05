## Project WakaMoe
### Quick Start
```bash
npm install
npm run dev
npm run build
```

### Managing cards

Open **카드 관리자**, enter the target repository, branch, and a GitHub fine-grained
personal access token, then add, edit, or delete a card. The token needs **Contents:
Read and write** permission for this repository. Repository settings and the token are
saved in this browser's `localStorage` and sent directly to the GitHub Contents API;
they are not built into the site. Anyone with access to this browser profile or
same-origin JavaScript can access the token, so use a dedicated, narrowly scoped token
and clear saved settings on shared devices. A successful save creates a commit on the
selected branch, after which GitHub Pages rebuilds and deploys the site. The current
deployment workflow deploys commits pushed to `main`; use that branch for changes that
should go live.
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
