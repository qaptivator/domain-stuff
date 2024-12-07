<template>
  <div class="p-4 text-xl">
    <h1>> youtube download</h1>
    <p class="mb-8">download a youtube video from url</p>
    <p>
      the best tool to download videos/audio from youtube
      <i>(and other social media)</i> by far is
      <NuxtLink to="https://cobalt.tools/" target="_blank"
        >cobalt.tools</NuxtLink
      >
    </p>
    <p class="text-sm opacity-30">
      i am not sponsored by Cobalt and i do not support online piracy<br />
      i recommend this tool on this website because it has the least amount of
      ads and it doesnt look as scummy as other video downloaders<br />
      i am not responsible for any illegal things that you may do on that
      website
    </p>
  </div>
</template>
<script lang="ts">
export default {
  name: "Ytdl",
  data() {
    return {
      videoUrl: "",
      errorStatus: "",
      loading: false,
      loadingTotal: 0,
      loadingLeft: 0,
      videoInfo: {} as any,
      videoFormat: {} as any,
      videoBlob: new Blob(),
      submitted: false,
    };
  },
  mounted() {},
  computed: {
    validateForm() {},
  },
  methods: {
    routerPush(to: any) {
      this.$router.push(to);
    },
  },
};
</script>
