<template>
	<div class="p-4 text-xl">
		<h1>> quadratic formula solver</h1>
		<p class="mb-8">a collection of tools to check your mouse's performance</p>
		<div id="math">`sum_(i=1)^n i^3=((n(n+1))/2)^2`</div>
	</div>
</template>
<script setup lang="js">
onMounted(() => {
	window.MathJax = {
		tex: {
			inlineMath: [
				['$', '$'],
				['\\(', '\\)'],
			],
		},
		asciimath: { delimiters: [['`', '`']] },
		loader: { load: ['input/asciimath', 'output/chtml'] },
	}

	if (window.MathJax) {
		window.MathJax.typesetPromise()
	}
    console.log('asds', window.MathJax)
})
</script>
<style scoped lang="css"></style>
