<template>
  <transition appear>
    <div class="root">
      <div class="heading">
        Loading...
      </div>
    </div>
  </transition>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.root {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(white, 0.8);
}

.heading {
  font-size: 28px;
  font-weight: 700;
}
</style>