<template>
	<div id="cai-content" class="container-box">
		<v-header></v-header>
		<router-view class="router-main"></router-view>
		<!-- <v-dialog></v-dialog> -->
	</div>
</template>
<script>
import header from '@/view/header/index'
import footer from '@/view/footer/index'
import dialog from '@/components/common/dialog'

export default {
	components: {
		'v-footer': footer,
		'v-header': header,
		'v-dialog': dialog
	}
}
</script>
<style lang="scss" scoped>
.container-box {
	.route-main {
		position: fixed;
		top: 50px;
		left: 0px;
		right: 5px;
		bottom: 10px;
	}
}
</style>
