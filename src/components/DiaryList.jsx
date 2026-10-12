import { emojiOf } from '../emotions'

export default function DiaryList({ diaries, onDelete }) {
  return (
    <ul className="space-y-3">
      {diaries.map((d) => (
        <li key={d.id} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow">
          <span className="text-3xl">{emojiOf(d.emotion)}</span>
          <div className="min-w-0 flex-1">
            <p className="whitespace-pre-wrap break-words">{d.content}</p>
            <time className="text-xs text-slate-500">
              {new Date(d.created_at).toLocaleString('ko-KR')}
            </time>
          </div>
          <button
            type="button"
            onClick={() => onDelete(d.id)}
            className="text-sm text-red-500 hover:underline"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  )
}
