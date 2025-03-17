<template>
  <div class="signup-container">
    <form @submit.prevent="handleSignup">
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
      <button type="submit">Registrati</button>
      <p>Hai già un account? <nuxt-link to="/login">Accedi</nuxt-link></p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useErrorMgmt } from '~/composables/useErrorMgmt';

definePageMeta({ layout: 'guest'});

const { signup } = useAuth();
const { alertError } = useErrorMgmt();

const email = ref('');
const password = ref('');

async function handleSignup() {
  const error = await signup(email.value, password.value);
  if (error) {
    alertError(error);
    return;
  }

  navigateTo('/');
}
</script>

<style scoped>
.signup-container {
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