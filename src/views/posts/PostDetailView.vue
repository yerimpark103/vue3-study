<template>
  <AppLoading v-if="loading" />

  <AppError v-else-if="error" :message="error.message" />

  <div v-else>
    <h2>{{ post.title }}</h2>
    <p>id : {{ props.id }}, isOdd: {{ isOdd }}</p>
    <p>{{ post.contents }}</p>
    <p class="text-muted">{{ post.createdAt }}</p>
    <hr class="my-4" />
    <AppError v-if="deleteError" :message="deleteError.message" />

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
        <button
          class="btn btn-outline-danger"
          :disabled="deleteLoading"
          @click="handleClickDeletePost"
        >
          <template v-if="deleteLoading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>삭제</template>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { ref, toRef, toRefs, computed } from 'vue';

import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert.js';
import { useNumber } from '@/composables/number.js';

const { vAlert, vSuccess } = useAlert();

const props = defineProps({
  id: [String, Number],
});

const router = useRouter();

const { id: idRef } = toRefs(props);
// const idRef = toRef(props, 'id');
const { isOdd } = useNumber(idRef);

const url = computed(() => `/posts/${props.id}`);
const { data: post, error, loading } = useAxios(url);

const handleGoToListPage = () => {
  router.push({
    name: 'PostList',
  });
};

const handleGoToEditPage = () => {
  router.push({
    name: 'PostEdit',
    params: { id: props.id },
  });
};

const {
  error: deleteError,
  loading: deleteLoading,
  execute,
} = useAxios(
  `/posts/${props.id}`,
  { method: 'delete' },
  {
    immediate: false,
    onSuccess: () => {
      vSuccess('삭제가 완료되었습니다.');
      router.push({ name: 'PostList' });
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);

const handleClickDeletePost = async () => {
  if (confirm('Are you sure?') === false) return;
  execute();
};
</script>

<style lang="scss" scoped></style>
