<template>
  <div>
    <div v-if="isSignUp">
      <AuthForm
        :handle-submit="handleSignup"
        submit-type="Sign Up"
      />
      <button @click="isSignUp = false">Already have an account?</button>
    </div>
    <div v-else>
      <AuthForm
        :handle-submit="handleLogin"
        submit-type="Login"
      />
      <button @click="isSignUp = true">Don't have an account?</button>
    </div>
  </div>
</template>

<script setup>
const {
  login,
  signup
} = useAuth();

const { alertError } = useErrorMgmt();

const isSignUp = ref(false);

async function handleLogin(event) {
  doAuthOperation(event, login);
}

async function handleSignup(event) {
  doAuthOperation(event, signup);
}

async function doAuthOperation(event, operation) {
  const form = event.target;
  const formData = new FormData(form);
  const error = await operation(formData.get('email'), formData.get('password'));
  if (error) {
    alertError(error);
    return;
  }

  form.reset();
  navigateTo('/');
}

</script>