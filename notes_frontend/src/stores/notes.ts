import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export type Note = {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
  color?: string
  pinned?: boolean
  archived?: boolean
}

const STORAGE_KEY = 'pnm_notes_v1'
const STORAGE_SELECTED = 'pnm_selected_v1'

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// PUBLIC_INTERFACE
export const useNotesStore = defineStore('notes', () => {
  /** All notes in the application */
  const notes = ref<Note[]>([])
  /** Currently selected note id (or null) */
  const selectedId = ref<string | null>(null)
  /** Local search query */
  const search = ref('')

  /** Computed: notes filtered by search and ordered with pinned on top and recency thereafter */
  const filteredNotes = computed(() => {
    const q = search.value.trim().toLowerCase()
    const base = q.length
      ? notes.value.filter(
          (n) =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q),
        )
      : notes.value.slice()

    return base
      .slice()
      .sort((a, b) => {
        if ((a.pinned ? 1 : 0) !== (b.pinned ? 1 : 0)) {
          return (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0)
        }
        return b.updatedAt - a.updatedAt
      })
      .filter((n) => !n.archived)
  })

  /** Computed: get selected note or undefined */
  const selectedNote = computed(() =>
    notes.value.find((n) => n.id === selectedId.value),
  )

  /** Create a new note and select it */
  // PUBLIC_INTERFACE
  function createNote(title?: string, content?: string) {
    const now = Date.now()
    const n: Note = {
      id: uid(),
      title: title?.trim() || 'Untitled note',
      content: content ?? '',
      createdAt: now,
      updatedAt: now,
      color: undefined,
      pinned: false,
      archived: false,
    }
    notes.value.unshift(n)
    selectedId.value = n.id
  }

  /** Update title/content of a note */
  // PUBLIC_INTERFACE
  function updateNote(id: string, data: Partial<Pick<Note, 'title' | 'content'>>) {
    const n = notes.value.find((x) => x.id === id)
    if (!n) return
    if (typeof data.title === 'string') n.title = data.title
    if (typeof data.content === 'string') n.content = data.content
    n.updatedAt = Date.now()
  }

  /** Soft actions */
  // PUBLIC_INTERFACE
  function togglePin(id: string) {
    const n = notes.value.find((x) => x.id === id)
    if (!n) return
    n.pinned = !n.pinned
    n.updatedAt = Date.now()
  }

  // PUBLIC_INTERFACE
  function archive(id: string) {
    const n = notes.value.find((x) => x.id === id)
    if (!n) return
    n.archived = true
    n.updatedAt = Date.now()
    if (selectedId.value === id) {
      // move selection to first available
      const next = filteredNotes.value.find((m) => !m.archived)
      selectedId.value = next?.id ?? null
    }
  }

  /** Permanently delete a note */
  // PUBLIC_INTERFACE
  function remove(id: string) {
    const idx = notes.value.findIndex((n) => n.id === id)
    if (idx !== -1) {
      notes.value.splice(idx, 1)
      if (selectedId.value === id) {
        selectedId.value = notes.value[0]?.id ?? null
      }
    }
  }

  /** Select a note for editing */
  // PUBLIC_INTERFACE
  function select(id: string | null) {
    selectedId.value = id
  }

  // Persistence: load from localStorage
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) notes.value = JSON.parse(raw)
    const sel = localStorage.getItem(STORAGE_SELECTED)
    if (sel) selectedId.value = sel
    if (!notes.value.length) {
      createNote('Welcome to Personal Notes', 'Start typing your thoughts here...')
    }
    if (!selectedId.value && notes.value.length) {
      selectedId.value = notes.value[0].id
    }
  } catch {
    // ignore parse errors, start fresh
  }

  // Persist whenever notes or selection change
  watch(
    notes,
    (v) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(v))
      } catch {
        /* ignore */
      }
    },
    { deep: true },
  )
  watch(selectedId, (v) => {
    try {
      if (v) localStorage.setItem(STORAGE_SELECTED, v)
    } catch {
      /* ignore */
    }
  })

  return {
    notes,
    selectedId,
    selectedNote,
    filteredNotes,
    search,
    createNote,
    updateNote,
    togglePin,
    archive,
    remove,
    select,
  }
})
