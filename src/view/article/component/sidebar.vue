<template>
	<div id="article-sidebar">
		<el-menu default-active="activeIndex"
					   class="el-menu-vertical"
					 	 @open="handleOpen"
						 size="mini"
				   	 @close="handleClose"
						 background-color="#fff"
						 unique-opened
						 active-text-color="#0747a6">
				<template v-for="(list, i) of menu">
					<template v-if="list.children">
						<el-submenu :index="`${i}`" :key="list.name">
							<template slot="title"><i class="el-icon-location"></i>{{list.name}}</template>
							<el-menu-item v-for="(li, j) of list.children" :key="j" :index="li.link"><i class="el-icon-location"></i>{{li.name}}</el-menu-item>
						</el-submenu>
					</template>
					<el-menu-item v-else :index="list.link" :key="list.name">
						<template slot="title"><i class="el-icon-location"></i>{{list.name}}</template></el-menu-item>
				</template>
    </el-menu>
		<div class="navgation" v-loading="loadingNav">
			<div class="list" v-for="el of thusList" :key="el.name" @click="handlelinkClick(el.link)">
				<i class="iconfont icon-fenxiang"></i>
				{{el.name}}
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
			loadingNav: false,
			activeIndex: 'javaScript'
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
<style lang="scss">
#article-sidebar {
	overflow: hidden;
	position: fixed;
	z-index: 100;
	top: 40px;
	left: 0;
	bottom: 0;
	width: 200px;
	min-height: 650px;
	overflow-y: scroll;
	// background-color: #f6f6f6;
	border-right: solid 1px #e6e6e6;
	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
	.el-menu-vertical {
		height: calc(100% - 200px);
		overflow-y: scroll;
		font-weight: 600;
		border-right: 0;
		border-bottom: 1px solid #f6f6f6;
		.el-submenu__title {
			height: 40px !important;
			line-height: 40px !important;
		}
		.el-menu-item{
			height: 40px;
			line-height: 40px;
			border-top: 1px solid #f6f6f6;
			&.is-active {
				border-right:3px solid #0747a6;
			}
		}
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
			background: #fff;
			width: 100%;
			height: 32px;
			line-height: 32px;
			font-size: 12px;
			margin-bottom: 0;
			user-select: none;
			box-sizing: border-box;
			align-items: center;
			font-weight: 600;
			position: relative;
			border-top: 1px solid #f6f6f6;
			white-space: nowrap;
			overflow-x: hidden;
			overflow-y: hidden;
			text-overflow: ellipsis;
			word-break: break-all;
			text-indent: 5px;
			&:hover {
				background: #f6f6f6;
				text-decoration: underline;
				color: #0065ff;
				cursor: pointer;
			}
			.iconfont {
				color: #0065ff;
				font-size: 12px;
			}
		}
	}

}
</style>
