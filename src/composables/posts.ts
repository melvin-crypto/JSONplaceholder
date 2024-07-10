import { ref } from 'vue';
import { z } from 'zod';

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function usePosts() {
  const posts = ref<Post[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const controller = new AbortController();

  const fetchPosts = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(PostSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      posts.value = parsedData.data;
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

  const fetchPostsByUserId = async (userId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(PostSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      posts.value = parsedData.data;
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
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostsByUserId,
    cancelRequest,
  };
}
