import { ContentType, type Post } from '../types';

export interface GitHubRepositorySettings {
  owner: string;
  repo: string;
  branch: string;
  token: string;
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
