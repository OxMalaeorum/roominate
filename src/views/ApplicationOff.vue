<template>
  <v-layout row ma-5 px-3>
    <v-flex>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>Applications</h1>
        </v-flex>
        <v-flex xs12></v-flex>
        <v-flex xs12 py-2 v-for="(res, index) in getResidences" :key="index">
          <v-card
            tile
            flat
            color="rgba(0,0,0,0.3)"
            style="outline: 2px solid rgba(0,0,0,0.3)"
          >
            <v-flex>Residence: {{ res.name }}</v-flex>
          </v-card>
          <v-flex
            xs12
            py-2
            pl-3
            v-for="(unit, ind) in getUnits(res.residenceID)"
            :key="ind"
          >
            <v-card
              tile
              flat
              color="rgba(0,0,0,0.2)"
              style="outline: 2px solid rgba(0,0,0,0.2)"
            >
              <v-flex>Unit: {{ unit.unitID }}</v-flex>
            </v-card>
            <v-flex
              xs12
              py-2
              pl-3
              v-for="(app, i) in getApplications(unit.unitID)"
              :key="i"
            >
              <v-card
                tile
                flat
                color="rgba(0,0,0,0.1)"
                style="outline: 2px solid rgba(0,0,0,0.1)"
              >
                <v-flex>Application: {{ app.applicationID }}</v-flex>
              </v-card>
            </v-flex>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      newResidence: {
        residenceID: "",
        name: "",
        address: "",
        numUnits: "",
        sizePerUnit: "",
        monthlyRental: "",
        createdBy: ""
      }
    };
  },
  computed: {
    getResidences() {
      return this.$store.getters.getResidences;
    }
  },
  methods: {
    getUnits(resID) {
      return this.$store.getters.getUnits.filter(
        unit => unit.residenceID == resID
      );
    },
    getApplications(uID) {
      return this.$store.getters.getApplications.filter(
        application => application.unitID == uID
      );
    }
  }
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
