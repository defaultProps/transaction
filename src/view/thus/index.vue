<template>
	<div id="thus">

	</div>
</template>

<script>

export default {
	data() {
		return {
			thusList: []
		}
	},
	created() {
		this.getThusList()
	},
	methods: {
		getThusList() {
			this.$axios.thus.list().then(v => {
				this.thusList = v
			})
		},
		handlelinkClick(link) {
			window.open(link)
		}
	}
}
</script>
<style lang="scss" scoped>
#thus {
  margin: auto;
	position: fixed;
	top: 50px;
	left: 10px;
	right: 10px;
	bottom: 10px;
}
</style>
