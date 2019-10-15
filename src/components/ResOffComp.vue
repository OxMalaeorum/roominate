<template>
  <v-flex xs12 mt-2>
    <v-card
      tile
      flat
      hover
      style="outline: 1px solid rgba(0,0,0,0.5)"
      @click.capture="setSelectedResidence"
      to="/officer/residence_detail"
    >
      <v-layout row pa-3 align-center justify-start>
        <v-flex xs1>
          <v-card flat tile>
            <v-img
              :src="require('@/assets/logo.png')"
              height="50px"
              contain
            ></v-img>
          </v-card>
        </v-flex>

        <v-flex xs3>
          <h3>{{ residence.name }}</h3>
        </v-flex>

        <v-flex xs4>
          <blockquote class="bquote">{{ residence.address }}</blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <blockquote class="bquote">{{ units.length }} units</blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <h3>{{ applications.length }} applications</h3>
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex xs1>
          <v-btn color="blue" flat>View</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["residence"],
  mounted() {
    this.setUnits();
    this.setApplications();
  },
  data() {
    return {
      units: [],
      applications: []
    };
  },
  computed: {
    getUnits() {
      return this.$store.getters.getUnits;
    },
    getApplications() {
      return this.$store.getters.getApplications;
    }
  },
  watch: {
    getUnits() {
      this.units = this.$store.getters.getUnits.filter(
        unit => unit.residenceID == this.residence.residenceID
      );
    },
    getApplications() {
      let allApps = this.$store.getters.getApplications;
      for (let i = 0; i < this.units.length; i++) {
        for (let j = 0; j < allApps.length; j++) {
          if (allApps[j].unitID == this.units[i].unitID) {
            this.applications.push(allApps[j]);
          }
        }
      }
    }
  },
  methods: {
    setSelectedResidence() {
      this.$store.commit("setSelectedResidence", this.residence);

      let residenceUnits = this.$store.getters.getUnits.filter(
        unit => unit.residenceID == this.residence.residenceID
      );
      this.$store.commit("setResidenceUnits", residenceUnits);
    },
    setUnits() {
      this.units = this.$store.getters.getUnits.filter(
        unit => unit.residenceID == this.residence.residenceID
      );
    },
    setApplications() {
      let allApps = this.$store.getters.getApplications;
      for (let i = 0; i < this.units.length; i++) {
        for (let j = 0; j < allApps.length; j++) {
          if (allApps[j].unitID == this.units[i].unitID) {
            this.applications.push(allApps[j]);
          }
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bquote {
  font-size: 16px;
  padding: 0;
}

.v-input--selection-controls {
  margin: 0;
  padding: 0;
}
</style>
