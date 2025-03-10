<template>
	<div class="flex gap-4">
		<span class="text-2xl"><slot /></span>
		<input
			class="rounded-md p-1 border bg-slate-200 w-32"
			type="number"
			v-model="model"
			placeholder="0"
		/>
	</div>
</template>
<script setup lang="ts">
const model = defineModel()
</script>
<style scoped lang="css"></style>
