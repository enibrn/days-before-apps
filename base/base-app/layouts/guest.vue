<template>
  <div class="layout guest">
    <header class="layout-header">
      <h1>Benvenuto sulla Landing Page</h1>
    </header>
    <main class="layout-main">
      <slot />
    </main>
    <footer class="layout-footer">
      <p>&copy; 2023 La Tua Azienda. Tutti i diritti riservati.</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #121212; /* Colore di sfondo dark */
  color: #e0e0e0; /* Colore testo chiaro */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.layout-header,
.layout-footer {
  padding: 1rem;
  background-color: #1e1e1e;
  text-align: center;
}

.layout-main {
  flex: 1;
  padding: 2rem;
}
</style>