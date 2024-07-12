<template>
  <div class="albums-page">
    <h1>Liste des Albums</h1>
    <button class="btn btn-primary" @click="fetchAlbums">Charger tous les albums</button>
    <button class="btn btn-danger" @click="cancelRequest" v-if="loading">Annuler</button>
    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>
    <table v-if="albums.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="album in albums" :key="album.id">
          <td>{{ album.id }}</td>
          <td>{{ album.title }}</td>
          <router-link :to="'/users?userid=' + album.userId" class="action-link">Voir l'Utilisateur</router-link>
        </tr> 
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Albums } from '../composables/albums';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const { albums, loading, error, fetchAlbums, fetchAlbumsByUserId, cancelRequest } = Albums();
const route = useRoute();

onMounted(() => {
  const userId = parseInt(route.query.userid as string);
  if (!isNaN(userId)) {
    fetchAlbumsByUserId(userId);
  } else {
     Albums();
  }
});
</script>

<style scoped>
.albums-page {
  margin: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.albums-page table {
  width: 100%;
  border-collapse: collapse;
}

.albums-page th,
.albums-page td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.albums-page th {
  background-color: #f2f2f2;
}
</style>
