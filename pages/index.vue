<template>
  <div class="p-4 text-xl">
    <div class="flex flex-col space-y-4">
      <p>
        > welcome to
        <a
          class="font-bold cursor-pointer"
          @click="openNewTab('https://qaptivator.github.io/domain-stuff/')"
          >domain stuff</a
        >
      </p>
      <p>> you can use a bunch of tools to work with domain names</p>
      <p>> it's nothing special, really, mostly just for my personal use</p>
      <p>
        > feel free to look around, and maybe even check out the
        <a
          class="font-bold cursor-pointer"
          @click="openNewTab('https://github.com/qaptivator/domain-stuff')"
          >github</a
        >
        repository...
      </p>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "IndexPage",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    openNewTab(url) {
      window.open(url, "_blank");
    },
    pushto(to: any) {
      this.$router.push(to);
    },
  },
};
</script>
