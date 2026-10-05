import React, { useState } from 'react';
import { Post, ContentType } from '../../types';
import { EditableCard } from '../../lib/cards';

interface CardEditorModalProps {
  post: Post | null;
  onClose: () => void;
  onSave: (cardData: EditableCard) => Promise<void>;
}

export const CardEditorModal: React.FC<CardEditorModalProps> = ({ post, onClose, onSave }) => {
  const [title, setTitle] = useState(post?.title || '');
  const [subtitle, setSubtitle] = useState(post?.subtitle || '');
  const [description, setDescription] = useState(post?.description || '');
  const [coverImage, setCoverImage] = useState(post?.coverImage || '');
  const [type, setType] = useState<ContentType>(post?.type || ContentType.IMAGE);
  const [category, setCategory] = useState(post?.category || '');
  const [videoUrl, setVideoUrl] = useState(post?.videoUrl || '');
  const [externalLink, setExternalLink] = useState(post?.externalLink || '');
  const [tags, setTags] = useState(post?.tags?.join(', ') || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        title,
        subtitle: subtitle || undefined,
        description,
        coverImage,
        type,
        category: category || undefined,
        videoUrl: videoUrl || undefined,
        externalLink: externalLink || undefined,
        tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      });
      onClose();
    } catch (error) {
      console.error('Failed to save card:', error);
      alert('failed to save card. Please check the console for details.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold text-slate-800">
          {post ? 'Edit Card' : 'Add New Card'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as ContentType)}
                className="w-full rounded border border-slate-300 p-2 text-sm bg-white"
              >
                {Object.values(ContentType).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
              <input
                type="text"
                value={category}
                placeholder="예: REF, GAME 등"
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 text-sm"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Cover Image URL</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Video URL / External Link</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-sm"
              />
              <input
                type="text"
                placeholder="External Link"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                className="w-full rounded border border-slate-300 p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Tags (쉼표로 구분)</label>
            <input
              type="text"
              placeholder="tag1, tag2, tag3"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded border border-slate-300 p-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CardEditorModal;