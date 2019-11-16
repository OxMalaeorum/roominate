<template>
  <v-flex xs12 mt-2>
    <v-card tile flat style="outline: 1px solid rgba(0,0,0,0.5)">
      <v-layout row py-3 align-center justify-start>
        <v-flex xs10>
          <v-layout>
            <v-flex xs2 text-xs-center>
              <h3>{{ application.applicationID }}</h3>
            </v-flex>

            <v-flex xs2 text-xs-center>
              <h3>{{ application.applicationDate }}</h3>
            </v-flex>

            <v-flex xs2 text-xs-center>
              <h3>{{ application.startYear }}-{{ monthFormat(application.startMonth) }}</h3>
            </v-flex>

            <v-flex xs2 text-xs-center>
              <h3>{{ application.duration }}</h3>
            </v-flex>

            <v-flex xs2 text-xs-center>
              <h3>RM{{ applicant.monthlyIncome }}</h3>
            </v-flex>

            <v-flex xs2 text-xs-center>
              <h3
                :style="application.status == 'Approved' ? 'color: green' : application.status == 'Pending' ? 'color: orange;' : 'color: red;'"
              >{{ application.status }}</h3>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex class="app_btn" xs2 text-xs-center>
          <v-menu v-model="statusMenu" offset-y :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn
                v-if="application.status == 'Pending'"
                small
                flat
                color="blue"
                v-on="on"
              >Allocate</v-btn>
            </template>
            <v-card>
              <v-form ref="statusForm" v-model="valid" lazy-validation>
                <v-layout pa-3>
                  <v-flex>
                    <v-layout pb-3>
                      <v-flex xs6>
                        <h3>Current Status:</h3>
                      </v-flex>
                      <v-flex xs6>
                        <h3>{{ application.status }}</h3>
                      </v-flex>
                    </v-layout>

                    <v-layout align-center pb-4>
                      <v-flex xs6>
                        <h3>Update Status to:</h3>
                      </v-flex>
                      <v-flex xs6 class="statusTextfield">
                        <v-select
                          v-model="selectedStatus"
                          :items="statusOptions"
                          :rules="statusRules"
                          required
                        ></v-select>
                      </v-flex>
                    </v-layout>

                    <v-divider></v-divider>

                    <v-layout pt-2 justify-end>
                      <v-flex shrink pr-3 text-xs-center class="app_btn">
                        <v-btn flat color="blue" @click="cancelStatusMenu">Cancel</v-btn>
                      </v-flex>
                      <v-flex shrink text-xs-center class="app_btn">
                        <v-btn color="blue" dark @click="saveStatusMenu">Save</v-btn>
                      </v-flex>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-card>
          </v-menu>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["application", "unit"],
  mounted() {
    this.initData();
  },
  data() {
    return {
      applicant: {},
      statusOptions: ["Approved", "Rejected"],
      selectedStatus: null,
      statusMenu: false,
      statusRules: [v => !!v || "Status is required"],
      valid: true
    };
  },
  methods: {
    initData() {
      let applicant = this.$store.getters.getUsers.filter(
        user => user.userID == this.application.userID
      );

      this.applicant = applicant[0];
    },
    monthFormat(month) {
      if (month < 10) {
        return "0" + month;
      }
      return month;
    },
    cancelStatusMenu() {
      this.statusMenu = false;
      this.selectedStatus = null;
      this.$refs.statusForm.reset();
    },
    saveStatusMenu() {
      if (this.$refs.statusForm.validate()) {
        this.application.status = this.selectedStatus;
        this.$store.commit("setApplicationStatusByID", this.application);

        if (this.selectedStatus == "Approved") {
          let unitOtherApplications = this.$store.getters.getApplications.filter(
            app =>
              app.unitID == this.application.unitID &&
              app.applicationID !== this.application.applicationID
          );
          for (let i = 0; i < unitOtherApplications.length; i++) {
            unitOtherApplications[i].status = "Rejected";
            this.$store.commit(
              "setApplicationStatusByID",
              unitOtherApplications[i]
            );
          }

          let applicantOtherApplications = this.$store.getters.getApplications.filter(
            app =>
              app.userID == this.applicant.userID &&
              app.unitID != this.application.unitID
          );
          for (let i = 0; i < applicantOtherApplications.length; i++) {
            applicantOtherApplications[i].status = "Rejected";
            this.$store.commit(
              "setApplicationStatusByID",
              applicantOtherApplications[i]
            );
          }

          this.unit.availability = "No";
          this.$store.commit("setUnitAvailability", this.unit);
          this.$store.dispatch("saveUnits");
        }

        this.$store.dispatch("saveApplications");
        this.statusMenu = false;
        this.selectedStatus = null;
      }
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
</style>
