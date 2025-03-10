<template>
	<div class="p-4 text-xl">
		<h1>> quadratic formula solver</h1>
		<p class="mb-8">solve that pesky quadratic formula</p>
		<Math
			v-model="formula"
			class="mb-8"
		/>
		<div class="flex flex-col gap-2 mb-8">
			<NumberInput v-model="a">a: </NumberInput>
			<NumberInput v-model="b">b: </NumberInput>
			<NumberInput v-model="c">c: </NumberInput>
		</div>
		<Math v-model="expr" />
	</div>
</template>
<script setup lang="ts">
const formula = ref('x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}, a \\neq 0')
const expr = ref('')
const a = ref(null)
const b = ref(null)
const c = ref(null)

function updateExpr() {
	if (a.value === null || b.value === null || c.value === null) {
		expr.value = ''
		return
	}
	const d = b.value ** 2 - 4 * a.value * c.value
	let x1 = NaN
	let x2 = NaN

	if (d < 0 || a.value === 0) {
		//x1 = NaN
		expr.value = `\\text{No real roots}`
		return
	} else if (d === 0) {
		x1 = -b.value / (2 * a.value)
		//expr.value = `x = \\frac{-b}{2a}`
		//expr.value = `x = \\frac{-${b.value}}{2 \\cdot ${a.value}} = ${x1}`
		//const bstr = Math.sign(a.value) === 1 ? a.value : `(${a.value})`
		expr.value = `x = \\frac{-${b.value} \\pm \\sqrt{${b.value}^2 - 4 \\cdot ${a.value} \\cdot ${c.value}}}{2 \\cdot ${a.value}}`
		return
	} else if (d > 0) {
		x1 = (-b.value + Math.sqrt(d)) / (2 * a.value)
		x2 = (-b.value - Math.sqrt(d)) / (2 * a.value)
		//expr.value = `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`
		return
	}
}

watch(a, updateExpr)
watch(b, updateExpr)
watch(c, updateExpr)
</script>
<style scoped lang="css"></style>
