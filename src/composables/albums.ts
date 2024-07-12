import { ref } from 'vue';
import { z } from 'zod';

const AlbumSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
});

interface Album {
  userId: number;
  id: number;
  title: string;
}

export function Albums() {
  const albums = ref<Album[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const controller = new AbortController();

  const fetchAlbums = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/albums', {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(AlbumSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      albums.value = parsedData.data;
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

  const fetchAlbumsByUserId = async (userId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`, {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(AlbumSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      albums.value = parsedData.data;
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
    controller.abort();
  };

  return {
    albums,
    loading,
    error,
    fetchAlbums,
    fetchAlbumsByUserId,
    cancelRequest,
  };
}
