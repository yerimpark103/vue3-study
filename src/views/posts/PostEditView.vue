<template>
  <div>
    <h2>게시글 수정</h2>
    <hr class="my-4" />
    <PostForm
      v-model:title="form.title"
      v-model:contents="form.contents"
      @submit.prevent="handleClickEditPost"
    >
      <template #actions>
        <button
          type="button"
          class="btn btn-outline-danger"
          @click="handleGoToDetailPage"
        >
          취소
        </button>
        <button type="submit" class="btn btn-primary">수정</button>
      </template>
    </PostForm>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getPostById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

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
