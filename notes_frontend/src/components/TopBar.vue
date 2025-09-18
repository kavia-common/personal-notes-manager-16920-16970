<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNotesStore } from '@/stores/notes'

const store = useNotesStore()
const query = ref(store.search)

watch(query, (q) => {
  store.search = q
})
</script>

<template>
  <header class="topbar" role="banner" aria-label="Top navigation bar">
    <div class="brand">
      <div class="logo">📝</div>
      <div class="title">
        <h1>Personal Notes</h1>
        <p>Organize your thoughts</p>
      </div>
    </div>

    <div class="actions">
      <div class="search">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M21 21l-4.35-4.35" stroke="#6b7280" stroke-width="2" stroke-linecap="round"/>
          <circle cx="11" cy="11" r="7" stroke="#6b7280" stroke-width="2"/>
        </svg>
        <input
          v-model="query"
          class="search-input"
          type="search"
          placeholder="Search notes..."
          aria-label="Search notes"
        />
      </div>
      <button class="btn primary" @click="store.createNote()">
        <span>New Note</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px clamp(12px, 4vw, 24px);
  background: linear-gradient(90deg, rgba(37,99,235,0.12), rgba(255,255,255,1));
  border-bottom: 1px solid rgba(17,24,39,0.06);
  box-shadow: 0 6px 18px rgba(17,24,39,0.06);
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563EB, #60A5FA);
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 20px;
  box-shadow: 0 8px 16px rgba(37,99,235,0.25);
}

.title h1 {
  font-size: 16px;
  color: #111827;
  margin: 0;
  font-weight: 700;
}

.title p {
  font-size: 12px;
  margin: 0;
  color: #6b7280;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 1px solid rgba(17,24,39,0.08);
  padding: 8px 12px;
  border-radius: 12px;
  min-width: 240px;
  box-shadow: 0 4px 10px rgba(17,24,39,0.05) inset, 0 8px 18px rgba(17,24,39,0.04);
}

.search-input {
  border: none;
  outline: none;
  min-width: 0;
  width: 100%;
  color: #111827;
  background: transparent;
}

.btn {
  border: none;
  border-radius: 12px;
  padding: 10px 14px;
  cursor: pointer;
  font-weight: 600;
  transition: transform .08s ease, box-shadow .2s ease, background .2s ease;
}

.btn.primary {
  background: linear-gradient(135deg, #2563EB, #3B82F6);
  color: #fff;
  box-shadow: 0 10px 20px rgba(37,99,235,0.35);
}

.btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 26px rgba(37,99,235,0.45);
}

.btn:active {
  transform: translateY(0);
}
</style>
