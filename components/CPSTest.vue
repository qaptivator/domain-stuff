<template>
	<div class="cps-test">
		<h2>CPS Test</h2>
		<p>Click as many times as you can in 10 seconds!</p>
		<button
			@mousedown="startTest"
			@mouseup="stopTest"
			@mouseleave="stopTest"
		>
			Click Me!
		</button>
		<p>Clicks: {{ clicks }}</p>
		<p v-if="timeLeft > 0">Time Left: {{ timeLeft }}s</p>
		<p v-else>Your CPS: {{ cps }}</p>
	</div>
</template>
<script>
export default {
	data() {
		return {
			clicks: 0,
			timeLeft: 10,
			timer: null,
			cps: 0,
		}
	},
	methods: {
		startTest() {
			if (this.timeLeft === 10) {
				this.timer = setInterval(() => {
					if (this.timeLeft > 0) {
						this.timeLeft--
					} else {
						clearInterval(this.timer)
						this.cps = (this.clicks / 10).toFixed(2)
					}
				}, 1000)
			}
			this.clicks++
		},
		stopTest() {
			if (this.timeLeft === 0) {
				this.resetTest()
			}
		},
		resetTest() {
			this.clicks = 0
			this.timeLeft = 10
			this.cps = 0
			clearInterval(this.timer)
		},
	},
}
</script>
<style scoped>
.cps-test {
	text-align: center;
	font-family: Arial, sans-serif;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 8px;
	background-color: #f9f9f9;
	max-width: 300px;
	margin: 0 auto;
}

.cps-test h2 {
	color: #333;
}

.cps-test button {
	padding: 10px 20px;
	font-size: 16px;
	color: #fff;
	background-color: #007bff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.cps-test button:hover {
	background-color: #0056b3;
}

.cps-test p {
	margin: 10px 0;
	color: #555;
}
</style>
