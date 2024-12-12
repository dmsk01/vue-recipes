<template>
  <el-table :data="recipes">
    <el-table-column prop="idMeal" label="id" />
    <el-table-column label="Image">
      <template #default="scope">
        <router-link :to="RecipeService.getRecipePath(scope.row.idMeal)">
          <img class="image" :src="scope.row.strMealThumb" alt="meal">
        </router-link>
      </template>
    </el-table-column>
    <el-table-column prop="strMeal" label="Name" />
    <el-table-column prop="strArea" label="Area" />
    <el-table-column prop="strCategory" label="Category" />
    <el-table-column prop="strTags" label="Tags">
      <template #default="scope">
        <template v-if="scope?.row?.strTags">
          <el-tag type="success" v-for="(tag, key) in scope.row.strTags.split(',')" :key="key" class="tag">{{ tag
            }}</el-tag>
        </template>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import { defineProps } from 'vue';
import { RecipeService } from '@/services';
const { recipes } = defineProps({
  recipes: Array
})
</script>

<style lang="scss" scoped>
.tag {
  margin: 0 2px;
}

.image {
  width: 70px;
  height: 70px;
  object-fit: cover;
  overflow: hidden;
}
</style>