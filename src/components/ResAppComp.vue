<template>
  <v-flex xs12 mt-2>
    <v-card
      tile
      flat
      hover
      style="outline: 2px solid rgba(0,0,0,0.5)"
      @click.capture="setSelectedResidence"
      to="/applicant/residence_detail"
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
          <h3>{{ residence.address }}</h3>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <h3>{{ units.length }} units</h3>
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
    }
  },
  watch: {
    getUnits() {
      this.units = this.$store.getters.getUnits.filter(
        unit => unit.residenceID == this.residence.residenceID
      );
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
