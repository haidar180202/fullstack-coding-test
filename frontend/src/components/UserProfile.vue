<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="header">
        <h2>My Profile</h2>
        <p>Update your profile information.</p>
      </div>

      <div class="profile-picture-wrapper">
        <img v-if="user.profilePicture" :key="user.profilePicture" :src="user.profilePicture" alt="Profile Picture" class="profile-picture" />
        <div v-else class="profile-picture-placeholder">
          <span>No Image</span>
        </div>
      </div>

      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="user.name" @input="onInput" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="user.email" @input="onInput" />
        </div>
        <div class="form-group">
          <label for="password">New Password</label>
          <input type="password" id="password" v-model="user.password" @input="onInput" />
        </div>
        <div class="form-group">
          <label for="profilePicture">Profile Picture URL</label>
          <input type="text" id="profilePicture" v-model="user.profilePicture" @input="onInput" />
        </div>
        <div class="save-status" v-if="saveStatus">{{ saveStatus }}</div>
        <div v-if="showNotification" class="notification">
          {{ notificationMessage }}
        </div>
        <button type="button" @click="clearProfile" class="delete-button">Clear Profile</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';

const user = reactive({
  name: '',
  email: '',
  profilePicture: '',
  password: '',
});

const saveStatus = ref('');
const showNotification = ref(false);
const notificationMessage = ref('');
let debounceTimer = null;

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      user.name = data.name;
      user.email = data.email;
      user.profilePicture = data.profilePicture;
    }
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
};

const saveProfile = async () => {
  saveStatus.value = 'Saving...';
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/auth/profile', {
        method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        password: user.password,
      }),
    });

    if (response.ok) {
      setTimeout(() => {
        saveStatus.value = 'Saved!';
        setTimeout(() => (saveStatus.value = ''), 2000);
      }, 500);
    } else {
      saveStatus.value = 'Failed to save';
    }
  } catch (error) {
      saveStatus.value = 'Error';
    }
};

const onInput = (event) => {
  const { id } = event.target;
  if (id === 'email' || id === 'password') {
    notificationMessage.value = 'Changing the email or password will affect your login credentials.';
    showNotification.value = true;
  } else {
    showNotification.value = false;
  }

  saveStatus.value = 'Typing...';
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    saveProfile();
  }, 2000);
};

const clearProfile = async () => {
  if (!confirm('Are you sure you want to clear your name and profile picture?')) {
    return;
  }
  user.name = '';
  user.profilePicture = '';
  await saveProfile();
};

onMounted(() => {
  fetchProfile();
});
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 0.5rem;
  min-height: 85vh;
  background-color: #f0f2f5;
  font-family: 'Inter', sans-serif;
}

.profile-card {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.header h2 {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.header p {
  font-size: 1rem;
  color: #666;
  margin-top: 0.5rem;
}

.profile-picture-wrapper {
  margin: 2rem 0;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.profile-picture-placeholder {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
  background-color: #e9ecef;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #adb5bd;
  font-size: 0.875rem;
  border: 4px solid #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
}

input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.save-status {
  margin-top: 1rem;
  color: #666;
  font-style: italic;
}

.notification {
  margin-top: 1rem;
  padding: 10px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  color: #856404;
  border-radius: 4px;
  font-size: 0.9rem;
}

.delete-button {
  margin-top: 1rem;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #c82333;
}
</style>