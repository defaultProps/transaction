<template>
	<div id="article-sidebar">
		<el-menu default-active="2"
					   class="el-menu-vertical-demo"
					 	 @open="handleOpen"
				   	 @close="handleClose"
						 background-color="#fff"
						 unique-opened
						 active-text-color="#409EFF">
				<template v-for="(list, i) of menu">
					<template v-if="list.children">
						<el-submenu :index="`${i}`" :key="list.name">
							<template slot="title"><i class="el-icon-location"></i>{{list.name}}</template>
							<el-menu-item v-for="(li, j) of list.children" :key="j" :index="`${i}_${j}`">{{li.name}}</el-menu-item>
						</el-submenu>
					</template>
					<el-menu-item v-else :index="`${i}`" :key="list.name">
						<template slot="title"><i class="el-icon-location"></i>{{list.name}}</template></el-menu-item>
				</template>
    </el-menu>
	</div>
</template>
<script>
export default {
	data() {
		return {
			menu: []
		}
	},
	created() {
		this.getMenu()
	},
	methods: {
		handleOpen() {},
		handleClose() {},
		getMenu() {
			this.$axios.article.menu().then(data => {
				this.menu = data
			})
		}
	}
}
</script>
<style lang="scss" scoped>
#article-sidebar {
	overflow: hidden;
	position: fixed;
	z-index: 100;
	top: 40px;
	left: 0;
	bottom: 0;
	width: 170px;
	min-height: 650px;
	overflow-y: scroll;
	// background-color: #f6f6f6;
	border-right: solid 1px #e6e6e6;
	.el-menu {
		border: none;
	}
}
</style>
