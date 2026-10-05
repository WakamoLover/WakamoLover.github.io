import React, { useEffect, useMemo, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { ContentType, type GameLink, type Post } from '../../types';
import { optimizeImageUrl } from '../../utils/optimizeImageUrl';

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
const STORAGE_BUCKET = 'card-images';
const ADMIN_TYPE_TABS: { type: ContentType; label: string }[] = [
  { type: ContentType.GAME, label: 'Game' },
  { type: ContentType.CREATOR, label: 'Creator' },
  { type: ContentType.MEDIA, label: 'Media' },
  { type: ContentType.REF, label: 'Reference' },
];

const getImagePreviewUrl = (coverImage: string): string => {
  const source = coverImage.trim();
  if (!source) return '';
  if (/^(https?:|data:|blob:)/i.test(source)) return source;
  if (source.startsWith('//')) return `https:${source}`;
  if (source.startsWith('/media/')) return source;
  if (source.startsWith('media/')) return `/${source}`;
  if (/^(game|ref)\//i.test(source)) return `/media/${source}`;
  if (source.startsWith('/')) return source;
  return supabase?.storage.from(STORAGE_BUCKET).getPublicUrl(source).data.publicUrl || source;
};

const makeStorageFileName = (file: File): string => {
  const originalName = file.name.split(/[\\/]/).pop() || 'image';
  const dotIndex = originalName.lastIndexOf('.');
  const extension = dotIndex > 0 ? originalName.slice(dotIndex).toLowerCase() : '';
  const baseName = (dotIndex > 0 ? originalName.slice(0, dotIndex) : originalName)
    .normalize('NFKD')
    .replace(/[^\w-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80) || 'image';
  return `${Date.now()}_${baseName}${extension}`;
};

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
      throw new Error('Game links must be a JSON array with label and url properties.');
    }
    gameLinks = parsed;
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Check the game links JSON format.');
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
  const [selectedType, setSelectedType] = useState<ContentType>(ContentType.GAME);
  const [search, setSearch] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [localImagePreview, setLocalImagePreview] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const localPreviewUrlRef = useRef<string | null>(null);

  useEffect(() => () => {
    if (localPreviewUrlRef.current) URL.revokeObjectURL(localPreviewUrlRef.current);
  }, []);

  const sortedPosts = useMemo(
    () => [...posts].sort((left, right) => left.title.localeCompare(right.title, undefined, { sensitivity: 'base' })),
    [posts],
  );
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();
    return sortedPosts.filter((post) =>
      post.type.trim().toUpperCase() === selectedType
      && (!query ||
      `${post.title} ${post.subtitle || ''} ${post.category || ''} ${post.type}`
        .toLocaleLowerCase()
        .includes(query)),
    );
  }, [search, selectedType, sortedPosts]);

  const resetForm = () => {
    setForm(emptyForm());
    setEditingId(null);
    if (localPreviewUrlRef.current) URL.revokeObjectURL(localPreviewUrlRef.current);
    localPreviewUrlRef.current = null;
    setLocalImagePreview('');
  };

  const uploadCoverImage = async (file: File) => {
    if (!supabase) {
      setError('Supabase is not configured, so images cannot be uploaded.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Only image files can be uploaded.');
      return;
    }

    setError('');
    setMessage('');
    if (localPreviewUrlRef.current) URL.revokeObjectURL(localPreviewUrlRef.current);
    const localPreviewUrl = URL.createObjectURL(file);
    localPreviewUrlRef.current = localPreviewUrl;
    setLocalImagePreview(localPreviewUrl);
    setIsUploadingImage(true);
    try {
      const filePath = makeStorageFileName(file);
      const { error: uploadError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          contentType: file.type,
          upsert: false,
        });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
      if (!data.publicUrl) throw new Error('The upload completed, but no public URL was returned.');

      setForm((previous) => ({ ...previous, coverImage: data.publicUrl }));
      URL.revokeObjectURL(localPreviewUrl);
      localPreviewUrlRef.current = null;
      setLocalImagePreview('');
      setMessage('Cover image uploaded successfully.');
    } catch (uploadError) {
      URL.revokeObjectURL(localPreviewUrl);
      if (localPreviewUrlRef.current === localPreviewUrl) localPreviewUrlRef.current = null;
      setLocalImagePreview('');
      setError(`Image upload failed: ${uploadError instanceof Error ? uploadError.message : String(uploadError)}`);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleImageSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const [file] = event.target.files || [];
    if (file) void uploadCoverImage(file);
    event.target.value = '';
  };

  const handleImageDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDraggingImage(false);
    const [file] = event.dataTransfer.files;
    if (file) void uploadCoverImage(file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setError('Supabase is not configured, so cards cannot be saved.');
      return;
    }

    setError('');
    setMessage('');
    setIsSaving(true);
    try {
      const existing = editingId ? posts.find((post) => post.id === editingId) : undefined;
      if (editingId && !existing) {
        throw new Error('The card to edit could not be found. Refresh the list and try again.');
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
          throw new Error('The card was not updated. Check admin permissions and RLS policies.');
        }
        const updated: Post = { ...existing!, ...payload, id: String(data.id) };
        onPostsChange(posts.map((post) => post.id === editingId ? updated : post));
        setMessage('Card updated successfully.');
      } else {
        const { data, error: insertError } = await supabase
          .from('posts')
          .insert(payload)
          .select('id')
          .single();
        if (insertError) throw insertError;
        if (typeof data.id !== 'string' && typeof data.id !== 'number') {
          throw new Error('The save completed, but the new card ID could not be read. Reload the list.');
        }
        const created: Post = { ...payload, id: String(data.id) };
        onPostsChange([...posts, created]);
        setMessage('New card added successfully.');
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
      setError('Supabase is not configured, so cards cannot be deleted.');
      return;
    }
    if (!window.confirm(`Permanently delete "${post.title}"?`)) return;

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
        throw new Error('The card was not deleted. Check admin permissions and RLS policies.');
      }
      onPostsChange(posts.filter((item) => item.id !== post.id));
      if (editingId === post.id) resetForm();
      setMessage(`"${post.title}" was deleted.`);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : String(deleteError));
    } finally {
      setDeletingId(null);
    }
  };

  const updateField = <K extends keyof CardForm>(key: K, value: CardForm[K]) => {
    setForm((previous) => ({ ...previous, [key]: value }));
  };

  const handleCoverImageChange = (value: string) => {
    if (localPreviewUrlRef.current) URL.revokeObjectURL(localPreviewUrlRef.current);
    localPreviewUrlRef.current = null;
    setLocalImagePreview('');
    updateField('coverImage', value);
  };

  return (
    <section className="px-4 py-4 sm:px-6 xl:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">Card Admin</h1>
          <p className="mt-1 text-sm text-slate-600">Cards are stored in Supabase and changes are reflected in real time.</p>
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
              <h2 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Card' : 'Add New Card'}</h2>
              {editingId && (
                <button type="button" onClick={resetForm} className="text-sm font-semibold text-slate-600 underline">
                  Cancel
                </button>
              )}
            </div>

            <label className={labelClassName}>
              Title
              <input className={fieldClassName} required value={form.title} onChange={(event) => updateField('title', event.target.value)} />
            </label>

            <label className={labelClassName}>
              Subtitle
              <input className={fieldClassName} value={form.subtitle} onChange={(event) => updateField('subtitle', event.target.value)} />
            </label>

            <label className={labelClassName}>
              Description
              <textarea className={`${fieldClassName} min-h-24`} value={form.description} onChange={(event) => updateField('description', event.target.value)} />
            </label>

            <div className="space-y-2">
              <span className={labelClassName}>Cover Image</span>
              <label className={labelClassName}>
                Cover Image URL / Path
                <input
                  className={fieldClassName}
                  type="text"
                  value={form.coverImage}
                  disabled={isUploadingImage}
                  placeholder="Paste a public URL or enter a Storage filename"
                  onChange={(event) => handleCoverImageChange(event.target.value)}
                />
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                aria-label="Choose a cover image file"
                onChange={handleImageSelection}
              />
              <div
                role="button"
                tabIndex={0}
                aria-label="Choose or drag and drop an image file"
                aria-disabled={isUploadingImage}
                onClick={() => {
                  if (!isUploadingImage) fileInputRef.current?.click();
                }}
                onKeyDown={(event) => {
                  if ((event.key === 'Enter' || event.key === ' ') && !isUploadingImage) {
                    event.preventDefault();
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(event) => {
                  event.preventDefault();
                  if (!isUploadingImage) setIsDraggingImage(true);
                }}
                onDragLeave={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    setIsDraggingImage(false);
                  }
                }}
                onDrop={handleImageDrop}
                className={`cursor-pointer rounded-xl border-2 border-dashed p-4 transition-colors ${isDraggingImage ? 'border-blue-500 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:border-slate-400'} ${isUploadingImage ? 'cursor-wait opacity-70' : ''}`}
              >
                <div className="flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
                  {(localImagePreview || form.coverImage) ? (
                    <img
                      src={localImagePreview || optimizeImageUrl(getImagePreviewUrl(form.coverImage))}
                      alt="Cover image preview"
                      className="aspect-square w-28 shrink-0 rounded-lg bg-white object-cover"
                    />
                  ) : (
                    <div className="flex aspect-square w-28 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-xs text-slate-500">
                      No image
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">
                      {isUploadingImage ? 'Uploading to Supabase Storage...' : 'Drop an image here or click to browse'}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Uploads to the public `card-images` bucket.
                    </p>
                    {form.coverImage && (
                      <p className="mt-2 break-all text-xs text-slate-500">{form.coverImage}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className={labelClassName}>
                Type
                <select className={fieldClassName} value={form.type} onChange={(event) => updateField('type', event.target.value as ContentType)}>
                  {Object.values(ContentType).map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label className={labelClassName}>
                Category
                <input className={fieldClassName} value={form.category} onChange={(event) => updateField('category', event.target.value)} />
              </label>
            </div>

            <details className="rounded-lg border border-slate-200 p-3">
              <summary className="cursor-pointer text-sm font-semibold text-slate-800">Links & Metadata</summary>
              <div className="mt-4 space-y-3">
                <label className={labelClassName}>
                  External Link
                  <input className={fieldClassName} type="url" value={form.externalLink} onChange={(event) => updateField('externalLink', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  Channel URL
                  <input className={fieldClassName} type="url" value={form.channelUrl} onChange={(event) => updateField('channelUrl', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  Video URL
                  <input className={fieldClassName} type="url" value={form.videoUrl} onChange={(event) => updateField('videoUrl', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  Icon Image URL
                  <input className={fieldClassName} value={form.iconImage} onChange={(event) => updateField('iconImage', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  Tags (comma-separated)
                  <input className={fieldClassName} value={form.tags} onChange={(event) => updateField('tags', event.target.value)} />
                </label>
                <label className={labelClassName}>
                  Game Links (JSON array)
                  <textarea
                    className={`${fieldClassName} min-h-[240px] resize-y font-mono leading-6`}
                    rows={12}
                    spellCheck={false}
                    value={form.gameLinks}
                    onChange={(event) => updateField('gameLinks', event.target.value)}
                    placeholder={'[{"label":"Official Site","url":"https://example.com"}]'}
                  />
                </label>
                <p className="text-xs leading-relaxed text-slate-500">
                  Links and tags are stored in the `metadata` JSON column. Each game link requires a `label` and `url`.
                </p>
              </div>
            </details>

            <button
              type="submit"
              disabled={isSaving || isUploadingImage || isLoading}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-wait disabled:opacity-60"
            >
              {isUploadingImage ? 'Uploading Image...' : isSaving ? 'Saving...' : 'Save'}
            </button>
          </form>

          <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-lg font-bold text-slate-900">Cards ({filteredPosts.length} of {posts.length})</h2>
              <input
                className={`${fieldClassName} sm:max-w-xs`}
                type="search"
                aria-label="Search cards"
                placeholder="Search title, type, or category"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <nav aria-label="Filter cards by type" className="mt-4 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
              {ADMIN_TYPE_TABS.map((tab) => (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => setSelectedType(tab.type)}
                  aria-pressed={selectedType === tab.type}
                  className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${selectedType === tab.type ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>

            {isLoading ? (
              <p role="status" className="py-8 text-center text-sm text-slate-500">Loading cards...</p>
            ) : filteredPosts.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-500">
                {posts.length === 0 ? 'No cards have been added yet.' : 'No cards match this type and search.'}
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
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(post)}
                        disabled={deletingId !== null}
                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
                      >
                        {deletingId === post.id ? 'Deleting...' : 'Delete'}
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
