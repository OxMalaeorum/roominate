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
            <v-flex xs1 text-xs-right>
              <v-btn v-if="disableEdit" icon @click="disableEdit = !disableEdit">
                <v-icon>edit</v-icon>
              </v-btn>
              <v-btn v-else icon @click="disableEdit = !disableEdit">
                <v-icon>save</v-icon>
              </v-btn>
            </v-flex>
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
                <v-layout justify-end>
                  <v-flex shrink class="add">
                    <v-dialog v-model="showDialog" width="60%" height="60%">
                      <template v-slot:activator="{ on }">
                        <v-btn small depressed v-on="on">New Unit</v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>
                          <v-flex xs5 px-2 mx-5 text-xs-left>
                            <h4>New Unit</h4>
                          </v-flex>
                        </v-card-title>

                        <v-card-text>
                          <v-form ref="unitForm" v-model="valid" lazy-validation>
                            <v-layout align-start pa-2 mx-5>
                              <v-flex xs5 text-xs-left>
                                <v-layout row wrap>
                                  <v-flex xs12 py-3>
                                    <h3>Size:</h3>
                                  </v-flex>
                                  <v-flex xs12></v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs7>
                                <v-text-field
                                  v-model="newUnit.size"
                                  :rules="sizeRules"
                                  label="Size"
                                  solo
                                  required
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-layout align-start pa-2 mx-5>
                              <v-flex xs5 text-xs-left>
                                <v-layout row wrap>
                                  <v-flex xs12 py-3>
                                    <h3>Monthly Rental:</h3>
                                  </v-flex>
                                  <v-flex xs12></v-flex>
                                </v-layout>
                              </v-flex>
                              <v-flex xs7>
                                <v-text-field
                                  v-model="newUnit.monthlyRental"
                                  :rules="MonthlyRentalRules"
                                  label="Monthly Rental"
                                  solo
                                  required
                                ></v-text-field>
                              </v-flex>
                            </v-layout>
                          </v-form>
                        </v-card-text>
                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" flat @click="cancelDialog">Cancel</v-btn>
                          <v-btn color="primary" @click="addNewUnit">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-flex>

            <v-flex xs12>
              <Unitoff-comp v-for="(unit, index) in units" :key="index" :unit="unit"></Unitoff-comp>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import UnitoffComp from "../components/UnitOffComp";

export default {
  components: {
    UnitoffComp
  },
  mounted() {
    this.$store.dispatch("fetchUnits");
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
      valid: true,
      sizeRules: [
        v => !!v || "Size is required",
        v => v > 0 || "Size must be a number"
      ],
      MonthlyRentalRules: [
        v => !!v || "Monthly rental is required",
        v => v > 0 || "Monthly rental must be a number"
      ],
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
      if (this.$refs.unitForm.validate()) {
        this.$store.dispatch("addNewUnit", this.newUnit);
        this.cancelDialog();
      }
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
      this.$refs.unitForm.reset();
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

.add {
  .v-btn {
    border-radius: 4px;
    margin: 1px;
  }
}
</style>
