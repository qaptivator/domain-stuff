<template>
  <div class="p-4 text-xl">
    <h1>> best external tools</h1>
    <p class="mb-8">
      the best website open source tools, which prefer utility and quality over
      annoyance
    </p>
    <p class="mb-2">
      this is a list of best open source websites, which have some utilitary
      functions.<br />
      these are hand picked by my personal preference, so you are not forced to
      use them.<br />
      i am not responsible for any issues, occuring on these external websites,
      because they are not owned by me.
    </p>
    <ul>
      <li>
        >
        <NuxtLink
          class="no-underline hover:underline"
          to="https://cobalt.tools/"
          target="_blank"
          >cobalt.tools by imput</NuxtLink
        >
      </li>
      <li>
        >
        <NuxtLink
          class="no-underline hover:underline"
          to="https://quickpic.t3.gg/"
          target="_blank"
          >QuickPic by t3dotgg</NuxtLink
        >
      </li>
      <li>
        >
        <NuxtLink
          class="no-underline hover:underline"
          to="https://carbon.now.sh/"
          target="_blank"
          >carbon by carbon_app</NuxtLink
        >
      </li>
      <li>
        >
        <NuxtLink
          class="no-underline hover:underline"
          to="https://www.realtimecolors.com/"
          target="_blank"
          >Realtime Colors by Juxtopposed</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: "External tools",
  data() {
    return {};
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
