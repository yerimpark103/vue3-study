<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
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
          type="button"
          class="btn btn-primary"
          @click="handleClickCreatePost"
        >
          등록
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

const handleClickCreatePost = async () => {
  try {
    await createPost({
      ...form.value,
      createdAt: Date.now(),
    });
    router.push({ name: 'PostList' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
