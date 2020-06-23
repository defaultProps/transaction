<template>
	<div id="article" class="container-box">
		<el-row :gutter="20">
      <el-col :span="4" class='grid-content'>
        <v-sidebar></v-sidebar>
      </el-col>
      <el-col :span="20" class='grid-content'>
        <v-list></v-list>
      </el-col>
    </el-row>
	</div>
</template>

<script>
import sidebar from './component/sidebar'
import list from './component/list'

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
