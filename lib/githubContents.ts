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

const getApiHeaders = (token: string): HeadersInit => ({
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache',
  'X-GitHub-Api-Version': '2022-11-28',
});

const getContentsEndpoint = (owner: string, repo: string, path: string): string =>
  `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path
    .split('/')
    .map(encodeURIComponent)
    .join('/')}`;

const getGitHubFile = async (
  settings: GitHubRepositorySettings,
  path: string,
): Promise<{ sha: string; content: string }> => {
  const { owner, repo, branch, token } = settings;
  const endpoint = getContentsEndpoint(owner, repo, path);
  const query = new URLSearchParams({ ref: branch });
  const response = await fetch(`${endpoint}?${query}`, {
    cache: 'no-store',
    headers: getApiHeaders(token),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Could not read ${path} (${response.status}): ${detail}`);
  }

  const file = await response.json() as { sha?: string; content?: string; encoding?: string };
  if (!file.sha) throw new Error(`GitHub did not return the current SHA for ${path}.`);
  if (file.encoding !== 'base64' || typeof file.content !== 'string') {
    throw new Error(`GitHub did not return editable base64 content for ${path}.`);
  }

  const binary = atob(file.content.replace(/\s/g, ''));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return { sha: file.sha, content: new TextDecoder().decode(bytes) };
};

export interface GitHubTypeScriptFile {
  name: string;
  path: string;
  sha: string;
  size: number;
}

const validateConstantsFilePath = (path: string): string => {
  if (
    !path.startsWith('constants/')
    || !path.endsWith('.ts')
    || path.split('/').some((segment) => !segment || segment === '.' || segment === '..')
  ) {
    throw new Error('Only TypeScript files inside constants/ can be edited.');
  }
  return path;
};

export const listGitHubTypeScriptFiles = async (
  settings: GitHubRepositorySettings,
): Promise<GitHubTypeScriptFile[]> => {
  const { owner, repo, branch, token } = settings;
  if (!owner || !repo || !branch || !token) {
    throw new Error('Owner, repository, branch, and GitHub PAT are required.');
  }

  const files: GitHubTypeScriptFile[] = [];
  const visitedDirectories = new Set<string>();
  const headers = getApiHeaders(token);
  const listDirectory = async (directory: string): Promise<void> => {
    if (visitedDirectories.has(directory)) return;
    visitedDirectories.add(directory);
    const endpoint = getContentsEndpoint(owner, repo, directory);
    const query = new URLSearchParams({ ref: branch });
    const response = await fetch(`${endpoint}?${query}`, {
      cache: 'no-store',
      headers,
    });
    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Could not list ${directory} (${response.status}): ${detail}`);
    }

    const entries = await response.json() as Array<{
      name?: string;
      path?: string;
      sha?: string;
      size?: number;
      type?: string;
    }>;
    for (const entry of entries) {
      if (entry.type === 'dir' && typeof entry.path === 'string' && entry.path.startsWith('constants/')) {
        await listDirectory(entry.path);
      } else if (
        entry.type === 'file'
        && typeof entry.name === 'string'
        && entry.name.endsWith('.ts')
        && typeof entry.path === 'string'
        && entry.path.startsWith('constants/')
        && typeof entry.sha === 'string'
        && typeof entry.size === 'number'
      ) {
        files.push({ name: entry.name, path: entry.path, sha: entry.sha, size: entry.size });
      }
    }
  };

  await listDirectory('constants');
  return files.sort((left, right) => left.path.localeCompare(right.path));
};

export const readGitHubTypeScriptFile = async (
  settings: GitHubRepositorySettings,
  path: string,
): Promise<{ sha: string; content: string }> =>
  getGitHubFile(settings, validateConstantsFilePath(path));

export const updateGitHubTypeScriptFile = async (
  settings: GitHubRepositorySettings,
  path: string,
  content: string,
): Promise<void> => {
  const validatedPath = validateConstantsFilePath(path);
  await putGitHubFile(settings, validatedPath, content, `Update ${validatedPath} from admin`);
};

const putGitHubFile = async (
  settings: GitHubRepositorySettings,
  path: string,
  content: string,
  message: string,
): Promise<void> => {
  const { owner, repo, branch, token } = settings;
  if (!owner || !repo || !branch || !token) {
    throw new Error('Owner, repository, branch, and GitHub PAT are required.');
  }

  const endpoint = getContentsEndpoint(owner, repo, path);
  const encodedContent = encodeBase64(content);
  const maxAttempts = 3;
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    // Read without browser caching immediately before every PUT, including retries.
    const { sha } = await getGitHubFile(settings, path);
    const updateResponse = await fetch(endpoint, {
      method: 'PUT',
      headers: { ...getApiHeaders(token), 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        content: encodedContent,
        sha,
        branch,
      }),
    });

    if (updateResponse.ok) return;

    const detail = await updateResponse.text();
    if (
      (updateResponse.status === 409 || updateResponse.status === 422)
      && attempt < maxAttempts - 1
    ) {
      await new Promise((resolve) => window.setTimeout(resolve, 150 * (attempt + 1)));
      continue;
    }
    const conflictHint = updateResponse.status === 409 || updateResponse.status === 422
      ? ' GitHub rejected the update after retrying with a freshly fetched SHA. Check branch permissions or whether another update is still in progress.'
      : '';
    throw new Error(`Could not commit ${path} after ${attempt + 1} attempt(s) (${updateResponse.status}): ${detail}${conflictHint}`);
  }
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
  const headers = getApiHeaders(token);
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
  await putGitHubFile(settings, path, serializeCardsFile(type, posts), `Update ${path} from admin`);
};
