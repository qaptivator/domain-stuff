<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
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
<style lang="css">
h1 {
  font-weight: 700;
}
</style>
