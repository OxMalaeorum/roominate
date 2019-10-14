<template>
  <div id="app">
    <v-app>
      <v-content style="padding-top: 0;">
        <v-container fluid pa-0 mb-5>
          <router-view :key="$route.params.type" />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
</style>
