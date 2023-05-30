<template>
  <div>
    <h2>Home view</h2>
    <p>{{ $route.path }}</p>
    <hr class="my-4" />
    <AppGrid :items="items" v-slot="{ item }" col-class="col-6">
      <AppCard>{{ item }}</AppCard>
    </AppGrid>
    <hr class="my-4" />
    {{ position }}
    <!-- <h2>{{ $person.name }}</h2> -->
    <!-- <button class="btn btn-primary" @click="person.say">click person</button> -->
  </div>
</template>

<script>
export default {
  created() {
    // console.log(this.$person.name);
    // this.$person.say();
  },
};
</script>

<script setup>
import { ref, reactive, toRefs } from 'vue';

const items = ref(['사과', '딸기', '포도', '바나나']);

const position = reactive({
  x: 100,
  y: 1000,
});

const { x, y } = toRefs(position);
</script>

<style lang="scss" scoped></style>
