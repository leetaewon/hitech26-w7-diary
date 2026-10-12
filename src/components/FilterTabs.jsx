import { EMOTIONS } from '../emotions'

export default function FilterTabs({ value, onChange }) {
  const tabs = [{ key: 'all', emoji: '', label: '전체' }, ...EMOTIONS]
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          onClick={() => onChange(t.key)}
          className={`rounded-full px-3 py-1 text-sm ${
            value === t.key ? 'bg-indigo-600 text-white' : 'bg-white shadow-sm hover:bg-slate-50'
          }`}
        >
          {t.emoji} {t.label}
        </button>
      ))}
    </div>
  )
}
