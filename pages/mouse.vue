<template>
	<div class="p-4 text-xl">
		<h1>> mouse tests</h1>
		<p class="mb-8">a collection of tools to check your mouse's performance</p>
		<div class="flex md:flex-row flex-col gap-8">
			<ScrollWheelTest />
			<DoubleClickTest />
			<!--<CPSTest />-->
		</div>
	</div>
</template>
<script lang="ts">
export default {
	name: 'Mouse',
	data() {
		return {}
	},
	mounted() {},
	computed: {
		validateForm() {},
	},
	methods: {
		routerPush(to: any) {
			this.$router.push(to)
		},
	},
}
</script>
