<template>
  <div class="photo-page">
    <h1>Liste des Photos</h1>
      <button class="btn btn-primary" @click="fetchPhotos">Charger les photos</button>
      <button class="btn btn-danger" @click="cancelRequest" v-if="loading">Annuler</button>
      <div v-if="loading">Chargement...</div>
      <div v-if="error">{{ error }}</div>
      <div class="photos-container" v-if="!loading && !error">
        <div v-for="photo in photos" :key="photo.id" class="photo">
          <img :src="photo.thumbnailUrl" alt="Photo {{ photo.id }}">
          <div>{{ photo.title }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { usePhotos } from '../composables/photos';
  
  const { photos, loading, error, fetchPhotos, cancelRequest } = usePhotos();
  </script>
  
  <style scoped>
  .photo-page {
  margin: 20px;
  padding: 20px;
  background-color: #e0e0e0;
  border: 1px solid #bbb;
  border-radius: 5px;
}
  .photos-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .photo {
    width: 200px;
    text-align: center;
  }
  
  .photo img {
    max-width: 100%;
    border-radius: 5px;
  }
  </style>
  