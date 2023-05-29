<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <AppError v-if="error" :message="error.message" />

    <PostForm
      v-model:title="form.title"
      v-model:contents="form.contents"
      @submit.prevent="handleClickCreatePost"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-dark"
          @click="handleGoToListPage"
        >
          목록으로
        </button>

        <button
          class="btn btn-primary"
          :disabled="loading"
          @click="handleClickCreatePost"
        >
          <template v-if="loading">
            <span
              class="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            <span class="visually-hidden">Loading...</span>
          </template>
          <template v-else>등록</template>
        </button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import { useAxios } from '@/hooks/useAxios';
import { useAlert } from '@/composables/alert.js';

const { vAlert, vSuccess } = useAlert();

const router = useRouter();

const form = ref({
  title: null,
  contents: null,
});

const handleGoToListPage = () => {
  router.push({
    name: 'PostList',
  });
};

const { error, loading, execute } = useAxios(
  `/posts`,
  {
    method: 'post',
  },
  {
    immediate: false,
    onSuccess: () => {
      router.push({ name: 'PostList' });
      vSuccess('등록이 완료되었습니다.');
    },
    onError: err => {
      vAlert(err.message);
    },
  },
);

const handleClickCreatePost = async () => {
  execute({ ...form.value, createdAt: Date.now() });
};
</script>

<style lang="scss" scoped></style>
