<template>
  <v-flex xs12 mt-2>
    <v-card tile flat style="outline: 1px solid rgba(0,0,0,0.5)">
      <v-layout row py-3 align-center justify-start px-3>
        <v-flex xs5>
          <v-layout>
            <v-flex xs6 text-xs-left>
              <h3>Application ID:</h3>
            </v-flex>

            <v-flex xs6 text-xs-left>
              <blockquote class="bquote1">{{ application.applicationID }}</blockquote>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6 text-xs-left>
              <h3>Application Date:</h3>
            </v-flex>

            <v-flex xs6 text-xs-left>
              <blockquote class="bquote1">{{ application.applicationDate }}</blockquote>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6 text-xs-left>
              <h3>Required Date:</h3>
            </v-flex>

            <v-flex xs6 text-xs-left>
              <blockquote
                class="bquote1"
              >{{ application.startYear }}-{{ monthFormat(application.startMonth) }}</blockquote>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6 text-xs-left>
              <h3>Duration:</h3>
            </v-flex>

            <v-flex xs6 text-xs-left>
              <blockquote class="bquote1">{{ application.duration }} months</blockquote>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs5>
          <v-layout>
            <v-flex xs6 text-xs-left>
              <h3>Residence:</h3>
            </v-flex>

            <v-flex xs6 text-xs-left>
              <blockquote class="bquote1">{{ residence.name }}</blockquote>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6 text-xs-left>
              <h3>Unit ID:</h3>
            </v-flex>

            <v-flex xs6 text-xs-left>
              <blockquote class="bquote1">{{ unit.unitID }}</blockquote>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6 text-xs-left>
              <h3>Size:</h3>
            </v-flex>

            <v-flex xs6 text-xs-left>
              <blockquote class="bquote1">{{ unit.size }}ft&sup2;</blockquote>
            </v-flex>
          </v-layout>

          <v-layout>
            <v-flex xs6 text-xs-left>
              <h3>Monthly Rental:</h3>
            </v-flex>

            <v-flex xs6 text-xs-left>
              <blockquote class="bquote1">RM{{ unit.monthlyRental }}</blockquote>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <h3
            :style="application.status == 'Approved' ? 'color: green' : application.status == 'Pending' ? 'color: orange;' : 'color: red;'"
          >{{ application.status }}</h3>
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
      residence: {},
      unit: {}
    };
  },
  computed: {
    getResidences() {
      return this.$store.getters.getResidences;
    },
    getUnits() {
      return this.$store.getters.getUnits;
    }
  },
  methods: {
    initData() {
      this.unit = this.$store.getters.getUnits.filter(
        unit => unit.unitID == this.application.unitID
      )[0];
      this.residence = this.$store.getters.getResidences.filter(
        residence => residence.residenceID == this.unit.residenceID
      )[0];
    },
    monthFormat(month) {
      if (month < 10) {
        return "0" + month;
      }
      return month;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-input--selection-controls {
  margin: 0;
  padding: 0;
}

.app_btn {
  .v-btn {
    margin: 0;
    padding: 0;
  }
}

.statusTextfield {
  .v-text-field {
    margin: 0;
    padding: 0;
  }
}

.bquote {
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.bquote1 {
  font-size: 16px;
  padding: 0;
}
</style>
