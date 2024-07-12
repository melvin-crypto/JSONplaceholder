<template>
  <div class="photos-page">
    <h1>Liste des Photos</h1>
    <button class="btn btn-primary" @click="fetchPhotos">Charger les photos</button>
    <button class="btn btn-danger" @click="cancelRequest" v-if="loading">Annuler</button>
    <div v-if="loading">Chargement...</div>
    <div v-if="error">{{ error }}</div>
    <div class="photos-grid" v-if="photos.length > 0">
      <div v-for="photo in photos" :key="photo.id" class="photo-item" @click="viewAlbum(photo.albumId)">
        <img :src="photo.thumbnailUrl" :alt="photo.title" />
        <div class="photo-overlay">Voir l'album</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Photos } from '../composables/photos';
import { useRouter } from 'vue-router';

const { photos, loading, error, fetchPhotos, cancelRequest } = Photos();
const router = useRouter();

const viewAlbum = (albumId: number) => {
  router.push(`/albums?userid=${albumId}`);
};

</script>

<style scoped>
.photos-page {
  margin: 20px;
  padding: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.photos-page .photos-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.photos-page .photo-item {
  position: relative;
  width: 150px;
  height: 150px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.photos-page .photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.photos-page .photo-item .photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 5px;
}

.photos-page .photo-item:hover .photo-overlay {
  opacity: 1;
}
</style>
