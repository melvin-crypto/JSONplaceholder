import { createRouter, createWebHistory } from 'vue-router';
import UsersPage from './pages/User.vue';
import PostsPage from './pages/Post.vue';
import CommentsPage from './pages/Comment.vue';
import PhotosPage from './pages/Photo.vue';
import AlbumPage from './pages/Album.vue';
import TodoPage from './pages/Todo.vue';

const routes = [
  { path: '/', component: UsersPage },
  { path: '/posts', component: PostsPage },
  { path: '/comments', component: CommentsPage },
  { path: '/photos', component: PhotosPage },
  { path: '/todos', component: TodoPage },
  { path: '/albums', component: AlbumPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
