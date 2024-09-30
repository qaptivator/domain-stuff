<template>
  <NuxtLoadingIndicator />
  <div class="flex items-center p-4 text-xl mb-10">
    <img
      src="~/assets/dstar.png"
      class="w-16 h-16 cursor-pointer mr-2"
      @click="routerPush('/')"
    />
    <div class="flex overflow-x-auto space-x-10 whitespace-nowrap p-4">
      <b
        class="hover:underline underline-offset-2 cursor-pointer"
        @click="routerPush('/lookup')"
        >domain lookup</b
      >
      <b
        class="hover:underline underline-offset-2 cursor-pointer"
        @click="routerPush('/ytdl')"
        >youtube download</b
      >
      <b
        class="hover:underline underline-offset-2 cursor-pointer"
        @click="routerPush('/find-song')"
        >find song</b
      >
      <b
        class="hover:underline underline-offset-2 cursor-pointer"
        @click="routerPush('/text-info')"
        >text info</b
      >
    </div>
  </div>
  <NuxtPage />
</template>
<script lang="ts">
export default {
  name: "AppPage",
  mounted() {},
  computed: {},
  methods: {
    routerPush(to: any) {
      this.$router.push(to);
    },
  },
};
</script>
