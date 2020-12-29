<template>
  <div id="todo-content" class="container-box">
    <uxo-header v-if="$route.meta.showheaderBar"></uxo-header>
    <div class="router-main">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import header from '@/view/header'
import footer from '@/view/footer'

export default {
  components: {
    'uxo-footer': footer,
    'uxo-header': header
  }
}
</script>
<style lang="scss">
.router-main {
  position: fixed;
  top: 40px;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
