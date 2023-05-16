<template>
  <div>
    <h2>About view</h2>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="handleGoToHomePage">Home</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
console.log('route.path : ', router.path);

const handleGoToHomePage = () => {
  router.push('/');
};
</script>

<style lang="scss" scoped></style>
