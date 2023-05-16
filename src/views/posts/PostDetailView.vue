<template>
  <div>
    <h2>title</h2>
    <p>contents</p>
    <p class="text-muted">createdAt</p>
    <hr class="my-4" />
    <div class="row g-2">
      <div class="col-auto">
        <button class="btn btn-outline-dark">이전 글</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-dark">다음 글</button>
      </div>
      <div class="col-auto me-auto"></div>
      <div class="col-auto">
        <button class="btn btn-outline-dark" @click="handleGoToListPage">
          목록
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-primary" @click="handleGoToEditPage">
          수정
        </button>
      </div>
      <div class="col-auto">
        <button class="btn btn-outline-danger">삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const id = route.params.id;

const handleGoToListPage = () => {
  router.push({
    name: 'PostList',
  });
};
const handleGoToEditPage = () => {
  router.push({
    name: 'PostEdit',
    params: { id },
  });
};
</script>

<style lang="scss" scoped></style>
