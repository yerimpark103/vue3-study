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
    <AppAlert :items="alerts" />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getPostById, updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import AppAlert from '@/components/AppAlert.vue';

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
    vAlert(error.message);
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
    vAlert('수정이 완료되었습니다.', 'success');
  } catch (error) {
    vAlert('수정에 실패했습니다.');
  }
};

const alerts = ref([]);
const vAlert = (message, type = 'error') => {
  alerts.value.push({ message, type });

  setTimeout(() => {
    alerts.value.shift();
  }, 2000);
};
</script>

<style lang="scss" scoped></style>
