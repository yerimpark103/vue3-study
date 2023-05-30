<template>
  <div>
    <h2>게시글 리스트</h2>
    <hr class="my-4" />
    <PostFilter
      v-model:title="params.title_like"
      :limit="params._limit"
      @update:limit="changeLimit"
    />

    <hr class="my-4" />

    <AppLoading v-if="loading" />

    <AppError v-else-if="error" :message="error.message" />

    <template v-else-if="!isPostExisting">
      <p class="text-center py-5 text-muted">No result</p>
    </template>

    <template v-else>
      <AppGrid :items="posts" col-class="col-12 col-md-6 col-lg-4">
        <template v-slot="{ item }">
          <PostItem
            :title="item.title"
            :contents="item.contents"
            :createdAt="item.createdAt"
            @click="handleGoToDetailPage(item.id)"
            @modal="handleOpenModal(item)"
            @preview="selectPreview(item.id)"
          ></PostItem>
        </template>
      </AppGrid>

      <AppPagination
        :current-page="params._page"
        :page-count="pageCount"
        @updatePage="page => (params._page = page)"
      />
    </template>

    <Teleport to="#modal">
      <PostModal
        v-model="show"
        :title="modalTitle"
        :contents="modalContents"
        :created-at="modalCreatedAt"
      />
    </Teleport>

    <template v-if="previewId">
      <hr class="my-4" />
      <AppCard>
        <PostDetailView :id="previewId"></PostDetailView>
      </AppCard>
    </template>
  </div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostFilter from '@/views/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import AppLoading from '@/components/app/AppLoading.vue';
import AppError from '@/components/app/AppError.vue';
import { getPosts } from '@/api/posts';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { computed } from '@vue/reactivity';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

const params = ref({
  _sort: 'createdAt',
  _order: 'desc',
  _limit: 6,
  _page: 1,
  title_like: '',
});

const changeLimit = value => {
  params.value._limit = value;
  params.value._page = 1;
};

const {
  response,
  data: posts,
  error,
  loading,
} = useAxios('/posts', { params });

const isPostExisting = computed(() => posts.value && posts.value.length > 0);

/** PAGINATION */
const totalPostCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
  Math.ceil(totalPostCount.value / params.value._limit),
);

const handleGoToDetailPage = id => {
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
