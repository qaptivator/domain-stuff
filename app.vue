<template>
  <NuxtLoadingIndicator />
  <div class="flex items-center space-x-10 p-4 text-xl mb-10">
    <img
      src="~/assets/dstar.png"
      class="w-16 h-16 cursor-pointer"
      @click="pushto('/')"
    />
    <b
      class="hover:underline underline-offset-2 cursor-pointer"
      @click="pushto('/lookup')"
      >lookup</b
    >
    <b
      class="hover:underline underline-offset-2 cursor-pointer"
      @click="pushto('/trace')"
      >trace</b
    >
  </div>
  <NuxtPage />
</template>
<script lang="ts">
export default {
  name: "AppPage",
  mounted() {},
  computed: {},
  methods: {
    pushto(to: any) {
      this.$router.push(to);
    },
  },
};
</script>
