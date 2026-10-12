import { useState } from 'react'
import { EMOTIONS } from '../emotions'

export default function DiaryForm({ onSubmit, saving }) {
  const [emotion, setEmotion] = useState('')
  const [content, setContent] = useState('')
  const valid = emotion !== '' && content.trim() !== ''

  async function handleSubmit(e) {
    e.preventDefault()
    if (!valid || saving) return
    const ok = await onSubmit({ emotion, content: content.trim() })
    if (ok) {
      setEmotion('')
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl bg-white p-4 shadow">
      <div className="flex flex-wrap gap-2">
        {EMOTIONS.map((e) => (
          <button
            key={e.key}
            type="button"
            aria-pressed={emotion === e.key}
            onClick={() => setEmotion(e.key)}
            className={`rounded-full border px-3 py-1 text-sm ${
              emotion === e.key
                ? 'border-indigo-500 bg-indigo-100'
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            {e.emoji} {e.label}
          </button>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="오늘의 기록을 남겨보세요"
        className="w-full rounded-lg border border-slate-300 p-2"
      />
      <button
        type="submit"
        disabled={!valid || saving}
        className="rounded-lg bg-indigo-600 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? '저장 중...' : '저장'}
      </button>
    </form>
  )
}
