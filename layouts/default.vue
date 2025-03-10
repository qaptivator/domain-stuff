<template>
	<div>
		<div class="flex items-center p-4 text-xl mb-10">
			<img
				src="~/assets/dstar.png"
				class="w-16 h-16 cursor-pointer mr-2"
				@click="routerPush('/')"
			/>
			<div class="flex overflow-x-auto space-x-10 whitespace-nowrap p-4">
				<NuxtLink
					class="link-button"
					to="/lookup"
					>domain lookup</NuxtLink
				>
				<NuxtLink
					class="link-button"
					to="/ytdl"
					>youtube download</NuxtLink
				>
				<NuxtLink
					class="link-button"
					to="/external-tools"
					>best external tools</NuxtLink
				>
				<NuxtLink
					class="link-button"
					to="/mouse"
					>mouse tests</NuxtLink
				>
				<NuxtLink
					class="link-button"
					to="/math"
					>math tools</NuxtLink
				>
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
		</div>
		<slot />
	</div>
</template>
<script lang="ts">
export default {
	name: 'Default',
	methods: {
		routerPush(to: any) {
			this.$router.push(to)
		},
	},
}
</script>
<style lang="css"></style>
