<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <form @submit.prevent="handleClickEditPost">
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
          class="btn btn-outline-danger me-2"
          @click="handleGoToDetailPage"
        >
          취소
        </button>
        <button type="submit" class="btn btn-primary">수정</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getPostById, updatePost } from '@/api/posts';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const form = ref({
  title: null,
  contents: null,
});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(id);
    setForm(data);
  } catch (error) {
    console.log(error);
  }
};

const setForm = ({ title, contents }) => {
  form.value.title = title;
  form.value.contents = contents;
};

fetchPost();

const handleGoToDetailPage = () => {
  router.push({
    name: 'PostDetail',
    id,
  });
};

const handleClickEditPost = async () => {
  try {
    await updatePost(id, { ...form.value });
    router.push({ name: 'PostDetail', params: { id } });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
