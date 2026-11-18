<template>
	<div
		class="flex flex-col bg-transparent items-center justify-center transition-colors duration-300 ease-in-out font-sans p-6"
		:style="themeStyles"
		@click="handleGlobalClick"
	>
		<div
			class="fixed top-0 left-0 -z-10 w-screen h-screen transition-colors duration-300 ease-in-out"
			:style="themeStyles"
		/>
		<div class="text-center w-full max-w-sm">
			<header class="mb-12">
				<h1 class="text-xs uppercase tracking-[0.3em] opacity-50 font-bold">
					Contrast Ratio
				</h1>
			</header>

			<main class="relative flex items-center justify-center">
				<span class="text-5xl md:text-7xl font-light opacity-40">#</span>
				<input
					ref="hexInput"
					v-model="hex"
					type="text"
					maxlength="6"
					class="bg-transparent text-5xl md:text-7xl font-light w-44 md:w-64 outline-none !border-b-2 !border-transparent focus:border-current transition-all lowercase"
					:class="isDark ? 'focus:!border-b-white' : 'focus:!border-b-black'"
					spellcheck="false"
					placeholder="ffffff"
				/>
			</main>

			<footer class="mt-16">
				<p class="text-xl font-medium tracking-tight">
					{{ isDark ? 'Use white text' : 'Use black text' }}
				</p>
				<div
					class="mt-2 text-[10px] uppercase tracking-widest opacity-40"
					v-if="rgb"
				>
					RGB({{ rgb.r }}, {{ rgb.g }}, {{ rgb.b }})
				</div>
			</footer>
		</div>
	</div>
</template>
<script setup>
// Reactive state for the hex code
const hex = ref('ffffff')

// Derived state for the RGB values
const rgb = computed(() => {
	let h = hex.value.replace('#', '')
	if (h.length === 3) {
		h = h
			.split('')
			.map((char) => char + char)
			.join('')
	}
	if (h.length !== 6) return null

	/*const r = parseInt(h.substring(0, 2), 16)
	const g = parseInt(h.substring(2, 2), 16)
	const b = parseInt(h.substring(4, 2), 16)*/
	const r = parseInt(h.substring(0, 2), 16)
	const g = parseInt(h.substring(2, 4), 16)
	const b = parseInt(h.substring(4, 6), 16)

	if (isNaN(r) || isNaN(g) || isNaN(b)) return null

	return { r, g, b, hex: h }
})

// Calculate if the background is "dark" using the YIQ formula
const isDark = computed(() => {
	if (!rgb.value) return false
	const { r, g, b } = rgb.value
	// YIQ equation: perceived brightness
	const yiq = (r * 299 + g * 587 + b * 114) / 1000
	return yiq < 128
})

// Dynamic styles based on the contrast logic
const themeStyles = computed(() => {
	const bgColor = rgb.value ? `#${rgb.value.hex}` : '#ffffff'
	const textColor = isDark.value ? '#ffffff' : '#000000'

	return {
		backgroundColor: bgColor,
		color: textColor,
	}
})
const backgroundColor = computed(() => themeStyles.value.backgroundColor)
const textColor = computed(() => themeStyles.value.color)

useHead({
	htmlAttrs: {
		style: computed(
			() =>
				`background-color: ${backgroundColor.value}; color: ${textColor.value}; transition: all 0.3s ease;`
		),
	},
})

// Focus the input automatically on mount
const hexInput = ref(null)
onMounted(() => {
	if (hexInput.value) hexInput.value.focus()
})

const handleGlobalClick = () => {
	//if (hexInput.value) hexInput.value.focus()
}
</script>
<style>
body {
	margin: 0;
	padding: 0;
	overflow: hidden;
	/*background-color: v-bind(backgroundColor);
	color: v-bind(textColor);*/
}

/*a {
	background-color: v-bind(backgroundColor);
	color: v-bind(textColor);
}*/

/*html,
body,
#__nuxt {
	height: 100%;
	color: inherit;
}*/

input::placeholder {
	color: currentColor;
	opacity: 0.2;
}
</style>
