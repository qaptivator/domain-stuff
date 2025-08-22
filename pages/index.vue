<template>
	<div class="p-4 text-xl">
		<div class="flex flex-col gap-4">
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
			<p>
				> (i also sometimes consider this my personal website,<br />
				but i will make a better and more personalized one soon.<br />
				oh and heres my favorite programming quote below)
			</p>
			<p>> created by qaptivator</p>
			<blockquote
				class="m-8"
				cite="https://martinfowler.com/bliki/TwoHardThings.html"
			>
				There are only two hard things in Computer Science:<br />
				cache invalidation and naming things.<br />
				<cite>— Phil Karlton</cite>
			</blockquote>
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
