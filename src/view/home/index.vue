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
