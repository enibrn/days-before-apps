<template>
  <div v-if="isAuthenticated">
    <p>Benvenuto, {{ user?.email }}!</p>
    <p>Sessione corrente: {{ currentSession }}</p>
    <button @click="logout">Logout</button>
    <form>
      <h3>Modifica email e password:</h3>
      <input
        v-model="newEmail"
        placeholder="Nuova email"
      />
      <input
        v-model="pass"
        type="password"
        placeholder="Password attuale"
      />
      <input
        v-model="newPass"
        type="password"
        placeholder="Nuova password"
      />
      <button
        type="button"
        @click="handleUpdateEmail()"
      >Aggiorna email</button>
      <button
        type="button"
        @click="handleUpdatePassword()"
      >Aggiorna password</button>
    </form>
  </div>
  <div v-else>
    <form>
      <h3>Accedi oppure registrati:</h3>
      <input
        v-model="newEmail"
        placeholder="Email"
      />
      <input
        v-model="newPass"
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

<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const {
  user,
  currentSession,
  isAuthenticated,
  init,
  login,
  logout,
  signup,
  updateEmail,
  updatePassword
} = useAuth();

const newEmail = ref('');
const pass = ref('');
const newPass = ref('');

onMounted(() => {
  init();
});

const handleLogin = async () => {
  await login(newEmail.value, newPass.value);
};

const handleRegister = async () => {
  await signup(newEmail.value, newPass.value);
};

const handleUpdateEmail = async () => {
  await updateEmail(newEmail.value, pass.value);
};

const handleUpdatePassword = async () => {
  await updatePassword(pass.value, newPass.value);
};

</script>
