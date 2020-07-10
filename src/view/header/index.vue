<template>
	<div id="header">
		<!-- <img class="logo" :src="$image.logo"> -->
		<el-menu :default-active="activeIndex"
					 	 class="el-menu-demo"
					 	 mode="horizontal"
					 	 @select="handleSelect"
					   background-color="#0747a6"
						 text-color="#f0f0f0"
						 active-text-color="#ffd04b">
			<el-menu-item v-for="l in menu" :key="l.title" :index="l.link">{{l.name}}</el-menu-item>
		</el-menu>
		<div class="nav-right">
			<el-input v-model="inputVal" size="mini" class="input" suffix-icon="el-icon-search"></el-input>
			<el-button type="text" icon="el-icon-warning" size="medium"></el-button>
			<el-popover placement="bottom-start"
									width="300"
									trigger="click"
									visible-arrow="false">
				<span slot="reference" class="avatar"></span>
				<div class="user-meta">
					123
				</div>
			</el-popover>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			menu: [],
			activeIndex: 'article',
			inputVal: ''
		}
	},
	created() {
		this.getMenu()
	},
	methods: {
		handleSelect(v) {
			this.$router.push(`/${v}`)
		},
		getMenu() {
			let params = {
				uid: this.$store.state.user.uid
			}
			this.$axios.header.menu(params).then(v => {
				this.menu = v
			})
		}
	}
}
</script>
<style lang="scss" scoped>
#header {
	height: 40px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	background: #0747a6;
	z-index: 100;
	color: #fff;
	display: flex;
	padding: 0 10px;
	box-sizing: border-box;
	justify-content: flex-start;
	align-items: center;
	.logo {
		width: 25px;
		height: 25px;
		margin-right: 10px;
		background-size: cover;
		background-repeat:  no-repeat;
	}
	ul {
		display: flex;
		justify-content: center;
		align-items: center;
		.list {
			padding: 0 10px;
			user-select: none;
		}
	}
	.nav-right {
		position: absolute;
		right: 10px;
		width: 200px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.input {
			width: 145px;
		}
		.avatar {
			border: 1px solid #fff;
			display: inline-block;
			border-radius: 50%;
			width: 30px;
			height: 30px;
			cursor: pointer;
			user-select: none;
		}
		.user-meta {
			width: 400px;
			height: 300px;
		}
	}
	.el-menu.el-menu--horizontal {
		border: none !important;
	}
	.el-menu--horizontal>.el-menu-item {
		height: 40px;
		line-height: 40px;
	}
}
</style>
