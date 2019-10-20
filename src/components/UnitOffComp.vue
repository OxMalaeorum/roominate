<template>
  <v-flex xs12 mt-2>
    <v-card
      tile
      flat
      hover
      style="outline: 1px solid rgba(0,0,0,0.5)"
      @click.capture="setSelectedUnit"
      to="/officer/unit_detail"
    >
      <v-layout row pa-3 align-center justify-start>
        <v-flex xs2 text-xs-center>
          <blockquote class="bquote">{{ unit.unitID }}</blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <blockquote class="bquote">{{ unit.size }}ft2</blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <blockquote class="bquote">RM{{ unit.monthlyRental }}/mo</blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <blockquote
            :style="
              getAvailability == 'Available' ? 'color: green' : 'color: black'
            "
            class="bquote"
          >
            {{ getAvailability }}
          </blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <h3>{{ applications.length }} applications</h3>
        </v-flex>

        <v-flex xs2 text-xs-right>
          <v-btn color="blue" flat>View</v-btn>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["unit"],
  mounted() {
    this.initData();
  },
  data() {
    return {
      applications: []
    };
  },
  computed: {
    getApplications() {
      return this.$store.getters.getApplications;
    },
    getAvailability() {
      if (this.unit.availability == "Yes") {
        return "Available";
      } else {
        return "Occupied";
      }
    }
  },
  watch: {
    getApplications() {
      let unitApplications = this.$store.getters.getApplications.filter(
        application => application.unitID == this.unit.unitID
      );

      this.applications = unitApplications;
    }
  },
  methods: {
    setSelectedUnit() {
      this.$store.commit("setSelectedUnit", this.unit);
      this.$store.commit("setUnitApplications", this.applications);
    },
    initData() {
      let unitApplications = this.$store.getters.getApplications.filter(
        application => application.unitID == this.unit.unitID
      );

      this.applications = unitApplications;
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
