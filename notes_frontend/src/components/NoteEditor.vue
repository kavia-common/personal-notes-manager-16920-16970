<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const note = computed(() => store.selectedNote)

const localTitle = ref('')
const localContent = ref('')
const savedFlag = ref(false)

watch(
  note,
  (n) => {
    localTitle.value = n?.title ?? ''
    localContent.value = n?.content ?? ''
    savedFlag.value = false
  },
  { immediate: true },
)

function save() {
  if (!note.value) return
  store.updateNote(note.value.id, {
    title: localTitle.value,
    content: localContent.value,
  })
  savedFlag.value = true
  setTimeout(() => (savedFlag.value = false), 1200)
}

function removeCurrent() {
  if (!note.value) return
  store.remove(note.value.id)
}
</script>

<template>
  <section class="editor" v-if="note" aria-label="Note editor">
    <div class="toolbar">
      <div class="left">
        <input
          class="title-input"
          v-model="localTitle"
          type="text"
          placeholder="Note title"
          aria-label="Note title"
          @keydown.enter.prevent="save"
        />
      </div>
      <div class="right">
        <span class="saved" v-show="savedFlag">Saved</span>
        <button class="btn neutral" title="Pin/Unpin" @click="store.togglePin(note.id)">📌</button>
        <button class="btn warn" title="Archive" @click="store.archive(note.id)">Archive</button>
        <button class="btn danger" title="Delete" @click="removeCurrent">Delete</button>
        <button class="btn primary" @click="save">Save</button>
      </div>
    </div>

    <textarea
      class="content"
      v-model="localContent"
      placeholder="Start writing your note..."
      @input="() => {}"
      aria-label="Note content"
    ></textarea>
  </section>

  <section class="empty" v-else>
    <div class="empty-card">
      <div class="emoji">🌊</div>
      <h2>No note selected</h2>
      <p>Create a new note to get started.</p>
      <button class="btn primary" @click="store.createNote()">Create Note</button>
    </div>
  </section>
</template>

<style scoped>
.editor {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border-bottom: 1px solid rgba(17,24,39,0.06);
  background: linear-gradient(180deg, rgba(249,250,251,1), rgba(255,255,255,0.8));
}

.title-input {
  font-size: 18px;
  font-weight: 700;
  border: none;
  outline: none;
  background: transparent;
  color: #111827;
  min-width: 240px;
}

.right {
  display: flex;
  gap: 8px;
  align-items: center;
}

.saved {
  color: #10b981;
  font-weight: 700;
  margin-right: 8px;
}

.btn {
  border: 1px solid rgba(17,24,39,0.08);
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  font-weight: 700;
  background: #ffffff;
  color: #111827;
  transition: transform .08s ease, box-shadow .2s ease, background .2s ease;
  box-shadow: 0 4px 10px rgba(17,24,39,0.05);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn.primary {
  background: linear-gradient(135deg, #2563EB, #3B82F6);
  border-color: rgba(37,99,235,0.4);
  color: white;
  box-shadow: 0 10px 20px rgba(37,99,235,0.35);
}

.btn.warn {
  background: linear-gradient(135deg, #F59E0B, #fbbf24);
  border-color: #f59e0b;
  color: #111827;
}

.btn.danger {
  background: #EF4444;
  color: white;
  border-color: #dc2626;
  box-shadow: 0 10px 18px rgba(239,68,68,0.35);
}

.btn.neutral {
  background: #ffffff;
}

.content {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
  padding: 16px;
  font-size: 16px;
  line-height: 1.6;
  color: #111827;
  background: #ffffff;
}

.empty {
  height: 100%;
  display: grid;
  place-items: center;
  padding: 24px;
}

.empty-card {
  text-align: center;
  background: #ffffff;
  border: 1px solid rgba(17,24,39,0.06);
  border-radius: 16px;
  padding: 32px 24px;
  box-shadow: 0 10px 25px rgba(17,24,39,0.08), 0 2px 6px rgba(17,24,39,0.04);
}

.empty-card h2 {
  margin-top: 8px;
  color: #111827;
}

.empty-card p {
  color: #6b7280;
  margin: 6px 0 12px;
}

.emoji {
  font-size: 36px;
}
</style>
