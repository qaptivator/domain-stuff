<template>
	<div class="p-4 text-xl">
		<h1>> quadratic formula solver</h1>
		<p class="mb-8">a collection of tools to check your mouse's performance</p>
		<Math v-model="expr" />
	</div>
</template>
<script setup lang="ts">
const expr = ref('c = \\pm\\sqrt{a^2 + b^2}')
</script>
<style scoped lang="css"></style>
