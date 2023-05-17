<template>
  <div>
    <h2>게시글 등록</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input
          v-model="form.title"
          type="text"
          class="form-control"
          id="title"
        />
      </div>
      <div class="mb-3">
        <label for="contents" class="form-label"> 내용 </label>
        <textarea
          v-model="form.contents"
          class="form-control"
          id="contents"
          rows="3"
        ></textarea>
      </div>
      <div class="pt-4">
        <button
          type="button"
          class="btn btn-outline-dark me-2"
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
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';

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
