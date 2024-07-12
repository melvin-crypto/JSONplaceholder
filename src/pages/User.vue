<template>
  <div class="user-page">
    <h1>Liste des Utilisateurs</h1>
    <button class="btn btn-primary" @click="fetchUsers">Charger les utilisateurs</button>
    <button class="btn btn-danger" @click="cancelRequest" v-if="loading">Annuler</button>
    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>
    
    <table v-if="!loading && !error && users.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            {{ user.address.street }}, {{ user.address.suite }},
            {{ user.address.city }}, {{ user.address.zipcode }} <br />
            Lat: {{ user.address.geo.lat }}, Lng: {{ user.address.geo.lng }}
          </td>
          <td>{{ user.phone }}</td>
          <td>{{ user.website }}</td>
          <td>
            {{ user.company.name }} <br />
            {{ user.company.catchPhrase }} <br />
            {{ user.company.bs }}
          </td>
          <td>
            <router-link :to="'/posts?userid=' + user.id" class="action-link">Voir les Posts</router-link>
            <router-link :to="'/todos?userid=' + user.id" class="action-link">Voir les Todos</router-link>
            <router-link :to="'/albums?userid=' + user.id" class="action-link">Voir les Albums</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Users } from '../composables/users';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { users, loading, error, fetchUsers, fetchUserById, cancelRequest } = Users();
const route = useRoute();

onMounted(() => {
  const userId = parseInt(route.query.userid as string);
  if (!isNaN(userId)) {
    fetchUserById(userId);
  } else {
    Users();
  }
});
</script>

<style scoped>
.user-page {
  margin: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.user-page table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.user-page th, .user-page td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.user-page th {
  background-color: #f2f2f2;
}

.user-page .btn {
  margin-right: 10px;
}
</style>
