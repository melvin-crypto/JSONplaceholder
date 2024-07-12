<template>
  <div class="comment-page">
    <h1>Liste des Commentaires</h1>
    <button class="btn btn-primary" @click="fetchComments">Charger les commentaires</button>
    <button class="btn btn-danger" @click="cancelRequest" v-if="loading">Annuler</button>
    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>
    <table v-if="!loading && !error && comments.length > 0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Body</th>
          <th>Post ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments" :key="comment.id">
          <td>{{ comment.id }}</td>
          <td>{{ comment.name }}</td>
          <td>{{ comment.email }}</td>
          <td>{{ comment.body }}</td>
          <td>
            <router-link :to="'/posts?postid=' + comment.postId" class="action-link">Voir le Post</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Comments } from '../composables/comments';

const { comments, loading, error, fetchComments, cancelRequest } = Comments();
</script>

<style scoped>
.comment-page {
  margin: 20px;
  padding: 20px;
  background-color: #fefefe;
  border: 1px solid #eee;
  border-radius: 5px;
}

.comment-page table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.comment-page th,
.comment-page td {
  border: 1px solid #eee;
  padding: 8px;
  text-align: left;
}

.comment-page th {
  background-color: #f2f2f2;
}

.comment-page .btn {
  margin-right: 10px;
}

.comment-page a:hover {
  text-decoration: underline;
}
</style>
