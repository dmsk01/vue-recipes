<script setup>
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})  
</script>

<template>
  <el-button type="primary" class="btn">{{ text }}</el-button>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/index.scss';

.btn {
  padding: 20px 25px;
  font-size: 17px;
  background-color: $lightBlue;
}
</style>