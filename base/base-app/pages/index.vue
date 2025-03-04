<template>
  <div v-if="isAuthenticated">
    <p>Benvenuto, {{ user.email }}!</p>
    <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <form>
      <h3>Accedi oppure registrati:</h3>
      <input
        v-model="email"
        placeholder="Email"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <button
        type="button"
        @click="handleLogin"
      >Login</button>
      <button
        type="button"
        @click="handleRegister"
      >Register</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDummyAuth } from '../../baases/src/auth/composables/useDummyAuth';

const { user, isAuthenticated, login, logout, register } = useDummyAuth();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    await login(email.value, password.value);
    alert('Login avvenuto con successo!');
  } catch (error) {
    alert(error.message || 'Errore durante il login.');
  }
};

const handleRegister = async () => {
  try {
    await register(email.value, password.value);
    alert('Registrazione completata con successo!');
  } catch (error) {
    alert(error.message || 'Errore durante la registrazione.');
  }
};
</script>
