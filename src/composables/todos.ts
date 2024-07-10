import { ref } from 'vue';
import { z } from 'zod';

const TodoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const todos = ref<Todo[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const controller = new AbortController();

  const fetchTodos = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(TodoSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      todos.value = parsedData.data;
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

  const fetchTodosByUserId = async (userId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`, {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(TodoSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      todos.value = parsedData.data;
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
    todos,
    loading,
    error,
    fetchTodos,
    fetchTodosByUserId,
    cancelRequest,
  };
}
