import { ContentType, type Post } from '../types';

export interface GitHubRepositorySettings {
  owner: string;
  repo: string;
  branch: string;
  token: string;
  uploadPath: string;
}

const DATA_FILES: Record<ContentType, { path: string; exportName: string }> = {
  [ContentType.CREATOR]: { path: 'constants/creator.ts', exportName: 'CREATOR_ITEMS' },
  [ContentType.MEDIA]: { path: 'constants/media.ts', exportName: 'MEDIA_ITEMS' },
  [ContentType.GAME]: { path: 'constants/game.ts', exportName: 'GAME_ITEMS' },
  [ContentType.REF]: { path: 'constants/ref.ts', exportName: 'REF_ITEMS' },
};

const encodeBase64 = (value: string): string => {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  const chunkSize = 0x8000;

  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }

  return btoa(binary);
};

const encodeBytesBase64 = (bytes: Uint8Array): string => {
  let binary = '';
  const chunkSize = 0x8000;
  for (let offset = 0; offset < bytes.length; offset += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary);
};

const getPublicAssetPath = (uploadPath: string): string => {
  const normalizedPath = uploadPath.trim().replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
  const segments = normalizedPath.split('/');
  if (
    !normalizedPath.startsWith('public/')
    || segments.some((segment) => !segment || segment === '.' || segment === '..')
  ) {
    throw new Error('이미지 저장 경로는 public/ 아래의 유효한 폴더여야 합니다. 예: public/media/');
  }
  return normalizedPath;
};

export const getImageFileName = (file: File, requestedName: string): string => {
  if (/[\\/]/.test(requestedName)) {
    throw new Error('파일 이름에는 경로 구분자를 사용할 수 없습니다.');
  }

  const originalName = file.name.split(/[\\/]/).pop() || '';
  const originalExtension = originalName.match(/\.([a-zA-Z0-9]{1,10})$/)?.[1];
  const mimeExtension: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/avif': 'avif',
    'image/svg+xml': 'svg',
    'image/bmp': 'bmp',
    'image/tiff': 'tiff',
  };
  const requested = requestedName.trim() || originalName || `image-${Date.now()}`;
  const requestedExtension = requested.match(/\.([a-zA-Z0-9]{1,10})$/)?.[1];
  const extension = (requestedExtension || originalExtension || mimeExtension[file.type] || 'img').toLowerCase();
  const stem = requestedExtension ? requested.slice(0, -(requestedExtension.length + 1)) : requested;
  const safeStem = stem
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || `image-${Date.now()}`;

  return `${safeStem}.${extension}`;
};

export const uploadImageToGitHub = async (
  settings: GitHubRepositorySettings,
  file: File,
  requestedName: string,
): Promise<string> => {
  const { owner, repo, branch, token, uploadPath } = settings;
  if (!owner || !repo || !branch || !token) {
    throw new Error('Owner, repository, branch, and GitHub PAT are required.');
  }
  if (!file.type.startsWith('image/')) {
    throw new Error('이미지 파일만 업로드할 수 있습니다.');
  }
  if (file.size > 100 * 1024 * 1024) {
    throw new Error('GitHub Contents API는 100MB 이하 파일만 업로드할 수 있습니다.');
  }

  const directory = getPublicAssetPath(uploadPath);
  const fileName = getImageFileName(file, requestedName);
  const endpointBase = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents`;
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const bytes = new Uint8Array(await file.arrayBuffer());
  const path = `${directory}/${fileName}`;
  const endpoint = `${endpointBase}/${path.split('/').map(encodeURIComponent).join('/')}`;
  const response = await fetch(endpoint, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Upload image ${path}`,
      content: encodeBytesBase64(bytes),
      branch,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    const conflictHint = response.status === 422
      ? ' 같은 이름의 파일이 이미 있거나 GitHub에서 요청을 거부했습니다. 다른 파일 이름을 입력해 주세요.'
      : '';
    throw new Error(`Could not upload image (${response.status}): ${detail}${conflictHint}`);
  }

  const { content } = await response.json() as { content?: { path?: string } };
  if (!content?.path?.startsWith('public/')) {
    throw new Error('GitHub uploaded the image but did not return a valid public file path.');
  }
  const publicPath = content.path.slice('public'.length);
  return new URL(publicPath, window.location.origin).toString();
};

const serializeCard = (post: Post): string => {
  const fields = Object.entries(post).filter(
    ([key, value]) => key !== 'id' && key !== 'thumbnail' && key !== 'originalUrl' && value !== undefined,
  );
  const objectLiteral = JSON.stringify(Object.fromEntries(fields), null, 2)
    .replace(/^(\s*)"type": "(CREATOR|MEDIA|REF|GAME)"[,]?$/m, (_match, indentation: string, type: ContentType) =>
      `${indentation}type: ContentType.${type},`,
    )
    .replace(/,$/, '');

  return `  ${objectLiteral.split('\n').join('\n  ')}`;
};

export const serializeCardsFile = (type: ContentType, posts: Post[]): string => {
  const { exportName } = DATA_FILES[type];
  const cards = posts.filter((post) => post.type === type);
  const entries = cards.map(serializeCard).join(',\n');

  return [
    "import { ContentType, type Post } from '../types';",
    '',
    `export const ${exportName}: Omit<Post, 'id'>[] = [`,
    entries,
    '];',
    '',
  ].join('\n');
};

export const commitCardsFile = async (
  settings: GitHubRepositorySettings,
  type: ContentType,
  posts: Post[],
): Promise<void> => {
  const { owner, repo, branch, token } = settings;
  if (!owner || !repo || !branch || !token) {
    throw new Error('Owner, repository, branch, and GitHub PAT are required.');
  }
  const { path } = DATA_FILES[type];
  const endpoint = `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
  };
  const query = new URLSearchParams({ ref: branch });
  const fileResponse = await fetch(`${endpoint}?${query}`, { headers });

  if (!fileResponse.ok) {
    const detail = await fileResponse.text();
    throw new Error(`Could not read ${path} (${fileResponse.status}): ${detail}`);
  }

  const file = (await fileResponse.json()) as { sha?: string };
  if (!file.sha) {
    throw new Error(`GitHub did not return the current SHA for ${path}.`);
  }

  const updateResponse = await fetch(endpoint, {
    method: 'PUT',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Update ${path} from admin`,
      content: encodeBase64(serializeCardsFile(type, posts)),
      sha: file.sha,
      branch,
    }),
  });

  if (!updateResponse.ok) {
    const detail = await updateResponse.text();
    const conflictHint = updateResponse.status === 409 || updateResponse.status === 422
      ? ' The file may have changed since it was loaded; reload the page and try again.'
      : '';
    throw new Error(`Could not commit ${path} (${updateResponse.status}): ${detail}${conflictHint}`);
  }
};
