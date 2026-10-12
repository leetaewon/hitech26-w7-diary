import { useEffect, useState } from 'react'
import { addDiary, deleteDiary, fetchDiaries } from './api/diaries'
import DiaryForm from './components/DiaryForm'
import DiaryList from './components/DiaryList'
import FilterTabs from './components/FilterTabs'

export default function App() {
  const [diaries, setDiaries] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchDiaries()
      .then(setDiaries)
      .catch(() => setError('기록을 불러오지 못했습니다.'))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd(input) {
    setSaving(true)
    setError('')
    try {
      const created = await addDiary(input)
      setDiaries((prev) => [created, ...prev])
      return true
    } catch {
      setError('저장에 실패했습니다.')
      return false
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    setError('')
    try {
      await deleteDiary(id)
      setDiaries((prev) => prev.filter((d) => d.id !== id))
    } catch {
      setError('삭제에 실패했습니다.')
    }
  }

  const visible = filter === 'all' ? diaries : diaries.filter((d) => d.emotion === filter)

  return (
    <main className="mx-auto min-h-screen max-w-xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">감정 일기</h1>
      <DiaryForm onSubmit={handleAdd} saving={saving} />
      {error && (
        <p role="alert" className="rounded-lg bg-red-100 p-3 text-red-700">
          {error}
        </p>
      )}
      <FilterTabs value={filter} onChange={setFilter} />
      {loading ? (
        <p className="text-center text-slate-500">불러오는 중...</p>
      ) : visible.length === 0 ? (
        <p className="text-center text-slate-500">
          {diaries.length === 0
            ? '아직 기록이 없어요. 첫 일기를 남겨보세요.'
            : '해당 감정의 기록이 없어요.'}
        </p>
      ) : (
        <DiaryList diaries={visible} onDelete={handleDelete} />
      )}
    </main>
  )
}
