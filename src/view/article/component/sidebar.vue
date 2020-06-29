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
		<div class="navgation" v-loading="loadingNav">
			<div class="list" v-for="el of thusList" :key="el.name" @click="handlelinkClick(el.link)">
				<i class="iconfont icon-fenxiang"></i>
				<span class="name">{{el.name}}</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			menu: [],
			thusList: [],
			loadingNav: false
		}
	},
	created() {
		this.getMenu();
		this.getThusList();
	},
	methods: {
		handleOpen() {},
		handleClose() {},
		getThusList() {
			this.loadingNav = true;
			this.$axios.thus.list().then(v => {
				setTimeout(() => {
					this.thusList = v
					this.loadingNav = false;
				}, 600);
			})
		},
		handlelinkClick(link) {
			window.open(link)
		},
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
	width: 250px;
	min-height: 650px;
	overflow-y: scroll;
	// background-color: #f6f6f6;
	border-right: solid 1px #e6e6e6;
	.el-menu {
		border: none;
	}
	.navgation {
		height: 200px;
		width: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
		text-overflow: ellipsis;
		word-break: break-all;
		position: absolute;
		border-top: 1px solid #e6e6e6;
		bottom: 0;
		.list {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			background: #fff;
			overflow: hidden;
			width: 100%;
			height: 32px;
			line-height: 32px;
			font-size: 14px;
			margin-bottom: 0;
			user-select: none;
			padding: 0 4px;
			box-sizing: border-box;
			align-items: center;
			text-indent: 5px;
			text-overflow: ellipsis;
			word-break: break-all;
			font-weight: 600;
			position: relative;
			border-top: 1px solid #f6f6f6;
			white-space: nowrap;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			&:hover {
				background: #f6f6f6;
				text-decoration: underline;
				color: #0065ff;
			}
			.iconfont {
				color: #0065ff;
				font-size: 12px;
			}
			.name {
				text-indent: 5px;
			}
		}
	}

}
</style>
