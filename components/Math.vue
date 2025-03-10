<template>
	<div ref="mathContainer"></div>
</template>
<script setup lang="js">
const model = defineModel()
const mathContainer = ref(null)
function renderMath() {
    katex.render(model.value, mathContainer.value, {
        throwOnError: false
    });
}
onMounted(renderMath)
watch(model, renderMath)
</script>
<style scoped lang="css"></style>
