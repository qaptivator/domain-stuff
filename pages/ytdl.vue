<template>
  <div class="p-4 text-xl">
    <div>> youtube download</div>
    <p>download a youtube video from url</p>
    <p class="mb-8 text-sm opacity-30">powered by ytdl-core</p>
    <div class="flex w-full max-w-80">
      <input
        type="url"
        class="border p-2 grow w-40"
        placeholder="your video url"
        v-model="videoUrl"
        @keyup.enter="submitForm"
      />
      <button
        type="button"
        class="border p-2 px-4 disabled:opacity-30"
        :disabled="!validateForm"
        @click="submitForm"
      >
        go
      </button>
    </div>
    <p v-if="loading" class="my-8">{{ loadingText }}</p>
    <p v-if="errorStatus" class="my-8 text-red-500">{{ errorStatus }}</p>
    <div v-if="videoInfo && videoInfo?.title && videoInfo?.author" class="mt-8">
      <p>{{ `video title: ${videoInfo.title}` }}</p>
      <p>{{ `video author: ${videoInfo.author}` }}</p>
    </div>
    <div v-if="submitted" class="my-8">
      <p>finished downloading!</p>
      <p>
        if the download didn't start,
        <b class="cursor-pointer" @click="downloadVideoBlob">click here</b>
      </p>
    </div>
  </div>
</template>
<script lang="ts">
import ytdl from "ytdl-core";
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
  mounted() {
    (window as any).process = {
      env: { DEBUG: undefined },
      nextTick: (callback, ...args) => {
        return this.$nextTick(callback);
      },
    };
  },
  computed: {
    validateForm() {
      // i could add a check for protocol but i am too lazy
      return (
        this.videoUrl && this.videoUrl !== "" && ytdl.validateURL(this.videoUrl)
      );
    },
    loadingText() {
      return `downloading... ${this.loadingLeft}/${this.loadingTotal}`;
    },
  },
  methods: {
    routerPush(to: any) {
      this.$router.push(to);
    },
    async submitForm() {
      if (!this.validateForm) return;
      this.submitted = false;
      this.errorStatus = "";
      this.loadingTotal = 0;
      this.loadingLeft = 0;
      this.videoInfo = null;
      this.videoFormat = null;
      this.videoBlob = null;
      this.loading = true;

      let blobData: BlobPart[] = [];
      ytdl(this.videoUrl)
        .on(
          "info",
          (videoInfo: ytdl.videoInfo, videoFormat: ytdl.videoFormat) => {
            this.videoInfo = videoInfo;
            this.videoFormat = videoFormat;
          }
        )
        .on(
          "progress",
          (chunkLength: number, bytesLeft: number, bytesTotal: number) => {
            this.loadingLeft = bytesLeft;
            this.loadingTotal = bytesTotal;
          }
        )
        //.on("response", (res) => {
        //  this.loadingTotal = parseInt(res.headers["content-length"], 10);
        //})
        .on("data", (data: any) => {
          blobData.push(data);
          //this.loadingLeft += data.length;
        })
        .on("finish", () => {
          this.loading = false;
          console.log("done");
          this.videoBlob = new Blob(blobData, {
            type: this.videoFormat.mimeType,
          });
          this.downloadVideoBlob();
          this.submitted = true;
        });
    },
    async downloadVideoBlob() {
      if (
        this.validateForm &&
        this.submitted &&
        !this.loading &&
        this.videoBlob
      )
        this.downloadFromBlob(this.videoBlob);
    },
  },
};
</script>
