<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Inserisci la tua email"
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Inserisci la tua password"
        />
      </div>
      <button type="submit">Accedi</button>
      <p>Non hai un account? <nuxt-link to="/signup">Registrati</nuxt-link></p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useErrorMgmt } from '~/composables/useErrorMgmt';

definePageMeta({ layout: 'guest'});

const { login } = useAuth();
const { alertError } = useErrorMgmt();

const email = ref('');
const password = ref('');

async function handleLogin() {
  console.log('email:', email.value);
  console.log('password:', password.value);
  const error = await login(email.value, password.value);
  if (error) {
    alertError(error);
    return;
  }

  navigateTo('/');
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  cursor: pointer;
}
</style>