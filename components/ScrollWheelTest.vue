<template>
	<div>
		<h2 class="mb-2">Test your mouse scroll wheel</h2>
		<div v-show="error">
			<div style="width: 300px; height: 300px; background-color: gray"></div>
			<p class="mt-2 text-sm">There was an error loading the canvas</p>
		</div>
		<div v-show="!error">
			<canvas
				@wheel="handleScroll"
				ref="scrollCanvas"
				width="300"
				height="300"
			></canvas>
			<p class="mt-2 text-sm">
				Scroll in one direction, and if colors change,<br />
				your mouse scrolling is glitchy.<br />
				Code is taken from
				<NuxtLink
					to="https://fractalglider.github.io/fun/2018/02/13/testing-mouse-scroll-wheel.html"
					target="_blank"
					>Fractal Glider</NuxtLink
				><br />
				Check it out too!
			</p>
		</div>
	</div>
</template>
<script setup lang="ts">
// https://github.com/fractalglider/fractalglider.github.io/blob/master/scripts/mouseScrollTest/mouseScrollTest.pde
const scrollCanvas = ref<HTMLCanvasElement | null>(null)

const error = ref<boolean>(false)

const x = ref<number>(150)
const y = ref<number>(150)
const prevx = ref<number>(150)
const prevy = ref<number>(150)
const tickHeight = ref<number>(10)
const tickColor = ref<string>('black')

function draw(ctx: CanvasRenderingContext2D) {
	if (!scrollCanvas.value) return

	ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
	ctx.fillRect(0, 0, scrollCanvas.value.width, scrollCanvas.value.height)

	ctx.lineWidth = 20
	ctx.strokeStyle = tickColor.value
	ctx.beginPath()
	ctx.moveTo(prevx.value, y.value)
	ctx.lineTo(x.value, y.value)
	ctx.stroke()

	prevx.value = x.value
	x.value += 0.5
	if (x.value > scrollCanvas.value.width) {
		x.value = 0
		prevx.value = x.value
	}
}

function handleScroll(event: WheelEvent) {
	if (!scrollCanvas.value) return

	const notchesScrolled = event.deltaY > 0 ? 1 : -1

	tickColor.value = notchesScrolled < 0 ? 'green' : 'red'

	prevy.value = y.value
	y.value += notchesScrolled * tickHeight.value

	if (y.value > scrollCanvas.value.height) {
		y.value = 0
		prevy.value = y.value
	} else if (y.value < 0) {
		y.value = scrollCanvas.value.height
		prevy.value = y.value
	}
}

onMounted(() => {
	if (!scrollCanvas.value) {
		console.error('ScrollWheelTest error: Canvas not found!')
		error.value = true
		return
	}

	const ctx = scrollCanvas.value?.getContext('2d')
	if (!ctx) {
		console.error('ScrollWheelTest error: failed to create 2d context!')
		error.value = true
		return
	}

	function animFrame() {
		if (ctx) draw(ctx)
		requestAnimationFrame(animFrame)
	}
	requestAnimationFrame(animFrame)
})
</script>
<style scoped lang="css"></style>
