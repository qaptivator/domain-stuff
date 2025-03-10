<template>
	<div class="w-min">
		<h2 class="mb-2 font-bold">Test for double left clicks</h2>
		<p class="mb-1">Mouse clicks: {{ mouseClicks }}</p>
		<p class="mb-4">Double clicks: {{ doubleClicks }}</p>
		<div
			@click="clicked"
			class="w-64 h-40 p-4 overflow-auto border bg-slate-200 relative flex flex-col unselectable cursor-pointer rounded-md"
		>
			<p
				v-if="clickList.length === 0"
				class="text-slate-400 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			>
				click here
			</p>
			<p
				v-for="clk in clickList"
				:class="{
					'text-red-500 font-semibold': clk < DOUBLE_CLICK_THRESHOLD,
				}"
			>
				{{ clk }}
			</p>
		</div>
		<footer class="text-sm">
			(in ms, threshold is {{ DOUBLE_CLICK_THRESHOLD }})<br />
			Inspired from
			<NuxtLink
				to="https://doubleclicktest.com/"
				target="_blank"
				>DoubleClickTest</NuxtLink
			>
		</footer>
		<button
			@click="reset"
			class="mt-4 p-2 w-full text-left rounded-md"
			type="button"
			:class="doubleClicks === 0 ? 'bg-green-400' : 'bg-red-500'"
		>
			Reset
		</button>
	</div>
</template>
<script setup lang="ts">
// https://doubleclicktest.com/

const DOUBLE_CLICK_THRESHOLD = 80
const CLICK_LIST_LENGTH = 20

const mouseClicks = ref<number>(0)
const doubleClicks = ref<number>(0)
const lastClick = ref<number>(0) // Date.now()
const clickList = ref<number[]>([])

function clicked() {
	const now = Date.now()
	const diff = now - lastClick.value
	lastClick.value = now

	mouseClicks.value++

	// push shift
	// unshift pop
	// good logic

	if (clickList.value.length === 0) {
		clickList.value.unshift(NaN)
	} else {
		clickList.value.unshift(diff)
	}

	if (clickList.value.length > CLICK_LIST_LENGTH) {
		clickList.value.pop()
	}

	if (diff < DOUBLE_CLICK_THRESHOLD) {
		doubleClicks.value++
	}
}

function reset() {
	mouseClicks.value = 0
	doubleClicks.value = 0
	lastClick.value = 0
	clickList.value = []
}
</script>
<style scoped lang="css">
.unselectable {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>
