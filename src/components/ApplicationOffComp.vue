<template>
  <v-flex xs12 mt-2>
    <v-card tile flat style="outline: 1px solid rgba(0,0,0,0.5)">
      <v-layout row pa-3 align-center justify-start>
        <v-flex xs3>
          <h3>{{ application.applicationID }}</h3>
        </v-flex>

        <v-flex xs3>
          <h3>{{ application.applicationDate }}</h3>
        </v-flex>

        <v-flex xs3>
          <h3>{{ application.startMonth }}</h3>
        </v-flex>

        <v-flex xs3>
          <h3>{{ application.startYear }}</h3>
        </v-flex>

        <v-flex xs3>
          <h3>{{ application.duration }}</h3>
        </v-flex>

        <v-flex xs3>
          <h3>{{ application.status }}</h3>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["application"],
  mounted() {
    this.initData();
  },
  data() {
    return {
      applicant: {}
    };
  },
  methods: {
    initData() {
      let applicant = this.$store.getters.getUsers.filter(
        user => user.userID == this.application.userID
      );

      this.applicant = applicant;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-input--selection-controls {
  margin: 0;
  padding: 0;
}
</style>
