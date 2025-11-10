<template>
  <div>
    <form @submit.prevent="addTodo" class="add-todo-form">
      <input v-model="newTodoTask" placeholder="Add a new task" required />
      <button type="submit">Add</button>
    </form>

    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" :class="{ completed: todo.completed }">
        <input type="checkbox" :checked="todo.completed" @change="toggleTodoCompletion(todo)" />
        <span v-if="editingTodoId !== todo.id" @dblclick="editTodo(todo)">{{ todo.task }}</span>
        <input v-else type="text" v-model="todo.task" @blur="updateTodo(todo)" @keyup.enter="updateTodo(todo)" />
        <button @click="deleteTodo(todo.id)" class="delete-btn">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiClient from '../api';

const todos = ref([]);
const newTodoTask = ref('');
const editingTodoId = ref(null);

const fetchTodos = async () => {
  try {
    const response = await apiClient.get('/todos');
    todos.value = response.data;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
  }
};

const addTodo = async () => {
  if (!newTodoTask.value.trim()) return;
  try {
    const response = await apiClient.post('/todos', {
      task: newTodoTask.value,
      completed: false,
    });
    todos.value.push(response.data);
    newTodoTask.value = '';
  } catch (error) {
    console.error('Failed to add todo:', error);
  }
};

const editTodo = (todo) => {
  editingTodoId.value = todo.id;
};

const updateTodo = async (todo) => {
  editingTodoId.value = null;
  try {
    const response = await apiClient.patch(`/todos/${todo.id}`, {
      task: todo.task,
    });
    const index = todos.value.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      todos.value[index] = response.data;
    }
  } catch (error) {
    console.error('Failed to update todo:', error);
  }
};

const toggleTodoCompletion = async (todo) => {
  try {
    const response = await apiClient.patch(`/todos/${todo.id}`, {
      completed: !todo.completed,
    });
    const index = todos.value.findIndex(t => t.id === todo.id);
    if (index !== -1) {
      todos.value[index] = response.data;
    }
  } catch (error) {
    console.error('Failed to update todo:', error);
  }
};

const deleteTodo = async (id) => {
  try {
    await apiClient.delete(`/todos/${id}`);
    todos.value = todos.value.filter(todo => todo.id !== id);
  } catch (error) {
    console.error('Failed to delete todo:', error);
  }
};

onMounted(() => {
  fetchTodos();
});
</script>

<style scoped>
.add-todo-form {
  display: flex;
  margin-bottom: 1rem;
}

.add-todo-form input {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-todo-form button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #4f46e5;
  color: white;
  border-radius: 4px;
  margin-left: 0.5rem;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
}

.todo-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.todo-list li.completed span {
  text-decoration: line-through;
  color: #999;
}

.todo-list li span {
  cursor: pointer;
}

.delete-btn {
  padding: 0.25rem 0.5rem;
  border: none;
  background-color: #ef4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>