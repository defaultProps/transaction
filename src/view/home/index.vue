<template>
	<div id="cai-content" class="container-box">
		<v-header></v-header>
		<router-view></router-view>
		<!-- <v-footer></v-footer> -->
	</div>
</template>

<script>
import header from '@/view/header/index'
import footer from '@/view/footer/index'

export default {
	components: {
		'v-footer': footer,
		'v-header': header
	}
}
</script>
<style lang="scss" scoped>
.container-box {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: hidden;
	-webkit-overflow-scrolling: touch;
	-webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
