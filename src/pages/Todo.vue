<template>
  <div class="todos-page">
    <h1>Liste des Todos</h1>
    <button class="btn btn-primary" @click="fetchTodos">Charger les todos</button>
    <button class="btn btn-danger" @click="cancelRequest" v-if="loading">Annuler</button>
    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>
    <table v-if="todos.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Completed</th>
          <th>User Id</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td>{{ todo.id }}</td>
          <td>{{ todo.title }}</td>
          <td>{{ todo.completed ? 'Oui' : 'Non' }}</td>
          <td>
            <router-link :to="'/users?userid=' + todo.userId" class="action-link">Voir l'Utilisateur</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Todos } from '../composables/todos';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { todos, loading, error, fetchTodos, fetchTodosByUserId, cancelRequest } = Todos();
const route = useRoute();

onMounted(() => {
  const userId = parseInt(route.query.userid as string);
  if (!isNaN(userId)) {
    fetchTodosByUserId(userId);
  } else {
    Todos();
  }
});
</script>

<style scoped>
.todos-page {
  margin: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.todos-page table {
  width: 100%;
  border-collapse: collapse;
}

.todos-page th,
.todos-page td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.todos-page th {
  background-color: #f2f2f2;
}

.todos-page .btn {
  margin-right: 10px;
}
</style>
