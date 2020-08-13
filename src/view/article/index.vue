<template>
	<div id="article">
		<el-row :gutter="20">
			<uxo-sidebar></uxo-sidebar>
			<uxo-list class="article-main"></uxo-list>
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
		'uxo-sidebar': sidebar,
		'uxo-list': list
	}
}
</script>
<style lang="scss" scoped>
#article {
	margin: auto;
}
</style>
