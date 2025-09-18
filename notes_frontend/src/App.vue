<script setup lang="ts">
import TopBar from './components/TopBar.vue'
import SidebarNotes from './components/SidebarNotes.vue'
import NoteEditor from './components/NoteEditor.vue'
</script>

<template>
  <div class="app-root">
    <TopBar />
    <div class="layout">
      <SidebarNotes class="sidebar" />
      <main class="content">
        <NoteEditor />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(37,99,235,0.06), rgba(249,250,251,1));
}

.layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 16px;
  padding: 16px;
  max-width: 1400px;
  margin: 0 auto;
}

.sidebar {
  min-height: calc(100vh - 96px);
}

.content {
  background: #ffffff;
  border-radius: 14px;
  box-shadow:
    0 10px 25px rgba(17, 24, 39, 0.08),
    0 2px 6px rgba(17, 24, 39, 0.04);
  overflow: hidden;
  min-height: calc(100vh - 96px);
  border: 1px solid rgba(17,24,39,0.06);
}

@media (max-width: 920px) {
  .layout {
    grid-template-columns: 1fr;
  }
  .sidebar {
    min-height: auto;
    order: 2;
  }
  .content {
    order: 1;
  }
}
</style>
