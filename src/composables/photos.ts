import { ref } from 'vue';
import { z } from 'zod';

const PhotoSchema = z.object({
  albumId: z.number(),
  id: z.number(),
  title: z.string(),
  url: z.string(),
  thumbnailUrl: z.string(),
});

interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export function Photos() {
  const photos = ref<Photo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  let controller: AbortController | null = null;

  const fetchPhotos = async () => {
    loading.value = true;
    error.value = null;
    controller = new AbortController();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(PhotoSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      photos.value = parsedData.data;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        error.value = 'Request was aborted';
      } else {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const fetchPhotosByAlbumId = async (albumId: number) => {
    loading.value = true;
    error.value = null;
    controller = new AbortController();

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`, {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(PhotoSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      photos.value = parsedData.data;
    } catch (err: any) {
      if (err.name === 'AbortError') {
        error.value = 'Request was aborted';
      } else {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const cancelRequest = () => {
    if (controller) {
      controller.abort();
      controller = null;
    }
  };

  return {
    photos,
    loading,
    error,
    fetchPhotos,
    fetchPhotosByAlbumId,
    cancelRequest,
  };
}
