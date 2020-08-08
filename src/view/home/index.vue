<template>
	<div id="todo-content" class="container-box">
		<v-header></v-header>
		<router-view class="router-main"></router-view>
	</div>
</template>
<script>
import header from '@/view/header'
import footer from '@/view/footer'

export default {
	components: {
		'v-footer': footer,
		'v-header': header
	}
}
</script>
