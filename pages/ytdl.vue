<template>
  <div class="p-4 text-xl">
    <h1>> youtube download</h1>
    <p>download a youtube video from url</p>
    <p class="mb-8 text-sm opacity-30">powered by ytdl-core</p>
    <p>work in progress</p>
  </div>
</template>
<script lang="ts">
export default {
  name: "IndexPage",
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
