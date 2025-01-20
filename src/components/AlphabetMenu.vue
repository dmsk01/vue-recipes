<script setup>
const charList = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const emit = defineEmits(["charChange"]);

</script>

<template>
  <ul class="alphabet-menu">
    <li v-for="char in charList" :key="char">
      <el-button @click="emit('charChange', char)">{{ char }}</el-button>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.alphabet-menu {
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
