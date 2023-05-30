<template>
  <div>
    <h2>About view</h2>
    <p>{{ $route.path }}</p>
    <button class="btn btn-primary" @click="handleGoToHomePage">Home</button>
    <h2>Store</h2>
    <p>counter : {{ counter }}</p>
    <p>doubleCount : {{ doubleCount }}</p>
    <p>doubleCountPlusOne : {{ doubleCountPlusOne }}</p>
    <button @click="increment()">increment</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const router = useRouter();
console.log('route.path : ', router.path);

const handleGoToHomePage = () => {
  router.push('/');
};

const store = useCounterStore();

// state, getter 등은 storeToRefs 사용하여 reactivity 제공
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store);
// actions는 바로 구조분해할당 가능
const { increment } = store;

counter.value = 100; // pinia에서는 state를 바로 수정 가능
</script>

<style lang="scss" scoped></style>
