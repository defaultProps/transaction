<template>
  <div class="transaction-container">
    <uxo-header-box v-if="$route.meta.showheaderBar"></uxo-header-box>
    <router-view></router-view>
  </div>
</template>
<script>
import headerBox from '@/view/header'

export default {
  components: {
    'uxo-header-box': headerBox
  }
}
</script>
<style lang="scss" scoped>
.transaction-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-width: 1200px;
  min-height: 760px;
}
</style>
