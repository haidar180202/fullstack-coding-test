<template>
  <div class="profile-container">
    <div class="main-content">
      <div class="tinder-card-container">
        <div v-if="users.length" class="card-stack" :class="{ 'has-next': canGoNext, 'has-prev': currentIndex > 0 }">
          <div
            v-for="(user, index) in users"
            :key="user.id"
            class="tinder-card"
            :style="getCardStyle(index)"
          >
            <div class="profile-picture-wrapper">
              <img :src="user.profilePicture" alt="Profile Picture" class="profile-picture" />
            </div>
            <div class="user-info">
              <h2>{{ user.name }}</h2>
              <p>{{ user.email }}</p>
            </div>
          </div>
        </div>
        <div v-else class="loading-message">
          <p>Loading random users...</p>
        </div>
      </div>

      <div v-if="users.length" class="navigation-buttons">
        <button @click="prevCard" :disabled="currentIndex === 0">‹</button>
        <button @click="nextCard" :disabled="!canGoNext">›</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const users = ref([]);
const currentIndex = ref(0);
const currentPage = ref(1);
const hasNextPage = ref(true);
const isLoading = ref(false);

const fetchUsers = async (page) => {
  if (isLoading.value || !hasNextPage.value) return;
  isLoading.value = true;

  try {
    const response = await fetch(`http://localhost:8000/api/users?page=${page}`);
    const data = await response.json();
    if (response.ok) {
      const newUsers = data.data.map(u => ({
        ...u,
        profilePicture: `https://picsum.photos/seed/${u.id}/400`,
      }));
      users.value = [...users.value, ...newUsers];
      hasNextPage.value = data.next_page_url !== null;
      currentPage.value = page;
    }
  } catch (error) {
    console.error('Failed to fetch random users:', error);
  } finally {
    isLoading.value = false;
  }
};

const nextCard = () => {
  if (currentIndex.value < users.value.length - 1) {
    currentIndex.value++;
    // Pre-fetch next page when user is 2 cards away from the end
    if (users.value.length > 1 && currentIndex.value === users.value.length - 2 && hasNextPage.value) {
      fetchUsers(currentPage.value + 1);
    }
  }
};

const prevCard = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const canGoNext = computed(() => {
  return currentIndex.value < users.value.length - 1;
});

const getCardStyle = (index) => {
  const offset = index - currentIndex.value;

  if (offset < 0) { // Cards that have been swiped
    return {
      transform: `translateX(-150%) rotate(-30deg)`,
      opacity: 0,
      zIndex: users.value.length - index,
    };
  }

  if (offset === 0) { // Current card
    return {
      transform: 'translateX(0) rotate(0) scale(1)',
      opacity: 1,
      zIndex: users.value.length,
    };
  }

  if (offset > 0 && offset <= 2) { // Next 2 cards in the stack
    return {
      transform: `translateX(0) translateY(${offset * 15}px) scale(${1 - offset * 0.05})`,
      opacity: 1,
      zIndex: users.value.length - offset,
    };
  }

  // Other cards further in the stack are hidden
  return {
    transform: 'translateX(0) scale(0.5)',
    opacity: 0,
    zIndex: users.value.length - index,
  };
};

onMounted(() => {
  fetchUsers(currentPage.value);
});
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 86vh;
  background-color: #f0f2f5;
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-5vh);
}

.tinder-card-container {
  position: relative;
  width: 450px;
  height: 600px;
}

.card-stack {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;
}

.tinder-card {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform, opacity;
}

.profile-picture-wrapper {
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
}

.profile-picture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info {
  text-align: center;
}

.user-info h2 {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 600;
}

.user-info p {
  margin: 5px 0 0;
  color: #666;
  font-size: 1rem;
}

.navigation-buttons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.navigation-buttons button {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid #ddd;
  background-color: white;
  font-size: 2rem;
  font-weight: bold;
  color: #777;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navigation-buttons button:hover:not(:disabled) {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  color: #4f46e5;
  border-color: #4f46e5;
}

.navigation-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-message {
  color: #666;
  font-size: 1.2rem;
  text-align: center;
  padding-top: 275px;
}

.card-stack::before,
.card-stack::after {
  display: none;
}
</style>