<template>
	<div class="p-4 text-xl">
		<div class="flex flex-col space-y-4">
			<p>
				> welcome to
				<b>domain stuff</b>
			</p>
			<p>
				> you can use a bunch of useful utility tools, mostly for programming,
				without all the ads and popups
			</p>
			<p>> it's nothing special, really, mostly just for my personal use</p>
			<p>
				> i often integrate very useful tools into this website when im too lazy
				to google for them every time,<br />and im letting other people use them
				too
			</p>
			<p>
				> feel free to look around, and maybe even give a star to the
				<NuxtLink
					to="https://github.com/qaptivator/domain-stuff"
					target="_blank"
					>github</NuxtLink
				>
				repository... (pretty please)
			</p>
			<p>> created by qaptivator</p>
		</div>
	</div>
</template>
<script lang="ts">
export default {
	name: 'IndexPage',
	data() {
		return {}
	},
	mounted() {},
	methods: {},
}
</script>
