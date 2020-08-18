<template>
	<div id="todo-content" class="container-box">
		<uxo-header></uxo-header>
		<div class="router-main">
			<div class="router-wrap">
				<router-view></router-view>
			</div>
		</div>
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
<style lang="scss">
.router-main {
	position: absolute;
	top: 40px;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: scroll;
	.router-wrap {
		position: relative;
		widows: 100%;
		height: 100%;
	}
}
</style>
