<template>
  <div>
    <h2>게시글 리스트</h2>
    <hr class="my-4" />
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col">
          <input v-model="params.title_like" type="text" class="form-control" />
        </div>
        <div class="col-3">
          <select v-model="params._limit" class="form-select">
            <option value="3">3개씩 보기</option>
            <option value="6">6개씩 보기</option>
            <option value="9">9개씩 보기</option>
          </select>
        </div>
      </div>
    </form>
    <hr class="my-4" />
    <div class="row g-3">
      <div v-for="post in posts" :key="post.id" class="col-4">
        <PostItem
          :title="post.title"
          :contents="post.contents"
          :createdAt="post.createdAt"
          @click="handleGoToDetailPage(post.id)"
        ></PostItem>
      </div>
    </div>

    <nav class="mt-4" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: params._page <= 1 }">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="params._page--"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="page in pageCount"
          :key="page"
          class="page-item"
          :class="{ active: params._page === page }"
        >
          <a class="page-link" href="#" @click.prevent="params._page = page">{{
            page
          }}</a>
        </li>
        <li class="page-item" :class="{ disabled: params._page >= pageCount }">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="params._page++"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>

    <hr class="my-4" />
    <AppCard>
      <PostDetailView :id="1"></PostDetailView>
    </AppCard>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts';
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';

const router = useRouter();
const posts = ref([]);

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: 3,
  _page: 1,
  title_like: '',
});
/** PAGINATION */
const totalPostCount = ref(0);
const pageCount = computed(() =>
  Math.ceil(totalPostCount.value / params.value._limit),
);

const fetchPosts = async () => {
  try {
    const { data, headers } = await getPosts(params.value);
    posts.value = data;
    // ({ data: posts.value } = await getPosts()); // equivalent with destructuring
    totalPostCount.value = headers['x-total-count'];
  } catch (error) {
    console.log(error);
  }
};

fetchPosts();

watchEffect(fetchPosts);

const handleGoToDetailPage = id => {
  // router.push(`/posts/${id}`);
  router.push({
    name: 'PostDetail',
    params: { id },
  });
};
</script>

<style lang="scss" scoped></style>
