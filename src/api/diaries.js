import { supabase } from '../lib/supabase'

export async function fetchDiaries() {
  const { data, error } = await supabase
    .from('diaries')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function addDiary({ emotion, content }) {
  const { data, error } = await supabase
    .from('diaries')
    .insert({ emotion, content })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteDiary(id) {
  const { error } = await supabase.from('diaries').delete().eq('id', id)
  if (error) throw error
}
