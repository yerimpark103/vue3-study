<template>
  <AppModal v-model="show" title="게시글">
    <template #default>
      <div class="row">
        <div class="col-3 text-muted">제목</div>
        <div class="col-9">{{ title }}</div>

        <div class="col-3 text-muted">내용</div>
        <div class="col-9">{{ contents }}</div>

        <div class="col-3 text-muted">작성일</div>
        <div class="col-9">{{ createdAt }}</div>
      </div>
    </template>
    <template #actions>
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="handleCloseModal"
      >
        Close
      </button>
    </template>
  </AppModal>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  title: String,
  contents: String,
  createdAt: [String, Number],
});

const emit = defineEmits(['update:modelValue']);

const show = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

const handleCloseModal = () => {
  show.value = false;
};
</script>

<style lang="scss" scoped></style>
