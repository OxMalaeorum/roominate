<template>
  <v-layout row ma-5 px-3>
    <v-flex>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>Residences</h1>
        </v-flex>
        <v-flex xs12>
          <v-card
            color="rgba(0,0,0,0.2)"
            style="outline: 2px solid rgba(0,0,0,0.2)"
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
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <Resapp-comp
            v-for="(res, index) in getFilteredResidences"
            :key="index"
            :residence="res"
          ></Resapp-comp>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import ResappComp from "../components/ResAppComp";

export default {
  components: {
    ResappComp
  },
  data() {
    return {
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
      this.$store.commit("addResidence", this.newResidence);
      this.cancelDialog();
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
        numUnits: "",
        sizePerUnit: "",
        monthlyRental: "",
        createdBy: ""
      };
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
