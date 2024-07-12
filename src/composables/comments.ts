import { ref } from 'vue';
import { z } from 'zod';

const CommentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export function Comments() {
  const comments = ref<Comment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const controller = new AbortController();

  const fetchComments = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/comments', {
        signal: controller.signal,
      });
      const data = await response.json();

      // Validate data
      const parsedData = z.array(CommentSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      comments.value = parsedData.data;
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
    comments,
    loading,
    error,
    fetchComments,
    cancelRequest,
  };
}
