<template>
  <div class="transaction-container">
    <uxo-header-box v-if="$route.meta.showheaderBar"></uxo-header-box>
    <router-view></router-view>
    <!-- 全屏挂载页面 -->
    <v-add-issue-btn-dialog-box></v-add-issue-btn-dialog-box>
  </div>
</template>
<script>
import headerBox from '@/view/header'
import dialogNewIssus from '@/view/todoList/component/dialogNewIssus'

export default {
  components: {
    'uxo-header-box': headerBox,
    'v-add-issue-btn-dialog-box': dialogNewIssus
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
}
</style>
