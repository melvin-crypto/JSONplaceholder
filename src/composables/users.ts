import { ref } from 'vue';
import { z } from 'zod';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  address: z.object({
    street: z.string(),
    suite: z.string(),
    city: z.string(),
    zipcode: z.string(),
    geo: z.object({
      lat: z.string(),
      lng: z.string(),
    }),
  }),
  phone: z.string(),
  website: z.string(),
  company: z.object({
    name: z.string(),
    catchPhrase: z.string(),
    bs: z.string(),
  }),
});

export function Users() {
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);
  let controller = null;

  const fetchUsers = async () => {
    loading.value = true;
    error.value = null;
    controller = new AbortController();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        signal: controller.signal,
      });
      const data = await response.json();

      const parsedData = z.array(UserSchema).safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      users.value = parsedData.data;
    } catch (err) {
      if (err.name === 'AbortError') {
        error.value = 'Request was aborted';
      } else {
        error.value = err.message;
      }
    } finally {
      loading.value = false;
    }
  };

  const fetchUserById = async (userId: number) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      const data = await response.json();

      const parsedData = UserSchema.safeParse(data);

      if (!parsedData.success) {
        throw new Error('Invalid data structure');
      }

      users.value = [parsedData.data];
    } catch (err) {
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
    users,
    loading,
    error,
    fetchUsers,
    fetchUserById,
    cancelRequest,
  };
}
