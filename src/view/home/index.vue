<template>
	<div id="cai-content" class="container-box">
		<v-header></v-header>
		<router-view class="router-main"></router-view>
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
