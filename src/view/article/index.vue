<template>
	<div id="article">
		<el-row :gutter="20">
			<v-sidebar></v-sidebar>
			<v-list class="article-main"></v-list>
    </el-row>
	</div>
</template>

<script>
import sidebar from './component/articleSidebar'
import list from './component/articleList'

export default {
	data() {
		return {

		}
	},
	components: {
		'v-sidebar': sidebar,
		'v-list': list
	}
}
</script>
<style lang="scss" scoped>
#article {
	margin: auto;
}
</style>
