<template>
  <div class="post-page">
    <h1>Liste des Posts</h1>
    <button class="btn btn-primary" @click="fetchPosts">Charger les posts</button>
    <button class="btn btn-danger" @click="cancelRequest" v-if="loading">Annuler</button>
    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>
    <table v-if="posts.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Body</th>
          <th>User ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.body }}</td>
          <td>
            <router-link :to="'/users?userid=' + post.userId" class="action-link">Voir l'Utilisateur</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Posts } from '../composables/posts';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const { posts, loading, error, fetchPosts, fetchPostsByUserId, fetchPostById, cancelRequest } = Posts();
const route = useRoute();

onMounted(() => {
  const userId = parseInt(route.query.userid as string);
  const postId = parseInt(route.query.postid as string);
  if (!isNaN(userId)) {
    fetchPostsByUserId(userId);
  } else if (!isNaN(postId)) {
    fetchPostById(postId);
  }
});
</script>

<style scoped>
.post-page {
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.post-page table {
  width: 100%;
  border-collapse: collapse;
}

.post-page th,
.post-page td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.post-page th {
  background-color: #f2f2f2;
}

.post-page .btn {
  margin-right: 10px;
}

.post-page a:hover {
  text-decoration: underline;
}
</style>
