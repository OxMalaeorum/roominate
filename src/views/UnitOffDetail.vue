<template>
  <v-layout ma-5 px-3 fill-height>
    <v-flex py-3 fill-height>
      <v-card min-height="100%">
        <v-form>
          <v-layout row wrap pa-4>
            <v-flex text-xs-left px-3 ml-4>
              <h1>Unit {{ unit.unitID }}</h1>
            </v-flex>

            <v-flex xs12 pt-3>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>

          <v-layout row px-5 pb-3 align-start justify-space-between>
            <v-flex px-5>
              <v-layout align-start pa-2>
                <v-flex xs5 text-xs-left pt-3>
                  <h3>Size:</h3>
                </v-flex>
                <v-flex class="editable" xs7>
                  <v-text-field
                    v-model="unit.size"
                    :disabled="disableEdit"
                    :flat="disableEdit"
                    label="Size"
                    solo
                    hide-details
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-center pa-2>
                <v-flex xs5 text-xs-left>
                  <h3>Monthly Rental:</h3>
                </v-flex>
                <v-flex class="editable" xs7>
                  <v-text-field
                    v-model="unit.monthlyRental"
                    :disabled="disableEdit"
                    :flat="disableEdit"
                    label="Monthly Rental"
                    solo
                    hide-details
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-center pa-2>
                <v-flex xs5 text-xs-left>
                  <h3>Availability:</h3>
                </v-flex>
                <v-flex class="editable" xs7>
                  <v-text-field
                    v-model="unit.availability"
                    disabled
                    flat
                    label="Availability"
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
              <h1>Applications</h1>
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
                <v-layout row fill-height align-center justify-start>
                  <v-flex xs10>
                    <v-layout>
                      <v-flex xs2 text-xs-center>
                        <blockquote class="bquote1">Application ID</blockquote>
                      </v-flex>

                      <v-flex xs2 text-xs-center>
                        <blockquote class="bquote1">Application Date</blockquote>
                      </v-flex>

                      <v-flex xs2 text-xs-center>
                        <blockquote class="bquote1">Required Date</blockquote>
                      </v-flex>

                      <v-flex xs2 text-xs-center>
                        <blockquote class="bquote1">Duration</blockquote>
                      </v-flex>

                      <v-flex xs2 text-xs-center>
                        <blockquote class="bquote1">Monthly Income</blockquote>
                      </v-flex>

                      <v-flex xs2 text-xs-center>
                        <blockquote class="bquote1">Status</blockquote>
                      </v-flex>
                    </v-layout>
                  </v-flex>

                  <v-flex xs2 text-xs-right></v-flex>
                </v-layout>
              </v-card>
            </v-flex>

            <v-flex xs12>
              <Applicationoff-comp
                v-for="(application, index) in applications"
                :key="index"
                :application="application"
                :unit="unit"
              ></Applicationoff-comp>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import ApplicationoffComp from "../components/ApplicationOffComp";

export default {
  components: {
    ApplicationoffComp
  },
  mounted() {
    this.initData();
  },
  data() {
    return {
      unit: {},
      applications: [],
      disableEdit: true
    };
  },
  computed: {
    getUnit() {
      return this.$store.getters.getSelectedUnit;
    },
    getApplications() {
      return this.$store.getters.getUnitApplications;
    }
  },
  watch: {
    getUnit() {
      this.unit = this.$store.getters.getSelectedUnit;
    },
    getApplications() {
      this.applications = this.$store.getters.getUnitApplications;
    }
  },
  methods: {
    initData() {
      this.unit = this.$store.getters.getSelectedUnit;
      this.applications = this.$store.getters.getUnitApplications;
    }
  }
};
</script>

<style lang="scss">
.editable {
  .theme--light.v-input--is-disabled input {
    color: rgba(0, 0, 0, 0.8);
  }
}

.bquote1 {
  font-size: 16px;
  padding: 0;
}
</style>
