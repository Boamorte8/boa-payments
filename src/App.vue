<script setup lang="ts">
import TheHeader from '@organisms/TheHeader.vue';
import ToastContainer from '@organisms/ToastContainer.vue';
</script>

<template>
  <div class="body dark:bg-background-700 min-h-screen h-full">
    <TheHeader />
    <ToastContainer />
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

.route-enter-from {
  @apply opacity-0 -translate-y-8;
  /* transition: translateY(-30px); */
}

.route-leave-to {
  @apply opacity-0 translate-y-8;
  /* transition: translateY(30px); */
}

.route-enter-active {
  @apply transition-all ease-out duration-300;
  /* transition: all .3s ease-out; */
}

.route-leave-active {
  @apply transition-all ease-in duration-300;
  /* transition: all .3s ease-in; */
}

.route-enter-to,
.route-leave-from {
  @apply opacity-100 translate-y-0;
  /* transform: translateY(0); */
}
</style>
