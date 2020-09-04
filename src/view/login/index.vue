<template>
  <div id="login">
		<div class="container left-panel-active">
			<!-- Sign Up -->
			<div class="container__form container--signup">
				<h2>Sign Up</h2>
				<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
					<el-form-item label="用户名">
						<el-input v-model="formLabelAlign.username"></el-input>
					</el-form-item>
					<el-form-item label="Email">
						<el-input v-model="formLabelAlign.email"></el-input>
					</el-form-item>
					<el-form-item label="Tel">
						<el-input v-model="formLabelAlign.tel"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="formLabelAlign.password"></el-input>
					</el-form-item>
				</el-form>
			</div>

			<!-- Sign In -->
			<div class="container__form container--signin">
				<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
					<el-form-item label="用户名">
						<el-input v-model="formLabelAlign.username"></el-input>
					</el-form-item>
					<el-form-item label="Email">
						<el-input v-model="formLabelAlign.email"></el-input>
					</el-form-item>
					<el-form-item label="Tel">
						<el-input v-model="formLabelAlign.tel"></el-input>
					</el-form-item>
					<el-form-item label="密码">
						<el-input v-model="formLabelAlign.password"></el-input>
					</el-form-item>
				</el-form>
			</div>

			<!-- Overlay -->
			<div class="container__overlay">
				<div class="overlay">
					<div class="overlay__panel overlay--left">
						<button class="btn" id="signIn">Sign In</button>
					</div>
					<div class="overlay__panel overlay--right">
						<button class="btn" id="signUp">Sign Up</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			labelPosition: 'right',
			formLabelAlign: {
				username: '',
				tel: '',
				password: '',
				email: ''
			}
		}
	}
}
</script>
<style lang="scss" scoped>
#login {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	align-items: center;
	background-color: var(--white);
	background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598523298562&di=418f9d93e20a8f7196c6b0ded8613e19&imgtype=0&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farticle%2F1f2051087d702203ad320350045fcbac853fd387.jpg");
	// https://res.cloudinary.com/dwbddafc1/image/upload/v1597151453/background_n6feku.jpg
	// https://codepen.io/danielkvist/pen/LYNVyPL
	// https://tse3-mm.cn.bing.net/th/id/OIP.H5ih9Dd3Lu-WePkB0o9u0AHaEK?w=293&h=180&c=7&o=5&dpr=1.5&pid=1.7
	background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	display: grid;
	height: 100vh;
	place-items: center;

	--white: #e9e9e9;
	--gray: #333;
	--blue: #0367a6;
	--lightblue: #008997;
	--button-radius: 0;
	--max-width: 758px;
	--max-height: 420px;
	.form__title {
		font-weight: 600;
		margin: 0;
		margin-bottom: 1.25rem;
	}

	.link {
		color: var(--gray);
		font-size: 0.9rem;
		margin: 1.5rem 0;
		text-decoration: none;
	}

	.container {
		background-color: var(--white);
		border-radius: var(--button-radius);
		box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
		height: var(--max-height);
		max-width: var(--max-width);
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 400px;
		margin: 0 auto;
	}

	.container__form {
		height: 100%;
		position: absolute;
		transition: all 0.6s ease-in-out;
	}

	.container--signin {
		left: 0;
		width: 50%;
		z-index: 2;
	}
}

</style>
