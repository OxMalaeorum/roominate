<template>
  <v-flex xs12 mt-2>
    <v-card tile flat style="outline: 1px solid rgba(0,0,0,0.5)">
      <v-layout row pa-3 align-center justify-start>
        <v-flex xs2 text-xs-center>
          <blockquote class="bquote">{{ unit.unitID }}</blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <blockquote class="bquote">{{ unit.size }}ft&sup2;</blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <blockquote class="bquote">RM{{ unit.monthlyRental }}</blockquote>
        </v-flex>

        <v-flex xs2 text-xs-center>
          <blockquote
            :style="
              getAvailability == 'Available' ? 'color: green' : 'color: black'
            "
            class="bquote"
          >{{ getAvailability }}</blockquote>
        </v-flex>

        <v-spacer></v-spacer>

        <v-flex xs2 text-xs-right>
          <v-dialog v-model="dialog" width="60%" height="60%">
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="getAvailability == 'Available' && notApplied"
                v-on="on"
                color="blue"
                flat
              >Apply</v-btn>
              <v-btn v-else flat disabled>Applied</v-btn>
            </template>
            <v-card>
              <v-card-title class="headline grey lighten-2" primary-title>
                <v-flex xs5 px-2 mx-5 text-xs-left>
                  <h4>New Application</h4>
                </v-flex>
              </v-card-title>

              <v-card-text>
                <v-form ref="applicationForm" v-model="valid" lazy-validation>
                  <v-layout align-start pa-2 mx-5>
                    <v-flex xs5 text-xs-left>
                      <v-layout row wrap>
                        <v-flex xs12 py-3>
                          <h3>Required Month:</h3>
                        </v-flex>
                        <v-flex xs12></v-flex>
                      </v-layout>
                    </v-flex>
                    <v-flex xs7>
                      <v-text-field
                        v-model="newApplication.startMonth"
                        :rules="monthRules"
                        label="Required Month (e.g. 4)"
                        solo
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout align-start pa-2 mx-5>
                    <v-flex xs5 text-xs-left pt-3>
                      <h3>Required Year:</h3>
                    </v-flex>
                    <v-flex xs7>
                      <v-text-field
                        v-model="newApplication.startYear"
                        :rules="yearRules"
                        label="Required Year (e.g. 2018)"
                        solo
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-layout align-start pa-2 mx-5>
                    <v-flex xs5 text-xs-left>
                      <v-layout row wrap>
                        <h3>Duration:</h3>
                      </v-layout>
                    </v-flex>
                    <v-flex xs7>
                      <v-radio-group v-model="newApplication.duration" mandatory row>
                        <v-radio label="6 months" value="6"></v-radio>
                        <v-radio label="12 months" value="12"></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-card-text>
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="cancelDialog">Cancel</v-btn>
                <v-btn color="primary" @click="addNewApplication">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      applications: [],
      dialog: false,
      newApplication: {
        applicationID: this.nextApplicationID(
          this.$store.getters.getApplications[
            this.$store.getters.getApplications.length - 1
          ].applicationID
        ),
        applicationDate: "",
        startMonth: "",
        startYear: "",
        duration: "6",
        status: "Pending",
        unitID: this.unit.unitID,
        userID: this.$store.getters.getLoggedInUser.userID
      },
      valid: true,
      monthRules: [
        v => !!v || "Required month is required",
        v => (v > 0 && v < 13) || "Require month must be between 0 and 12"
      ],
      yearRules: [
        v => !!v || "Required year is required",
        v => (v > 1000 && v < 10000) || "Require year is invalid"
      ]
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
    },
    notApplied() {
      for (let i = 0; i < this.$store.getters.getApplications.length; i++) {
        if (
          this.$store.getters.getApplications[i].unitID == this.unit.unitID &&
          this.$store.getters.getApplications[i].userID ==
            this.$store.getters.getLoggedInUser.userID
        ) {
          return false;
        }
      }
      return true;
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
    },
    cancelDialog() {
      this.dialog = false;
      let dateNow = new Date();
      let dateStr =
        dateNow.getDay() +
        "-" +
        (dateNow.getMonth() + 1) +
        "-" +
        dateNow.getFullYear();
      this.newApplication = {
        applicationID: this.nextApplicationID(
          this.$store.getters.getApplications[
            this.$store.getters.getApplications.length - 1
          ].applicationID
        ),
        applicationDate: dateStr,
        startMonth: "",
        startYear: "",
        duration: "6",
        status: "Pending",
        unitID: this.unit.unitID,
        userID: ""
      };
      this.$refs.applicationForm.reset();
    },
    addNewApplication() {
      if (this.$refs.applicationForm.validate()) {
        let dateNow = new Date();
        let dateStr =
          this.formatDoubleDigit(dateNow.getDay()) +
          "-" +
          this.formatDoubleDigit(dateNow.getMonth() + 1) +
          "-" +
          this.formatDoubleDigit(dateNow.getFullYear());
        this.newApplication.applicationDate = dateStr;
        this.$store.dispatch("addNewApplication", this.newApplication);
        this.cancelDialog();
      }
    },
    nextApplicationID(lastApplicationID) {
      let nextInt = parseInt(lastApplicationID.split("A")[1]) + 1;
      return "A" + ("00000" + nextInt).substr(-4);
    },
    formatDoubleDigit(num) {
      if (num > 999) {
        return num - 2000;
      } else if (num < 10) {
        return "0" + num;
      }

      return num;
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

.v-input--selection-controls {
  margin: 0;
  padding: 0;
}
</style>
