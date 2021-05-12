<template>
  <div class="design-docs-container">
    <el-scrollbar class="sidebar-scroll">
      <div class="sidebar-box">
        <ul v-for="item in LOW_CODE_DESIGN_DOCS"
            :key="item.title">
          <div class="title">{{ item.title }}</div>
          <router-link v-for="(subItem, index) in item.children"
                       :key="index"
                       :to="`/home/component-documentation/vant/${subItem.path}`"
                       tag="li"
                       active-class="active-link">
            {{ subItem.title }}
          </router-link>
        </ul>
      </div>
    </el-scrollbar>
    <div class="content-box"></div>
  </div>
</template>

<script>
import { LOW_CODE_DESIGN_DOCS } from '@/libs/constant.js'

export default {
  data() {
    return {
      LOW_CODE_DESIGN_DOCS
    }
  }
}
</script>

<style lang="scss" scoped>
.design-docs-container {
  overflow: hidden;
}
</style>
