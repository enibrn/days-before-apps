<template>
  <div class="container">
    <h1>Benvenuto su Base App</h1>
    <p>Questa è la tua applicazione base per iniziare a sviluppare con Nuxt.js</p>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
</script>
