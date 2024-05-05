<template>
  <div class="p-4 text-xl">
    <div>> trace</div>
    coming soon...
  </div>
</template>
<script lang="ts">
export default {
  name: "IndexPage",
  data() {
    return {};
  },
  mounted() {},
  /*computed: {
    actions() {
      return towerdata.actions.sort((a, b) => a.studs - b.studs);
    },
    ownedActions() {
      return towerdata.actions
        //.filter((el) => this.playerBadges.includes(el.badge))
        .filter((el) => this.playerBadges.includes(el.badge))
        .sort((a, b) => a.studs - b.studs); // b-a descending a-b ascending
    },
  },*/
  methods: {
    pushto(to: any) {
      this.$router.push(to);
    },
  },
};
</script>
