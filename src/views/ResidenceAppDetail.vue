<template>
  <v-layout ma-5 px-3 fill-height>
    <v-flex py-3 fill-height>
      <v-card min-height="100%">
        <v-form>
          <v-layout row wrap pa-4>
            <v-flex xs8 class="editableTitle" text-xs-left px-3 ml-2>
              <v-text-field
                v-model="residence.name"
                :disabled="disableEdit"
                :flat="disableEdit"
                label="Name"
                solo
                hide-details
                required
              ></v-text-field>
            </v-flex>

            <v-flex xs12 pt-3>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>

          <v-layout row px-5 pb-3 align-start justify-space-between>
            <v-flex xs1>
              <v-card flat tile>
                <v-img :src="require('@/assets/logo.png')" contain></v-img>
              </v-card>
            </v-flex>
            <v-flex px-5>
              <v-layout align-start pa-2>
                <v-flex xs5 text-xs-left pt-3>
                  <h3>Address:</h3>
                </v-flex>
                <v-flex class="editable" xs7>
                  <v-textarea
                    v-model="residence.address"
                    :disabled="disableEdit"
                    :flat="disableEdit"
                    label="Address"
                    auto-grow
                    solo
                    hide-details
                    required
                  ></v-textarea>
                </v-flex>
              </v-layout>

              <v-layout align-center pa-2>
                <v-flex xs5 text-xs-left>
                  <h3>Number of units:</h3>
                </v-flex>
                <v-flex class="editable" xs7>
                  <v-text-field
                    v-model="units.length"
                    disabled
                    flat
                    label="Number of Units"
                    solo
                    hide-details
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex xs1></v-flex>
            <v-flex xs1 text-xs-right></v-flex>
          </v-layout>

          <v-layout row wrap pa-4>
            <v-flex text-xs-left px-3 ml-4>
              <h1>Units</h1>
            </v-flex>

            <v-flex xs12 pt-3>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>

          <v-layout row wrap px-5 pb-3>
            <v-flex xs12 mt-2>
              <v-card
                tile
                flat
                color="rgba(92,142,190,0.8)"
                style="outline: 1px solid rgba(92,142,190,0.8)"
                height="30px"
              >
                <v-layout row px-3 fill-height align-center justify-start>
                  <v-flex xs2 text-xs-center>
                    <blockquote class="bquote1">Unit ID</blockquote>
                  </v-flex>

                  <v-flex xs2 text-xs-center>
                    <blockquote class="bquote1">Size</blockquote>
                  </v-flex>

                  <v-flex xs2 text-xs-center>
                    <blockquote class="bquote1">Monthly Rental</blockquote>
                  </v-flex>

                  <v-flex xs2 text-xs-center>
                    <blockquote class="bquote1">Availability</blockquote>
                  </v-flex>

                  <v-spacer></v-spacer>

                  <v-flex xs2 text-xs-right></v-flex>
                </v-layout>
              </v-card>
            </v-flex>

            <v-flex xs12>
              <Unitapp-comp v-for="(unit, index) in units" :key="index" :unit="unit"></Unitapp-comp>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UnitappComp from "../components/UnitAppComp";

export default {
  components: {
    UnitappComp
  },
  data() {
    return {
      residence: {},
      units: [],
      newUnit: {
        unitID: "",
        size: "",
        monthlyRental: "",
        availability: "Yes",
        residenceID: ""
      },
      showDialog: false,
      disableEdit: true
    };
  },
  computed: {
    getResidence() {
      return this.$store.getters.getSelectedResidence;
    },
    getUnits() {
      return this.$store.getters.getUnits;
    }
  },
  watch: {
    getResidence() {
      this.residence = this.$store.getters.getSelectedResidence;
    },
    getUnits() {
      this.units = this.$store.getters.getUnits.filter(
        unit => unit.residenceID == this.residence.residenceID
      );
    }
  },
  methods: {
    initData() {
      this.residence = this.$store.getters.getSelectedResidence;
      this.units = this.$store.getters.getUnits.filter(
        unit =>
          unit.residenceID ==
          this.$store.getters.getSelectedResidence.residenceID
      );
      this.newUnit.unitID = this.nextUnitID(
        this.$store.getters.getUnits[this.$store.getters.getUnits.length - 1]
          .unitID
      );
      this.newUnit.residenceID = this.residence.residenceID;
    },
    addNewUnit() {
      this.$store.commit("addUnit", this.newUnit);
      this.cancelDialog();
    },
    cancelDialog() {
      this.showDialog = false;
      this.newUnit = {
        unitID: this.nextUnitID(
          this.$store.getters.getUnits[this.$store.getters.getUnits.length - 1]
            .unitID
        ),
        size: "",
        monthlyRental: "",
        availability: "Yes",
        residenceID: this.residence.residenceID
      };
    },
    nextUnitID(lastUnitID) {
      let nextInt = parseInt(lastUnitID.split("U")[1]) + 1;
      return "U" + ("00000" + nextInt).substr(-4);
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style lang="scss">
.editableTitle {
  .v-input {
    font-size: 30px;
    font-weight: bold;
  }

  .theme--light.v-input--is-disabled input {
    color: rgba(0, 0, 0, 0.8);
  }
}

.editable {
  .theme--light.v-input--is-disabled input {
    color: rgba(0, 0, 0, 0.8);
  }

  .theme--light.v-input--is-disabled textarea {
    color: rgba(0, 0, 0, 0.8);
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

.add {
  .v-btn {
    border-radius: 4px;
    margin: 1px;
  }
}
</style>
