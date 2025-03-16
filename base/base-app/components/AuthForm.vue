<template>
  <form @submit.prevent="handleSubmit">
    <ul>
      <li>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </li>
      <li>
        <input
          type="password"
          name="password"
          placeholder="Password"
        />
      </li>
      <li>
        <button
          type="button"
          @click="handleSubmit"
        >{{ submitType }}
        </button>
      </li>
    </ul>
  </form>
</template>

<script setup>
const props = defineProps({
  handleSubmit: {
    type: Function,
    required: true
  },
  submitType: {
    type: String,
    required: true
  }
})
</script>