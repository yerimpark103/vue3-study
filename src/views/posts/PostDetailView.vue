<template>
  <div>
    <h2>{{ post.title }}</h2>
    <p>{{ post.contents }}</p>
    <p class="text-muted">{{ post.createdAt }}</p>
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
        <button class="btn btn-outline-danger" @click="handleClickDeletePost">
          삭제
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { ref } from 'vue';

const props = defineProps({
  id: Number,
});

const router = useRouter();
// const id = route.params.id;
/**
 * ref : 한꺼번에 객체할당 가능
 */
const post = ref({
  title: null,
  contents: null,
  createdAt: null,
});
// let post = reactive({});

const fetchPost = async () => {
  try {
    const { data } = await getPostById(props.id);
    console.log(data);
    setPost(data);
    /** ref 로 선언하면 반응형 객체할당이 됨
     * 장점 : primitive/reference type 에 일관성 가능
     * 단점 : .value.xxx를 붙여야 함
     */
    post.value = { ...data };

    /** reactive 로 선언하면 각각의 키밸류를 따로 정의해둬야 반응형 값이 됨
     * 장점 : 가독성
     * 단점 : 객체 할당 불가능
     */
    // post.title = data.title;
    // post.contents = data.contents;
  } catch (error) {
    console.log(error);
  }
};

const setPost = ({ title, contents, createdAt }) => {
  post.value.title = title;
  post.value.contents = contents;
  post.value.createdAt = createdAt;
};

fetchPost();

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

const handleClickDeletePost = async () => {
  try {
    if (confirm('Are you sure?') === false) return;

    await deletePost(props.id);
    router.push({ name: 'PostList' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
