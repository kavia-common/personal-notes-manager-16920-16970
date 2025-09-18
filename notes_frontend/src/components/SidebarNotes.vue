<script setup lang="ts">
import { computed } from 'vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const items = computed(() => store.filteredNotes)
const selectedId = computed(() => store.selectedId)
</script>

<template>
  <aside class="sidebar" aria-label="Notes navigation sidebar">
    <div class="panel">
      <div class="panel-header">
        <span class="panel-title">Your Notes</span>
        <button class="btn secondary" @click="store.createNote('New note')">+ New</button>
      </div>

      <ul class="list" role="listbox" :aria-activedescendant="selectedId || undefined">
        <li
          v-for="n in items"
          :key="n.id"
          class="list-item"
          :class="{ active: n.id === selectedId }"
          role="option"
          @click="store.select(n.id)"
        >
          <div class="meta">
            <div class="title-row">
              <span class="title">{{ n.title || 'Untitled' }}</span>
              <span
                v-if="n.pinned"
                class="chip chip-amber"
                title="Pinned"
                aria-label="Pinned"
              >PIN</span>
            </div>
            <p class="preview">
              {{ n.content ? n.content.slice(0, 80) : 'No content yet...' }}
            </p>
          </div>
          <div class="row-actions" @click.stop>
            <button class="icon-btn" :title="n.pinned ? 'Unpin' : 'Pin'" @click="store.togglePin(n.id)">
              📌
            </button>
            <button class="icon-btn warn" title="Archive" @click="store.archive(n.id)">
              🗂️
            </button>
            <button class="icon-btn danger" title="Delete" @click="store.remove(n.id)">
              🗑️
            </button>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 100%;
}

.panel {
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid rgba(17,24,39,0.06);
  box-shadow:
    0 10px 25px rgba(17,24,39,0.08),
    0 2px 6px rgba(17,24,39,0.04);
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 12px;
  border-bottom: 1px solid rgba(17,24,39,0.06);
  background: linear-gradient(180deg, rgba(37,99,235,0.06), rgba(255,255,255,1));
}

.panel-title {
  color: #111827;
  font-weight: 700;
  font-size: 14px;
}

.btn.secondary {
  border: none;
  background: linear-gradient(135deg, #F59E0B, #fbbf24);
  color: #111827;
  font-weight: 700;
  border-radius: 10px;
  padding: 8px 10px;
  cursor: pointer;
  box-shadow: 0 8px 16px rgba(245,158,11,0.35);
}

.list {
  list-style: none;
  margin: 0;
  padding: 6px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
}

.list-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px;
  padding: 12px 10px;
  border-radius: 12px;
  border: 1px solid transparent;
  transition: background .15s ease, border-color .15s ease, transform .05s ease;
  cursor: pointer;
}

.list-item:hover {
  background: #f9fafb;
  border-color: rgba(17,24,39,0.06);
}

.list-item.active {
  background: linear-gradient(180deg, rgba(37,99,235,0.08), rgba(249,250,251,0.9));
  border-color: rgba(37,99,235,0.35);
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(37,99,235,0.15);
}

.meta .title-row {
  display: flex;
  gap: 8px;
  align-items: center;
}

.title {
  color: #111827;
  font-weight: 700;
  font-size: 14px;
}

.preview {
  color: #6b7280;
  font-size: 12px;
  margin-top: 4px;
}

.row-actions {
  display: flex;
  gap: 6px;
  align-items: center;
}

.icon-btn {
  border: none;
  background: #ffffff;
  border-radius: 10px;
  padding: 6px 8px;
  cursor: pointer;
  border: 1px solid rgba(17,24,39,0.06);
  box-shadow: 0 4px 10px rgba(17,24,39,0.05);
}

.icon-btn:hover {
  background: #f3f4f6;
}

.icon-btn.warn {
  color: #92400e;
  background: #fff7ed;
  border-color: #fed7aa;
}

.icon-btn.danger {
  color: #991b1b;
  background: #fef2f2;
  border-color: #fecaca;
}

.chip {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 999px;
  border: 1px solid rgba(17,24,39,0.08);
}

.chip-amber {
  background: #fffbeb;
  color: #92400e;
  border-color: #f59e0b;
}
</style>
