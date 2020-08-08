<template>
	<div id="header">
		<div class="header-logo">
			<img class="logo" :src="$image.logo">
			<span class="title">任务管理器</span>
			<ul class="bubbles">
				<li v-for="v of Array(20)" :key="v"></li>
			</ul>
		</div>
		<el-menu
			:default-active="activeIndex"
			class="el-menu-demo"
			mode="horizontal"
			@select="handleSelect"
			background-color="#205081"
			text-color="#fff"
			active-text-color="#fff"
		>
			<el-menu-item v-for="l in menu" :key="l.title" :index="l.link">{{l.name}}</el-menu-item>
		</el-menu>
		<div class="nav-right">
			<!-- <el-input v-model="inputVal" size="mini" class="input" suffix-icon="el-icon-search"></el-input> -->
			<el-button title="配置域" type="text" size="mini" icon="el-icon-lock" @click="$router.push('/manage')" class="">配置域</el-button>
			<div class="avatar"></div>
			<!-- <el-popover placement="bottom-start"
									width="300"
									trigger="click"
									visible-arrow="false">
				<span slot="reference" class="avatar"></span>
				<div class="user-meta">
					<el-button></el-button>
				</div>
			</el-popover> -->
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			menu: [],
			dialogVisible: false,
			activeIndex: 'story',
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
<style>
body, html {
	/* font-family: HanziPen SC,翩翩體-簡 粗體,HanziPen SC Bold,翩翩体-简 粗体; */
}
</style>
<style lang="scss" scoped>
#header {
	height: 40px;
	background: #205081;
	z-index: 100;
	color: #fff;
	display: flex;
	padding: 0 10px 0 0;
	box-sizing: border-box;
	justify-content: flex-start;
	align-items: center;
	.header-logo {
		display: flex;
		position: relative;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		padding: 0 5px;
		overflow: hidden;
		filter: contrast(15) hue-rotate(0);
		animation: hueRotate 10s infinite linear;
		filter: contrast(15) hue-rotate(360deg);
		.title {
			font-size: 14px;
			user-select: none;
			font-style: italic;
		}
		.logo {
			width: 20px;
			height: 20px;
			margin-right: 10px;
			background-size: cover;
			background-repeat:  no-repeat;
		}
		.bubbles {
			position: absolute;
			bottom: -3px;
			width: 90px;
			height: 5px;
			left: 60px;
			user-select: none;
			transform: translate(-50%, 0);
			background-color: #fff;
			filter: blur(5px);
			cursor: none;
			li {
				position: absolute;
				user-select: none;
				border-radius: 50%;
				background: #fff;
				top: 15px;
				cursor: none;
			}
			@for $i from 0 through 25 {
				li:nth-child(#{$i}) {
					$width: 5 + random(15) + px;
					left: 5 + random(50) + px;
					top: 15px;
					transform: translate(-50%, -50%);
					width: $width;
					height: $width;
					animation: moveToTop #{random(6) + 3}s ease-in-out -#{random(5000)/1000}s infinite;
				}
			}
		}
		@keyframes hueRotate {
			100% {
				filter: contrast(15) hue-rotate(360deg);
			}
		}
		@keyframes moveToTop {
			90% {
				opacity: 1;
			}
			100% {
				opacity: .1;
				transform: translate(-50%, -180px);
			}
		}
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
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.avatar {
			width: 40px;
			height: 30px;
			background-size: cover;
			border-radius: 4px;
			background-image: url('https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1061311188,2230294750&fm=26&gp=0.jpg');
		}
		button {
			margin: 0 10px;
			background: transparent;
			color: #fff;
			border: none;
			font-weight: 400;
			font-size: 14px;
		}
		.input {
			width: 145px;
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
		border-bottom: none !important;
	}
}
</style>
