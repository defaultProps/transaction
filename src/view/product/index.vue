<template>
  <div id="product">
    <div class="header-box">
      <div class="logo-box"></div>
      <div class="meta-box"></div>
    </div>
    <main>
      <section class="sidebar-left">
        <ul>
          <template v-for="item in navList">
            <div class="title" v-if="item.title" :key="item.name">{{item.name}}</div>
            <router-link :to="item.path" tag="li" :key="item.name">{{item.name}}</router-link>
          </template>
        </ul>
      </section>
      <section class="content-box"></section>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navList: []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
