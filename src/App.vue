<script setup>
import MyHeader from '@/layouts/MyHeader.vue';
import MyView from '@/layouts/MyView.vue';
</script>

<template>
  <MyHeader></MyHeader>

  <MyView></MyView>

  <AppAlert />
</template>

<style>
.container {
  max-width: 940px;
}
</style>
