<template>
	<div class="p-4 text-xl">
		<h1>> best external tools</h1>
		<p class="mb-8">
			the best open source tools, which prefer utility and quality over
			annoyance and greed
		</p>
		<p class="mb-2">
			this is a list of best open source, which have some utilitary functions.
			<span class="text-sm opacity-30"
				>(p.s. not all of them are open source, im sorry. im just picking the
				ones that are good)</span
			><br />
			these are hand picked by my personal preference, so you are not forced to
			use them.<br />
			i am not responsible for any issues occuring on these external tools,
			because they are not owned by me.<br />
			<span class="italic">paid tools are marked by * (asterisk).</span><br />
			<br />
		</p>
		<p
			v-if="fetchFailed"
			class="text-red-500"
		>
			Failed to fetch the latest external tool list!<br />
			Try reloading this page or checking your internet connection, and if this
			issue persists, file a GitHub issue in the repository page.
		</p>
		<ul>
			<li v-for="tool in externalTools">
				>
				<NuxtLink
					:key="tool?.name"
					class="no-underline hover:underline"
					:to="tool?.link"
					target="_blank"
					>{{ tool?.name }}</NuxtLink
				>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
type ExternalTool = {
	name: string
	link: string
}
export default {
	name: 'External tools',
	data() {
		return {
			externalTools: [] as ExternalTool[],
			fetchFailed: false,
		}
	},
	mounted() {
		fetch(
			'https://raw.githubusercontent.com/qaptivator/domain-stuff/refs/heads/main/external-tools.txt'
		)
			.then((response) => response.text())
			.then((text) => this.toolsFetched(text))
			.catch((error) => {
				this.fetchFailed = true
				console.error(
					'Failed to fetch the latest external tool list! Try reloading this page or checking your internet connection, and if this issue persists, file a GitHub issue in the repository page.'
				)
			})
	},
	computed: {
		validateForm() {},
	},
	methods: {
		routerPush(to: any) {
			this.$router.push(to)
		},
		toolsFetched(text: string) {
			if (!text) return

			const entries = text.split(/\n/)
			if (!entries) return

			for (const entry of entries) {
				const [name, link] = entry.split('|') ?? ['', '']
				//if (!name || !link) return; // what if i leave link intentionally empty for some reason?
				if (!name) return
				const trimmedName = name.trim()
				const trimmedLink = link.trim()
				this.externalTools.push({
					name: trimmedName,
					link: trimmedLink,
				})
			}
		},
	},
}
</script>
