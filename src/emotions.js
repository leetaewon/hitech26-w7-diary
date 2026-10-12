export const EMOTIONS = [
  { key: 'joy', emoji: '😊', label: '기쁨' },
  { key: 'calm', emoji: '😌', label: '평온' },
  { key: 'sad', emoji: '😢', label: '슬픔' },
  { key: 'angry', emoji: '😠', label: '화남' },
  { key: 'anxious', emoji: '😰', label: '불안' },
]

export const emojiOf = (key) => EMOTIONS.find((e) => e.key === key)?.emoji ?? '❔'
