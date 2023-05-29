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
import { useAlert } from '@/composables/alert.js';

const { vAlert, vSuccess } = useAlert();

const router = useRouter();

const form = ref({
  title: null,
  contents: null,
});
const error = ref(null);
const loading = ref(false);

const handleGoToListPage = () => {
  router.push({
    name: 'PostList',
  });
};

const handleClickCreatePost = async () => {
  try {
    loading.value = true;
    await createPost({
      ...form.value,
      createdAt: Date.now(),
    });
    router.push({ name: 'PostList' });
    vSuccess('등록이 완료되었습니다.');
  } catch (err) {
    vAlert(err.message);
    error.value = err;
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
