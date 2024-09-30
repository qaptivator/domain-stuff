uh oh
<template>
  <NuxtLayout>
    <div class="p-4 text-xl">
      <h1 class="text-7xl mb-4">{{ error.statusCode }}</h1>
      <p>
        oops, i couldnt find that page, <NuxtLink to="/">go home?</NuxtLink>
      </p>
    </div>
  </NuxtLayout>
</template>
<script lang="ts">
export default {
  name: "Error",
  props: ["error"],
  methods: {
    routerPush(to: any) {
      this.$router.push(to);
    },
  },
};
</script>
<style lang="css"></style>
