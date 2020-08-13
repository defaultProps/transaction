<template>
	<div id="todo-content" class="container-box">
		<uxo-header></uxo-header>
		<router-view class="router-main"></router-view>
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
