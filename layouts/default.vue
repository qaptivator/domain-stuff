<template>
	<div class="flex flex-col min-h-screen">
		<header class="flex bg-white text-black items-center p-4 text-xl mb-10">
			<img
				src="~/assets/dstar.png"
				class="w-16 h-16 cursor-pointer mr-2"
				@click="routerPush('/')"
			/>
			<div class="flex overflow-x-auto space-x-10 whitespace-nowrap p-4">
				<NuxtLink
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="no-underline hover:underline cursor-pointer"
					active-class="font-semibold"
				>
					{{ link.label }}
				</NuxtLink>
				<!--<NuxtLink
				class="no-underline hover:underline cursor-pointer"
				to="/ytdl"
				>youtube download</NuxtLink
				>-->
				<!--<NuxtLink class="no-underline hover:underline" to="/rppb"
          		>rppb</NuxtLink
				>-->
				<!--
				<NuxtLink
					class="hover:underline underline-offset-2 cursor-pointer"
					to="/find-song"
					>find song</NuxtLink
				>
				<NuxtLink
					class="hover:underline underline-offset-2 cursor-pointer"
					to="/text-info"
					>text info</NuxtLink
				>-->
			</div>
		</header>
		<main class="flex-grow flex flex-col">
			<slot />
		</main>
	</div>
</template>
<script lang="ts">
export default {
	name: 'Default',
	data() {
		return {
			navLinks: [
				{ label: 'domain lookup', to: '/lookup' },
				{ label: 'contrast', to: '/contrast' },
				{ label: 'encrypt/decrypt', to: '/encrypt' },
				{ label: 'uuid/objectid', to: '/uuid' },
				{ label: 'mcuuid', to: '/mcuuid' },
				{ label: 'mouse tests', to: '/mouse' },
				{ label: 'best external tools', to: '/external-tools' },
			],
		}
	},
	methods: {
		routerPush(to: any) {
			this.$router.push(to)
		},
	},
}
</script>
<style lang="css">
.scrollbar-hide::-webkit-scrollbar {
	display: none;
}
.scrollbar-hide {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
</style>
