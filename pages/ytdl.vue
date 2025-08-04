<template>
	<div class="p-4 text-xl">
		<h1>> youtube download</h1>
		<p class="mb-8">download a youtube video from url</p>
		<p>
			the best tool to download videos/audio from youtube
			<i>(and other social media)</i> by far is
			<NuxtLink
				to="https://cobalt.tools/"
				target="_blank"
				>cobalt.tools</NuxtLink
			>
		</p>
		<p class="text-sm opacity-30 mb-8">
			i am not sponsored by Cobalt and i do not support online piracy<br />
			i recommend this tool on this website because it has the least amount of
			ads and it doesnt look as scummy as other video downloaders<br />
			i am not responsible for any illegal things that you may do on that
			website<br />
			<br />
			pro tip: use firefox instead of chrome/chromium browsers to pass the
			cloudfare turnstile faster
		</p>
		<p>
			sometimes, cobalt may not allow to download from youtube because of heavy
			traffic, so instead you can use other cobalt instances, including:
		</p>
		<ul class="ml-4">
			<li>
				>
				<NuxtLink
					to="https://instances.cobalt.best/"
					class="no-underline hover:underline"
					target="_blank"
					>instances.cobalt.best</NuxtLink
				>
			</li>
			<li>
				>
				<NuxtLink
					to="https://cobalt.directory/"
					class="no-underline hover:underline"
					target="_blank"
					>cobalt.directory</NuxtLink
				>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
export default {
	name: 'Ytdl',
	data() {
		return {
			videoUrl: '',
			errorStatus: '',
			loading: false,
			loadingTotal: 0,
			loadingLeft: 0,
			videoInfo: {} as any,
			videoFormat: {} as any,
			videoBlob: new Blob(),
			submitted: false,
		}
	},
	mounted() {},
	computed: {
		validateForm() {},
	},
	methods: {
		routerPush(to: any) {
			this.$router.push(to)
		},
	},
}
</script>
