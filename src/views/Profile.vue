<template>
  <v-layout ma-5 px-3 fill-height>
    <v-flex py-3 fill-height>
      <v-card min-height="100%">
        <v-form>
          <v-layout row wrap pa-4>
            <v-flex xs8 text-xs-left px-3 ml-2>
              <h1>Profile</h1>
            </v-flex>

            <v-flex xs12 pt-3>
              <v-divider></v-divider>
            </v-flex>
          </v-layout>

          <v-layout row px-5 pb-3 align-start justify-space-between>
            <v-flex xs1>
              <v-card flat tile>
                <v-img :src="require('@/assets/avatar.png')" contain></v-img>
              </v-card>
            </v-flex>
            <v-flex px-5>
              <v-layout align-start px-2>
                <v-flex xs5 text-xs-left pt-3>
                  <h3>User ID:</h3>
                </v-flex>
                <v-flex class="editable" xs7 pt-1>
                  <v-text-field v-model="user.userID" disabled flat label="User ID" solo required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-start px-2>
                <v-flex xs5 text-xs-left pt-3>
                  <h3>User Type:</h3>
                </v-flex>
                <v-flex class="editable" xs7 pt-1>
                  <v-text-field
                    v-model="user.userType"
                    disabled
                    flat
                    label="User Type"
                    solo
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-start px-2>
                <v-flex xs5 pt-3 text-xs-left>
                  <h3>Username:</h3>
                </v-flex>
                <v-flex class="editable" xs7 pt-1>
                  <v-text-field
                    v-model="user.username"
                    :rules="usernameRules"
                    :disabled="disableEdit"
                    :flat="disableEdit"
                    label="Name"
                    solo
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-start px-2>
                <v-flex xs5 pt-3 text-xs-left>
                  <h3>Password:</h3>
                </v-flex>
                <v-flex class="editable" xs7 pt-1>
                  <v-text-field
                    v-model="user.password"
                    :disabled="disableEdit"
                    :flat="disableEdit"
                    :rules="passwordRules"
                    :append-icon="
                    showRegisterPassword ? 'visibility' : 'visibility_off'
                  "
                    :type="showRegisterPassword ? 'text' : 'password'"
                    @click:append="showRegisterPassword = !showRegisterPassword"
                    label="Password"
                    solo
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout align-start px-2>
                <v-flex xs5 pt-3 text-xs-left>
                  <h3>Fullname:</h3>
                </v-flex>
                <v-flex class="editable" xs7 pt-1>
                  <v-text-field
                    v-model="user.fullname"
                    :disabled="disableEdit"
                    :flat="disableEdit"
                    :rules="fullnameRules"
                    label="Fullname"
                    solo
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout v-if="user.userType == 'applicant'" align-start px-2>
                <v-flex xs5 pt-3 text-xs-left>
                  <h3>Email:</h3>
                </v-flex>
                <v-flex class="editable" xs7 pt-1>
                  <v-text-field
                    v-model="user.email"
                    :disabled="disableEdit"
                    :flat="disableEdit"
                    :rules="emailRules"
                    label="Email"
                    solo
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout v-if="user.userType == 'applicant'" align-start px-2>
                <v-flex xs5 pt-3 text-xs-left>
                  <h3>Monthly Income:</h3>
                </v-flex>
                <v-flex class="editable" xs7 pt-1>
                  <v-text-field
                    v-model="user.monthlyIncome"
                    :disabled="disableEdit"
                    :flat="disableEdit"
                    :rules="incomeRules"
                    label="Monthly Income"
                    solo
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
              <v-btn v-else icon @click="saveUser">
                <v-icon>save</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      valid: true,
      showRegisterPassword: false,
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "At least 8 characters"
      ],
      fullnameRules: [v => !!v || "Fullname is required"],
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length >= 3) || "At least 3 characters",
        v => !this.checkUsernameTaken(v) || "Username has already been taken"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "E-mail must be valid"
      ],
      incomeRules: [
        v => !!v || "Monthly income is required",
        v => v > 0 || "Monthly income must be a number"
      ],
      disableEdit: true
    };
  },
  methods: {
    initData() {
      this.user = this.$store.getters.getLoggedInUser;
    },
    checkUsernameTaken(inputUsername) {
      let existingUsers = this.$store.getters.getUsers.filter(
        u => u.userID !== this.user.userID
      );
      let existingUsernames = [];

      for (let i = 0; i < existingUsers.length; i++) {
        existingUsernames.push(existingUsers[i].username);
      }
      return existingUsernames.includes(inputUsername);
    },
    saveUser() {
      this.disableEdit = !this.disableEdit;
      this.$store.commit("updateUser", this.user);
      this.$store.dispatch("saveUsers");
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
