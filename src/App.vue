<template>
  <div id="app">
    <nav class="main-menu">
      <ul>
        <li><router-link to="/users" exact>Utilisateurs</router-link></li> |
        <li><router-link to="/posts">Posts</router-link></li> |
        <li><router-link to="/comments">Commentaires</router-link></li> |
        <li><router-link to="/photos">Photos</router-link></li> |
        <li><router-link to="/todos">Todos</router-link></li> |
        <li><router-link to="/albums">Albums</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { Users } from './composables/users';

const { loading, error, fetchUsers, cancelRequest } = Users();
</script>

<style scoped>
.main-menu {
  background-color: rgb(245 245 245);
  width: 100%;
  padding: 10px 0;
}

.main-menu ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
}

.main-menu ul li {
  margin: 0 10px;
}

.main-menu ul li router-link {
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.main-menu ul li a {
  text-decoration: none;
  color: black;
}

.main-menu ul li a:hover {
  color: #858585;
}

.main-menu ul li router-link.active {
  background-color: #555;
}

.main-menu ul li router-link:hover {
  background-color: #555;
}
</style>
