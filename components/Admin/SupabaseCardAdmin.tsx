import React, { useMemo, useState, type FormEvent } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { ContentType, type GameLink, type Post } from '../../types';

interface SupabaseCardAdminProps {
  posts: Post[];
  isLoading: boolean;
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
  iconImage: string;
}

type CardPayload = Pick<Post, 'title' | 'subtitle' | 'description' | 'coverImage' | 'type' | 'category'> & {
  metadata: Record<string, unknown>;
};

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
  iconImage: '',
});

const formFromPost = (post: Post): CardForm => ({
  title: post.title,
  subtitle: post.subtitle || '',
  description: post.description || '',
  coverImage: post.coverImage || '',
  type: post.type,
  category: Array.isArray(post.category) ? post.category.join(', ') : post.category || '',
  externalLink: post.externalLink || '',
  channelUrl: post.channelUrl || '',
  videoUrl: post.videoUrl || '',
  tags: post.tags?.join(', ') || '',
  gameLinks: JSON.stringify(post.gameLinks || [], null, 2),
  iconImage: post.iconImage || '',
});

const fieldClassName = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900';
const labelClassName = 'flex flex-col gap-1 text-xs font-semibold text-slate-700';

const buildPayload = (form: CardForm, existing?: Post): CardPayload => {
  let gameLinks: GameLink[];
  try {
    const parsed: unknown = JSON.parse(form.gameLinks || '[]');
    if (!Array.isArray(parsed) || !parsed.every((link) =>
      typeof link === 'object'
      && link !== null
      && 'label' in link
      && typeof link.label === 'string'
      && 'url' in link
      && typeof link.url === 'string',
    )) {
      throw new Error('게임 링크는 label과 url이 포함된 JSON 배열이어야 합니다.');
    }
    gameLinks = parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('게임 링크 JSON 형식을 확인해 주세요.');
    }
    throw error;
  }

  const metadata: Record<string, unknown> = {};
  if (existing?.thumbnail) metadata.thumbnail = existing.thumbnail;
  if (existing?.sliderImages) metadata.sliderImages = existing.sliderImages;
  if (existing?.imageIndex !== undefined) metadata.imageIndex = existing.imageIndex;

  const externalLink = form.externalLink.trim();
  const channelUrl = form.channelUrl.trim();
  const videoUrl = form.videoUrl.trim();
  const iconImage = form.iconImage.trim();
  const tags = form.tags.split(',').map((tag) => tag.trim()).filter(Boolean);

  if (externalLink) metadata.externalLink = externalLink;
  if (channelUrl) metadata.channelUrl = channelUrl;
  if (videoUrl) metadata.videoUrl = videoUrl;
  if (iconImage) metadata.iconImage = iconImage;
  if (tags.length) metadata.tags = tags;
  if (gameLinks.length) metadata.gameLinks = gameLinks;

  return {
    title: form.title.trim(),
    subtitle: form.subtitle.trim(),
    description: form.description.trim(),
    coverImage: form.coverImage.trim(),
    type: form.type,
    category: form.category.trim(),
    metadata,
  };
};

const SupabaseCardAdmin: React.FC<SupabaseCardAdminProps> = ({ posts, isLoading, onPostsChange }) => {
  const [form, setForm] = useState<CardForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const sortedPosts = useMemo(
    () => [...posts].sort((left, right) => left.title.localeCompare(right.title, undefined, { sensitivity: 'base' })),
    [posts],
  );
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    if (!query) return sortedPosts;
    return sortedPosts.filter((post) =>
      `${post.title} ${post.subtitle || ''} ${post.category || ''} ${post.type}`
        .toLocaleLowerCase()
        .includes(query),
    );
  }, [search, sortedPosts]);

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setError('Supabase가 설정되지 않아 카드를 저장할 수 없습니다.');
      return;
    }

    setError('');
    setMessage('');
    setIsSaving(true);
    try {
      const existing = editingId ? posts.find((post) => post.id === editingId) : undefined;
      if (editingId && !existing) {
        throw new Error('수정할 카드를 찾을 수 없습니다. 목록을 새로고침한 뒤 다시 시도해 주세요.');
      }
      const payload = buildPayload(form, existing);

      if (editingId) {
        const { data, error: updateError } = await supabase
          .from('posts')
          .update(payload)
          .eq('id', editingId)
          .select('id')
          .maybeSingle();
        if (updateError) throw updateError;
        if (!data || (typeof data.id !== 'string' && typeof data.id !== 'number')) {
          throw new Error('카드가 수정되지 않았습니다. 관리자 권한과 RLS 정책을 확인해 주세요.');
        }
        const updated: Post = { ...existing!, ...payload, id: String(data.id) };
        onPostsChange(posts.map((post) => post.id === editingId ? updated : post));
        setMessage('카드를 수정했습니다.');
      } else {
        const { data, error: insertError } = await supabase
          .from('posts')
          .insert(payload)
          .select('id')
          .single();
        if (insertError) throw insertError;
        if (typeof data.id !== 'string' && typeof data.id !== 'number') {
          throw new Error('저장은 완료됐지만 생성된 카드 ID를 확인할 수 없습니다. 목록을 다시 불러와 주세요.');
        }
        const created: Post = { ...payload, id: String(data.id) };
        onPostsChange([...posts, created]);
        setMessage('새 카드를 추가했습니다.');
      }
      resetForm();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : String(saveError));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (post: Post) => {
    if (!supabase) {
      setError('Supabase가 설정되지 않아 카드를 삭제할 수 없습니다.');
      return;
    }
    if (!window.confirm(`"${post.title}" 카드를 영구 삭제할까요?`)) return;

    setError('');
    setMessage('');
    setDeletingId(post.id);
    try {
      const { data, error: deleteError } = await supabase
        .from('posts')
        .delete()
        .eq('id', post.id)
        .select('id')
        .maybeSingle();
      if (deleteError) throw deleteError;
      if (!data) {
        throw new Error('카드가 삭제되지 않았습니다. 관리자 권한과 RLS 정책을 확인해 주세요.');
      }
      onPostsChange(posts.filter((item) => item.id !== post.id));
      if (editingId === post.id) resetForm();
      setMessage(`"${post.title}" 카드를 삭제했습니다.`);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : String(deleteError));
    } finally {
      setDeletingId(null);
    }
  };

  const updateField = <K extends keyof CardForm>(key: K, value: CardForm[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  return (
    <section className="px-4 py-4 sm:px-6 xl:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">카드 관리자</h1>
          <p className="mt-1 text-sm text-slate-600">카드 데이터는 Supabase에 저장되며, 변경 사항은 실시간 구독을 통해 반영됩니다.</p>
        </header>

        {(error || message) && (
          <p
            role={error ? 'alert' : 'status'}
            className={`rounded-lg border px-4 py-3 text-sm ${error ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`}
          >
            {error || message}
          </p>
        )}

        <div className="grid items-start gap-5 xl:grid-cols-[minmax(20rem,0.85fr)_minmax(0,1.15fr)]">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">{editingId ? '카드 수정' : '카드 추가'}</h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-sm font-semibold text-slate-600 underline">
                  수정 취소
                </button>
              )}
            </div>

            <label className={labelClassName}>
              제목
              <input className={fieldClassName} required value={form.title} onChange={(event) => updateField('title', event.target.value)} />
            </label>

            <label className={labelClassName}>
              부제
              <input className={fieldClassName} value={form.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} />
            </label>

            <label className={labelClassName}>
              설명
              <textarea className={`${fieldClassName} min-h-24`} value={form.description} onChange={(event) => updateField('description', event.target.value)} />
            </label>

            <label className={labelClassName}>
              커버 이미지 URL
              <input className={fieldClassName} value={form.coverImage} onChange={(event) => updateField('coverImage', event.target.value)} />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className={labelClassName}>
                타입
                <select className={fieldClassName} value={form.type} onChange={(event) => updateField('type', event.target.value as ContentType)}>
                  {Object.values(ContentType).map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label className={labelClassName}>
                카테고리
                <input className={fieldClassName} value={form.category} onChange={(event) => updateField('category', event.target.value)} />
              </label>
            </div>

            <details className="rounded-lg border border-slate-200 p-3">
              <summary className="cursor-pointer text-sm font-semibold text-slate-800">유형별 링크 및 메타데이터</summary>
              <div className="mt-4 space-y-3">
                <label className={labelClassName}>
                  외부 링크
                  <input className={fieldClassName} type="url" value={form.externalLink} onChange={(event) => updateField('externalLink', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  채널 URL
                  <input className={fieldClassName} type="url" value={form.channelUrl} onChange={(event) => updateField('channelUrl', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  영상 URL
                  <input className={fieldClassName} type="url" value={form.videoUrl} onChange={(event) => updateField('videoUrl', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  아이콘 이미지 URL
                  <input className={fieldClassName} value={form.iconImage} onChange={(event) => updateField('iconImage', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  태그 (쉼표로 구분)
                  <input className={fieldClassName} value={form.tags} onChange={(event) => updateField('tags', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  게임 링크 (JSON 배열)
                  <textarea
                    className={`${fieldClassName} min-h-32 font-mono`}
                    spellCheck={false}
                    value={form.gameLinks}
                    onChange={(event) => updateField('gameLinks', event.target.value)}
                    placeholder={'[{"label":"공식 사이트","url":"https://example.com"}]'}
                  />
                </label>
                <p className="text-xs leading-relaxed text-slate-500">
                  이 링크와 태그 필드는 `metadata` JSON 컬럼에 저장됩니다. 게임 링크는 각 항목에 `label`, `url`이 필요합니다.
                </p>
              </div>
            </details>

            <button
              type="submit"
              disabled={isSaving || isLoading}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
            >
              {isSaving ? '저장 중...' : editingId ? '수정 내용 저장' : '카드 추가'}
            </button>
          </form>

          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-slate-900">등록된 카드 ({posts.length})</h2>
              <input
                className={`${fieldClassName} sm:max-w-xs`}
                type="search"
                aria-label="카드 검색"
                placeholder="제목, 타입, 카테고리 검색"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            {isLoading ? (
              <p role="status" className="py-8 text-center text-sm text-slate-500">카드 목록을 불러오는 중...</p>
            ) : filteredPosts.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                {posts.length === 0 ? '등록된 카드가 없습니다.' : '검색 결과가 없습니다.'}
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-slate-200">
                {filteredPosts.map((post) => (
                  <li key={post.id} className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">{post.title}</p>
                      <p className="mt-1 truncate text-xs text-slate-500">
                        {post.type}{post.category ? ` · ${post.category}` : ''}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setForm(formFromPost(post));
                          setEditingId(post.id);
                          setError('');
                          setMessage('');
                        }}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        수정
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(post)}
                        disabled={deletingId !== null}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                      >
                        {deletingId === post.id ? '삭제 중...' : '삭제'}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </section>
  );
};

export default SupabaseCardAdmin;
