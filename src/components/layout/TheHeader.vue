<template>
  <header class="header">
    <nav>
      <h1><router-link to="/">Boa Payments</router-link></h1>
      <ul>
        <!-- <li><router-link to="/coaches">All Coaches</router-link></li>
        <template v-if="isLoggedIn">
          <li><router-link to="/requests">Requests</router-link></li>
          <li><base-button @click="logout">Logout</base-button></li>
        </template>
        <li v-else><router-link to="/auth">Login</router-link></li> -->
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  // computed: {
  //   isLoggedIn() {
  //     return this.$store.getters.isAuthenticated;
  //   },
  // },
  // methods: {
  //   logout() {
  //     this.$store.dispatch('logout');
  //     this.$router.replace('/coaches');
  //   },
  // },
}
</script>

<style scoped>
header {
  @apply w-full h-20 flex items-center justify-center bg-purple-900;
  /* width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center; */
}

/* header a {
  text-decoration: none;
  color: #f391e3;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  border: 1px solid #f391e3;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  margin: 0 0.5rem;
} */
</style>