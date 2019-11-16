<template>
  <v-layout row ma-5 px-3>
    <v-flex>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>My Applications</h1>
        </v-flex>

        <v-divider></v-divider>

        <v-flex xs12>
          <Applicationapp-comp
            v-for="(application, index) in getApplications"
            :key="index"
            :application="application"
          ></Applicationapp-comp>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import ApplicationappComp from "../components/ApplicationAppComp";

export default {
  components: {
    ApplicationappComp
  },
  data() {
    return {
      applications: []
    };
  },
  computed: {
    getApplications() {
      let applicant = this.$store.getters.getLoggedInUser;
      return this.$store.getters.getApplications.filter(
        application => application.userID == applicant.userID
      );
    }
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
.bquote {
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.add {
  .v-btn {
    border-radius: 4px;
    margin: 1px;
  }
}
</style>
