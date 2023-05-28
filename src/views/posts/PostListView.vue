<template>
  <div>
    <h2>게시글 리스트</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      v-model:limit="params._limit"
    />

    <hr class="my-4" />
    <AppGrid :items="posts">
      <template v-slot="{ item }">
        <PostItem
          :title="item.title"
          :contents="item.contents"
          :createdAt="item.createdAt"
          @click="handleGoToDetailPage(item.id)"
          @modal="handleOpenModal(item)"
        ></PostItem>
      </template>
    </AppGrid>

    <AppPagination
      :current-page="params._page"
      :page-count="pageCount"
      @updatePage="page => (params._page = page)"
    />

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :contents="modalContents"
        :created-at="modalCreatedAt"
      />
    </Teleport>

    <template v-if="posts && posts.length > 0">
      <hr class="my-4" />
      <AppCard>
        <PostDetailView :id="posts[0].id"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/views/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
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

const show = ref(false);
const modalTitle = ref('');
const modalContents = ref('');
const modalCreatedAt = ref('');

const handleOpenModal = ({ title, contents, createdAt }) => {
  show.value = true;
  modalTitle.value = title;
  modalContents.value = contents;
  modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
