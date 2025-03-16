<template>
  <nav>
    <h3>Base App</h3>
    <div v-if="isAuthenticated">
      <p>Welcome {{ user.email }}</p>
      <button @click="logout"></button>
    </div>
    <NuxtLink
      v-else
      href="/login"
    >Login</NuxtLink>
  </nav>
</template>

<script setup>
const {
  user,
  isAuthenticated,
  logout,
} = useAuth();
</script>