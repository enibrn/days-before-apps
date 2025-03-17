import { useAuth } from '~/composables/useAuth';

export default defineNuxtRouteMiddleware((to, from) => {
  // Redirect to login page if user is not authenticated
  const { isAuthenticated, user } = useAuth();
  console.log('user defineNuxtRouteMiddleware', user.value);
  console.log('isAuthenticated defineNuxtRouteMiddleware', isAuthenticated.value);
  if (!isAuthenticated.value) {
    return navigateTo('/login');
  }
});