import React, { useEffect, useMemo, useRef, useState } from 'react';
import { commitCardsFile, getImageFileName, uploadImageToGitHub, type GitHubRepositorySettings } from '../../lib/githubContents';
import { ContentType, type Post } from '../../types';

interface GitHubCardAdminProps {
  posts: Post[];
  onPostsChange: (posts: Post[]) => void;
}

interface CardForm {
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  type: ContentType;
  category: string;
  externalLink: string;
  channelUrl: string;
  videoUrl: string;
  tags: string;
  gameLinks: string;
}

const emptyForm = (): CardForm => ({
  title: '',
  subtitle: '',
  description: '',
  coverImage: '',
  type: ContentType.CREATOR,
  category: '',
  externalLink: '',
  channelUrl: '',
  videoUrl: '',
  tags: '',
  gameLinks: '[]',
});

const formFromPost = (post: Post): CardForm => ({
  title: post.title,
  subtitle: post.subtitle || '',
  description: post.description,
  coverImage: post.coverImage,
  type: post.type,
  category: post.category || '',
  externalLink: post.externalLink || '',
  channelUrl: post.channelUrl || '',
  videoUrl: post.videoUrl || '',
  tags: post.tags?.join(', ') || '',
  gameLinks: JSON.stringify(post.gameLinks || [], null, 2),
});

const fieldClassName = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900';
const labelClassName = 'flex flex-col gap-1 text-xs font-semibold text-slate-700';
const SETTINGS_STORAGE_KEY = 'wakamoe.github-card-admin.settings';
const DEFAULT_SETTINGS: GitHubRepositorySettings = {
  owner: 'WakamoLover',
  repo: 'WakamoLover.github.io',
  branch: 'main',
  token: '',
  uploadPath: 'public/media',
};

const GitHubCardAdmin: React.FC<GitHubCardAdminProps> = ({ posts, onPostsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<GitHubRepositorySettings>(DEFAULT_SETTINGS);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [form, setForm] = useState<CardForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageFileName, setImageFileName] = useState('');
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const skipNextSettingsSave = useRef(false);

  useEffect(() => {
    try {
      const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        const parsed: unknown = JSON.parse(storedSettings);
        if (
          !parsed
          || typeof parsed !== 'object'
          || !('owner' in parsed)
          || !('repo' in parsed)
          || !('branch' in parsed)
          || !('token' in parsed)
          || typeof parsed.owner !== 'string'
          || typeof parsed.repo !== 'string'
          || typeof parsed.branch !== 'string'
          || typeof parsed.token !== 'string'
        ) {
          throw new Error('저장된 GitHub 설정 형식이 올바르지 않습니다. 설정을 다시 입력해 주세요.');
        }
        setSettings({
          owner: parsed.owner,
          repo: parsed.repo,
          branch: parsed.branch,
          token: parsed.token,
          uploadPath: 'uploadPath' in parsed && typeof parsed.uploadPath === 'string'
            ? parsed.uploadPath
            : DEFAULT_SETTINGS.uploadPath,
        });
      }
    } catch (error) {
      setSettingsError(error instanceof Error ? error.message : '브라우저에서 GitHub 설정을 읽지 못했습니다.');
    } finally {
      setSettingsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!settingsLoaded) return;
    if (skipNextSettingsSave.current) {
      skipNextSettingsSave.current = false;
      return;
    }
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
      setSettingsError('');
    } catch (error) {
      setSettingsError(error instanceof Error ? `브라우저에 GitHub 설정을 저장하지 못했습니다: ${error.message}` : '브라우저에 GitHub 설정을 저장하지 못했습니다.');
    }
  }, [settings, settingsLoaded]);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return posts
      .filter((post) => !normalizedSearch || post.title.toLowerCase().includes(normalizedSearch))
      .sort((left, right) => left.title.localeCompare(right.title, undefined, { sensitivity: 'base' }));
  }, [posts, search]);

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
    setSelectedImage(null);
    setImageFileName('');
  };

  const clearSavedSettings = () => {
    try {
      localStorage.removeItem(SETTINGS_STORAGE_KEY);
      skipNextSettingsSave.current = true;
      setSettings(DEFAULT_SETTINGS);
      setSettingsError('');
    } catch (error) {
      setSettingsError(error instanceof Error ? `저장된 GitHub 설정을 삭제하지 못했습니다: ${error.message}` : '저장된 GitHub 설정을 삭제하지 못했습니다.');
    }
  };

  const selectImage = (file?: File) => {
    if (!file) return;
    setSelectedImage(file);
    setImageFileName(file.name);
    setMessage('');
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      setMessage('먼저 업로드할 이미지를 선택해 주세요.');
      return;
    }
    setIsUploading(true);
    setMessage('');
    try {
      const imageUrl = await uploadImageToGitHub({
        ...settings,
        owner: settings.owner.trim(),
        repo: settings.repo.trim(),
        branch: settings.branch.trim(),
        token: settings.token.trim(),
        uploadPath: settings.uploadPath.trim(),
      }, selectedImage, imageFileName);
      setForm((previous) => ({ ...previous, coverImage: imageUrl }));
      setSelectedImage(null);
      setImageFileName('');
      setMessage(`이미지 업로드 완료: ${imageUrl}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsUploading(false);
    }
  };

  const toPost = (id: string, existing?: Post): Post => {
    let gameLinks: Post['gameLinks'];
    try {
      const parsed: unknown = JSON.parse(form.gameLinks);
      if (!Array.isArray(parsed) || parsed.some((link) =>
        !link || typeof link !== 'object' || typeof link.label !== 'string' || typeof link.url !== 'string'
      )) {
        throw new Error('Game links must be a JSON array of objects with string label and url fields.');
      }
      gameLinks = parsed;
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new Error('Game links must contain valid JSON.');
      }
      throw error;
    }

    return {
      ...existing,
      id,
      title: form.title.trim(),
      subtitle: form.subtitle.trim() || undefined,
      description: form.description,
      coverImage: form.coverImage.trim(),
      type: form.type,
      category: form.category.trim() || undefined,
      externalLink: form.externalLink.trim() || undefined,
      channelUrl: form.channelUrl.trim() || undefined,
      videoUrl: form.videoUrl.trim() || undefined,
      tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      gameLinks,
    };
  };

  const commit = async (updatedPosts: Post[], type: ContentType) => {
    setIsSaving(true);
    setMessage('');
    try {
      await commitCardsFile({
        owner: settings.owner.trim(),
        repo: settings.repo.trim(),
        branch: settings.branch.trim(),
        token: settings.token.trim(),
        uploadPath: settings.uploadPath.trim(),
      }, type, updatedPosts);
      onPostsChange(updatedPosts);
      setMessage('저장 후 GitHub에 커밋했습니다. GitHub Pages 배포에는 잠시 시간이 걸릴 수 있습니다.');
      return true;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!settings.token.trim()) {
      setMessage('GitHub PAT를 입력해 주세요.');
      return;
    }

    const currentPost = editingId ? posts.find((post) => post.id === editingId) : undefined;
    let nextPost: Post;
    try {
      nextPost = toPost(currentPost?.id || `admin-${crypto.randomUUID()}`, currentPost);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : String(error));
      return;
    }
    const updatedPosts = currentPost
      ? posts.map((post) => post.id === editingId ? nextPost : post)
      : [...posts, nextPost];

    if (await commit(updatedPosts, nextPost.type)) resetForm();
  };

  const handleDelete = async (post: Post) => {
    if (!settings.token.trim()) {
      setMessage('GitHub PAT를 입력해 주세요.');
      return;
    }
    if (!window.confirm(`“${post.title}” 카드를 삭제하고 GitHub에 커밋할까요?`)) return;

    const updatedPosts = posts.filter((item) => item.id !== post.id);
    if (await commit(updatedPosts, post.type) && editingId === post.id) resetForm();
  };

  const input = (name: keyof CardForm, label: string, required = false) => (
    <label className={labelClassName}>
      {label}
      <input
        className={fieldClassName}
        value={form[name]}
        required={required}
        onChange={(event) => setForm((previous) => ({ ...previous, [name]: event.target.value }))}
      />
    </label>
  );

  return (
    <section className="px-4 pt-3 sm:px-6 xl:px-8">
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
      >
        {isOpen ? '관리자 닫기' : '카드 관리자'}
      </button>

      {isOpen && (
        <div className="mt-3 grid gap-5 rounded-xl border border-slate-200 bg-slate-50 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,1fr)]">
          <div className="space-y-3">
            <h2 className="font-bold text-slate-900">GitHub 저장소 설정</h2>
            <p className="text-xs leading-relaxed text-amber-800">
              정적 사이트에서는 PAT를 완전히 숨길 수 없습니다. Fine-grained token을 사용하고 이 저장소의
              Contents 권한만 Read and write로 부여하세요. 입력한 PAT는 이 브라우저의 localStorage에 저장됩니다.
              브라우저를 공유하는 경우 저장하지 말고, 전용·제한된 PAT를 사용하세요.
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              <label className={labelClassName}>Owner<input className={fieldClassName} value={settings.owner} onChange={(event) => setSettings((previous) => ({ ...previous, owner: event.target.value }))} /></label>
              <label className={labelClassName}>Repository<input className={fieldClassName} value={settings.repo} onChange={(event) => setSettings((previous) => ({ ...previous, repo: event.target.value }))} /></label>
              <label className={labelClassName}>Branch<input className={fieldClassName} value={settings.branch} onChange={(event) => setSettings((previous) => ({ ...previous, branch: event.target.value }))} /></label>
            </div>
            <label className={labelClassName}>
              이미지 저장 경로 (저장소 기준)
              <input
                className={fieldClassName}
                value={settings.uploadPath}
                onChange={(event) => setSettings((previous) => ({ ...previous, uploadPath: event.target.value }))}
                placeholder="public/media"
              />
            </label>
            <p className="text-xs text-slate-500">경로는 public/ 아래여야 합니다. 예: public/media/uploads</p>
            <p className="text-xs text-slate-500">현재 GitHub Pages 배포 workflow는 main 브랜치의 변경에 반응합니다.</p>
            <label className={labelClassName}>
              Fine-grained PAT
              <input type="password" autoComplete="off" className={fieldClassName} value={settings.token} onChange={(event) => setSettings((previous) => ({ ...previous, token: event.target.value }))} placeholder="github_pat_..." />
            </label>
            <button type="button" onClick={clearSavedSettings} className="text-xs font-semibold text-slate-600 underline">저장된 설정 지우기</button>
            {settingsError && <p role="alert" className="text-sm text-red-700">{settingsError}</p>}
          </div>

          <div className="space-y-3">
            <h2 className="font-bold text-slate-900">{editingId ? '카드 수정' : '카드 추가'}</h2>
            <form onSubmit={handleSave} className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                {input('title', '제목', true)}
                <label className={labelClassName}>
                  Type
                  <select
                    className={fieldClassName}
                    value={form.type}
                    disabled={Boolean(editingId)}
                    onChange={(event) => setForm((previous) => ({ ...previous, type: event.target.value as ContentType }))}
                  >
                    {Object.values(ContentType).map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </label>
                {input('subtitle', '부제')}
                {input('category', '카테고리')}
                <label className={labelClassName}>
                  커버 이미지 URL
                  <input
                    className={fieldClassName}
                    value={form.coverImage}
                    required
                    onChange={(event) => setForm((previous) => ({ ...previous, coverImage: event.target.value }))}
                  />
                  <div
                    className={`rounded-lg border-2 border-dashed p-3 ${isDraggingImage ? 'border-[var(--brand-accent)] bg-white' : 'border-slate-300'}`}
                    onDragOver={(event) => {
                      event.preventDefault();
                      setIsDraggingImage(true);
                    }}
                    onDragLeave={(event) => {
                      event.preventDefault();
                      setIsDraggingImage(false);
                    }}
                    onDrop={(event) => {
                      event.preventDefault();
                      setIsDraggingImage(false);
                      selectImage(event.dataTransfer.files[0]);
                    }}
                  >
                    <label className="flex cursor-pointer flex-col gap-2 text-xs font-normal text-slate-600">
                      <span>{selectedImage ? selectedImage.name : '이미지를 선택하거나 이곳에 드래그 앤 드롭하세요.'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploading || isSaving}
                        className="text-xs"
                        aria-label="업로드할 이미지 선택"
                        onChange={(event) => {
                          selectImage(event.currentTarget.files?.[0]);
                          event.currentTarget.value = '';
                        }}
                      />
                    </label>
                    {selectedImage && (
                      <div className="mt-3 flex flex-col gap-2">
                        <label className={labelClassName}>
                          저장할 파일 이름
                          <input
                            className={fieldClassName}
                            value={imageFileName}
                            disabled={isUploading || isSaving}
                            placeholder={getImageFileName(selectedImage, '')}
                            onChange={(event) => setImageFileName(event.target.value)}
                          />
                        </label>
                        <p className="text-xs font-normal text-slate-500">
                          확장자를 생략하면 원본 이미지 확장자를 사용합니다. 같은 이름의 파일은 덮어쓰지 않습니다.
                        </p>
                        <button
                          type="button"
                          disabled={isUploading || isSaving}
                          onClick={() => void handleImageUpload()}
                          className="w-fit rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 disabled:opacity-50"
                        >
                          {isUploading ? '이미지 업로드 중...' : '이 이름으로 업로드'}
                        </button>
                      </div>
                    )}
                  </div>
                  {isUploading && <span role="status" className="font-normal text-slate-500">이미지를 GitHub에 업로드 중...</span>}
                </label>
                {input('externalLink', '외부 링크')}
                {input('channelUrl', '채널 URL')}
                {input('videoUrl', '미디어 URL')}
                {input('tags', '태그 (쉼표로 구분)')}
              </div>
              {form.type === ContentType.GAME && (
                <label className={labelClassName}>
                  게임 링크 (JSON 배열)
                  <textarea
                    className={fieldClassName}
                    rows={4}
                    value={form.gameLinks}
                    onChange={(event) => setForm((previous) => ({ ...previous, gameLinks: event.target.value }))}
                    placeholder={'[{"label":"Official site","url":"https://..."}]'}
                  />
                </label>
              )}
              <label className={labelClassName}>
                설명
                <textarea className={fieldClassName} rows={3} value={form.description} onChange={(event) => setForm((previous) => ({ ...previous, description: event.target.value }))} />
              </label>
              <div className="flex flex-wrap gap-2">
                <button type="submit" disabled={isSaving || isUploading} className="rounded-lg bg-[var(--brand-accent)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
                  {isSaving ? 'GitHub 저장 중...' : isUploading ? '이미지 업로드 중...' : editingId ? '수정 후 커밋' : '추가 후 커밋'}
                </button>
                {editingId && <button type="button" onClick={resetForm} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">취소</button>}
              </div>
            </form>
          </div>

          <div className="space-y-3 lg:col-span-2">
            <h2 className="font-bold text-slate-900">카드 목록</h2>
            <input aria-label="제목으로 검색" className={fieldClassName} placeholder="제목으로 검색" value={search} onChange={(event) => setSearch(event.target.value)} />
            <ul className="max-h-80 space-y-2 overflow-y-auto">
              {filteredPosts.map((post) => (
                <li key={post.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                  <span className="min-w-0 truncate text-sm text-slate-800">{post.title} <span className="text-xs text-slate-500">({post.type})</span></span>
                  <span className="flex gap-2">
                    <button type="button" onClick={() => { setEditingId(post.id); setForm(formFromPost(post)); setMessage(''); }} className="rounded border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700">수정</button>
                    <button type="button" disabled={isSaving} onClick={() => void handleDelete(post)} className="rounded border border-red-200 px-2 py-1 text-xs font-semibold text-red-700 disabled:opacity-50">삭제</button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {message && <p role={message.startsWith('저장 후') ? 'status' : 'alert'} className={`break-words text-sm lg:col-span-2 ${message.startsWith('저장 후') ? 'text-emerald-800' : 'text-red-700'}`}>{message}</p>}
        </div>
      )}
    </section>
  );
};

export default GitHubCardAdmin;
