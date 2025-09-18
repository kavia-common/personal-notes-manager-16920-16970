<template>
  <div class="about">
    <div class="card">
      <h1>About</h1>
      <p>Personal Notes Manager — built with Vue 3, Vite, and Pinia.</p>
      <p>Theme: Ocean Professional (blue & amber accents).</p>
    </div>
  </div>
</template>

<style scoped>
.about {
  min-height: calc(100vh - 80px);
  display: grid;
  place-items: center;
  padding: 24px;
}
.card {
  background: #ffffff;
  border: 1px solid rgba(17,24,39,0.06);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(17,24,39,0.08), 0 2px 6px rgba(17,24,39,0.04);
  max-width: 680px;
}
h1 {
  color: #111827;
  margin-bottom: 8px;
}
p {
  color: #6b7280;
}
</style>
