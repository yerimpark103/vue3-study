import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
  },
  {
    path: '/posts',
    name: 'PostList',
    component: PostListView,
  },
  {
    path: '/posts/create',
    name: 'PostCreate',
    component: PostCreateView,
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: PostDetailView,
    // props: true,
    props: route => ({
      id: parseInt(route.params.id),
    }),
  },
  {
    path: '/posts/:id/edit',
    name: 'PostEdit',
    component: PostEditView,
  },
  {
    path: '/nested',
    name: 'Nested',
    component: NestedView,
    children: [
      {
        path: '',
        name: 'NestedHome',
        component: NestedHomeView,
      },
      {
        path: 'one',
        name: 'NestedOne',
        component: NestedOneView,
      },
      {
        path: 'two',
        name: 'NestedTwo',
        component: NestedTwoView,
      },
    ],
  },

  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundView },
];

const router = createRouter({
  /** hashHistory : # 가 붙음 (i.e./posts#/)
   * hash 모드를 사용하면 localhost 전체 파일이 로딩됨. SEO가 불편함.
   * history 모드로 배포를 할 때는 각각의 라우트가 로딩되어 절대경로로 들어갈 수 없으므로 별도의 설정을 해야 함
   */
  history: createWebHistory('/'),
  // history: createWebHashHistory(),
  routes,
});

export default router;
