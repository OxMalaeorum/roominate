<template>
  <v-layout row ma-5 px-3>
    <v-flex>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>Residences</h1>
        </v-flex>
        <v-flex xs12>
          <v-card
            color="rgba(92,142,190,0.8)"
            style="outline: 1px solid rgba(92,142,190,0.8)"
            height="30px"
            tile
            flat
          >
            <v-layout justify-space-between>
              <v-flex shrink class="add">
                <v-menu :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <v-btn small depressed v-on="on">Filter</v-btn>
                  </template>
                  <v-card width="300px">
                    <v-flex pa-2>
                      <v-layout pl-1>
                        <h4>Show residences in:</h4>
                      </v-layout>
                      <v-layout row wrap>
                        <v-flex xs6>
                          <v-checkbox
                            v-model="showKL"
                            label="Kuala Lumpur"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs6>
                          <v-checkbox
                            v-model="showSelangor"
                            label="Selangor"
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs6>
                          <v-checkbox
                            v-model="showJohor"
                            label="Johor"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs6>
                          <v-checkbox
                            v-model="showPenang"
                            label="Penang"
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                      <v-layout>
                        <v-flex xs6>
                          <v-checkbox
                            v-model="showTerengganu"
                            label="Terengganu"
                          ></v-checkbox>
                        </v-flex>
                        <v-flex xs6>
                          <v-checkbox
                            v-model="showMelaka"
                            label="Melaka"
                          ></v-checkbox>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-card>
                </v-menu>
              </v-flex>

              <v-flex shrink class="add">
                <v-dialog v-model="showDialog" width="60%" height="60%">
                  <template v-slot:activator="{ on }">
                    <v-btn small depressed v-on="on">New Residence</v-btn>
                  </template>

                  <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>
                      <v-flex xs5 px-2 mx-5 text-xs-left>
                        <h4>New Residence</h4>
                      </v-flex>
                    </v-card-title>

                    <v-card-text>
                      <v-form
                        ref="residenceForm"
                        v-model="valid"
                        lazy-validation
                      >
                        <v-layout align-start pa-2 mx-5>
                          <v-flex xs5 text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs12 py-3>
                                <h3>Residence Name:</h3>
                              </v-flex>
                              <v-flex xs12></v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs7>
                            <v-text-field
                              v-model="newResidence.name"
                              :rules="nameRules"
                              label="Residence Name"
                              solo
                              required
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-layout align-start pa-2 mx-5>
                          <v-flex xs5 text-xs-left pt-3>
                            <h3>Address:</h3>
                          </v-flex>
                          <v-flex xs7>
                            <v-textarea
                              v-model="newResidence.address"
                              :rules="addressRules"
                              label="Address"
                              auto-grow
                              solo
                              required
                            ></v-textarea>
                          </v-flex>
                        </v-layout>
                        <v-layout align-start pa-2 mx-5>
                          <v-flex xs5 text-xs-left>
                            <v-layout row wrap>
                              <v-flex xs12 py-3>
                                <h3>State:</h3>
                              </v-flex>
                              <v-flex xs12></v-flex>
                            </v-layout>
                          </v-flex>
                          <v-flex xs7>
                            <v-select
                              v-model="newResidence.state"
                              :rules="stateRules"
                              :items="stateSelect"
                              label="State"
                              solo
                            ></v-select>
                          </v-flex>
                        </v-layout>
                      </v-form>
                    </v-card-text>
                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" flat @click="cancelDialog"
                        >Cancel</v-btn
                      >
                      <v-btn color="primary" @click="addNewResidence"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <Resoff-comp
            v-for="(res, index) in getFilteredResidences"
            :key="index"
            :residence="res"
          ></Resoff-comp>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import ResoffComp from "../components/ResOffComp";

export default {
  components: {
    ResoffComp
  },
  data() {
    return {
      showDialog: false,
      newResidence: {
        residenceID: "",
        name: "",
        address: "",
        state: ""
      },
      valid: true,
      nameRules: [v => !!v || "Name is required"],
      addressRules: [v => !!v || "Address is required"],
      stateRules: [v => !!v || "State is required"],
      stateSelect: [
        "Kuala Lumpur",
        "Selangor",
        "Johor",
        "Penang",
        "Terengganu",
        "Melaka"
      ],
      showKL: false,
      showSelangor: false,
      showJohor: false,
      showPenang: false,
      showTerengganu: false,
      showMelaka: false,
      states: []
    };
  },
  computed: {
    getResidences() {
      return this.$store.getters.getResidences;
    },
    getFilteredResidences() {
      let allRes = this.$store.getters.getResidences;
      let filteredRes = [];
      if (this.states.length > 0) {
        for (let i = 0; i < allRes.length; i++) {
          for (let j = 0; j < this.states.length; j++) {
            if (allRes[i].state === this.states[j]) {
              filteredRes.push(allRes[i]);
            }
          }
        }
        return filteredRes;
      }
      return allRes;
    }
  },
  watch: {
    showKL() {
      if (this.showKL) {
        this.states.push("Kuala Lumpur");
      } else {
        this.states = this.states.filter(s => s !== "Kuala Lumpur");
      }
    },
    showSelangor() {
      if (this.showSelangor) {
        this.states.push("Selangor");
      } else {
        this.states = this.states.filter(s => s !== "Selangor");
      }
    },
    showJohor() {
      if (this.showJohor) {
        this.states.push("Johor");
      } else {
        this.states = this.states.filter(s => s !== "Johor");
      }
    },
    showPenang() {
      if (this.showPenang) {
        this.states.push("Penang");
      } else {
        this.states = this.states.filter(s => s !== "Penang");
      }
    },
    showTerengganu() {
      if (this.showTerengganu) {
        this.states.push("Terengganu");
      } else {
        this.states = this.states.filter(s => s !== "Terangganu");
      }
    },
    showMelaka() {
      if (this.showMelaka) {
        this.states.push("Melaka");
      } else {
        this.states = this.states.filter(s => s !== "Melaka");
      }
    }
  },
  methods: {
    initData() {
      this.newResidence.residenceID = this.nextResidenceID(
        this.$store.getters.getResidences[
          this.$store.getters.getResidences.length - 1
        ].residenceID
      );
    },
    addNewResidence() {
      if (this.$refs.residenceForm.validate()) {
        this.$store.commit("addResidence", this.newResidence);
        this.cancelDialog();
      }
    },
    cancelDialog() {
      this.showDialog = false;
      this.newResidence = {
        residenceID: this.nextResidenceID(
          this.$store.getters.getResidences[
            this.$store.getters.getResidences.length - 1
          ].residenceID
        ),
        name: "",
        address: "",
        state: ""
      };
      this.$refs.residenceForm.reset();
    },
    nextResidenceID(lastResidenceID) {
      let nextInt = parseInt(lastResidenceID.split("R")[1]) + 1;
      return "R" + ("00000" + nextInt).substr(-4);
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
