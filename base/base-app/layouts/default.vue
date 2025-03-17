<template>
  <div class="container">
    <!-- Navbar -->
    <header>
      <h1>Base App</h1>
      <nav>
        <button @click="navigateTo('/')">Home</button>
        <button @click="navigateTo('/profile')">Profilo</button>
        <button @click="handleLogout">Esci</button>
      </nav>
    </header>

    <!-- Layout con Sidebar e Content -->
    <div class="row">
      <aside class="column">
        <h2>Pagine dinamiche</h2>
        <ul>
          <li><a href="#">Link 1</a></li>
          <li><a href="#">Link 2</a></li>
          <li><a href="#">Link 3</a></li>
        </ul>
      </aside>
      <main class="column column-full">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useErrorMgmt } from '~/composables/useErrorMgmt';

const { logout } = useAuth();
const { alertError } = useErrorMgmt();

async function handleLogout() {
  const err = await logout();
  if (err) {
    alertError(err);
  }
}
</script>

<style scoped>
/* Base styles */
.container {
  padding: 20px;
  background-color: #fff;
  color: #000;
}

/* Navbar styles */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f8f8;
  padding: 10px 20px;
}

nav a {
  margin-right: 15px;
  text-decoration: none;
  color: inherit;
}

nav button {
  padding: 5px 10px;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
}

/* Layout styles */
.row {
  display: flex;
  margin-top: 20px;
}
.column {
  flex: 1;
  padding: 10px;
}
.column-full {
  flex: 3;
}

aside {
  background-color: #f0f0f0;
}

/* Dark mode styles */
@media (prefers-color-scheme: dark) {
  .container {
    background-color: #121212;
    color: #e0e0e0;
  }

  header {
    background-color: #1e1e1e;
  }

  nav a {
    color: #e0e0e0;
  }

  nav button {
    background-color: #333;
    color: #fff;
  }

  aside {
    background-color: #1e1e1e;
  }
}
</style>