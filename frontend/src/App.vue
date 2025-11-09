<template>
  <div id="app">
    <nav>
      <router-link to="/">Fullstack App</router-link>
      <div class="nav-links">
        <template v-if="!isLoggedIn">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </template>
        <template v-else>
          <router-link to="/">My Profile</router-link>
          <router-link to="/random-profile">Random Profile</router-link>
          <button @click="logout">Logout</button>
        </template>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

const logout = () => {
  localStorage.removeItem('token');
  checkLoginStatus();
  router.push('/login');
};

onMounted(() => {
  checkLoginStatus();
});

watch(() => router.currentRoute.value, () => {
  checkLoginStatus();
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

#app {
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f0f2f5;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

nav a {
  font-weight: 600;
  color: #2c3e50;
  text-decoration: none;
}

.nav-links a, .nav-links button {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #555;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover, .nav-links button:hover {
  color: #4f46e5;
}

.nav-links button {
  border: none;
  background: none;
  font-size: inherit;
  font-family: inherit;
}

main {
  padding: 2rem;
}
</style>