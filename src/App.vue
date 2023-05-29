<script setup>
import MyHeader from '@/layouts/MyHeader.vue';
import MyView from '@/layouts/MyView.vue';
import { useAlert } from './composables/alert';

const { alerts } = useAlert();
</script>

<template>
  <MyHeader></MyHeader>

  <MyView></MyView>

  <AppAlert :items="alerts" />
</template>

<style>
.container {
  max-width: 940px;
}
</style>
