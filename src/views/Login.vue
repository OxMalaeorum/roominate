<template>
  <v-layout fill-height align-center justify-center mt-5 pt-5>
    <v-flex xs10 sm7 md4>
      <v-card class="rounded-card elevation-12" min-width="450px">
        <v-flex px-5 py-3 class="text-xs-center">
          <v-card-title class="justify-center">
            <h2>Login</h2>
          </v-card-title>
          <v-form ref="loginForm" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              :rules="nameRules"
              prepend-inner-icon="person"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="passwordRules"
              prepend-inner-icon="lock"
              :append-icon="showLoginPassword ? 'visibility' : 'visibility_off'"
              :type="showLoginPassword ? 'text' : 'password'"
              @click:append="showLoginPassword = !showLoginPassword"
              label="Password"
              required
            ></v-text-field>

            <v-flex pb-1 v-if="errorMessage">
              <h4 style="color: red;">Incorrect username or password!</h4>
            </v-flex>

            <v-btn color="#B0BEC5" @click="login">Login</v-btn>
          </v-form>

          <v-form ref="registerForm" v-model="valid2" lazy-validation>
            <v-flex xs12 pt-3>
              <v-dialog v-model="showDialog" width="700px">
                <template v-slot:activator="{ on }">
                  Don't have an account?
                  <v-btn color="blue" flat dark v-on="on">Register Here</v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title
                    >Register Account</v-card-title
                  >

                  <v-card-text>
                    <v-layout row align-center justify-center px-5 mx-2>
                      <v-flex xs3>
                        <h3>Username:</h3>
                      </v-flex>
                      <v-flex xs9 pl-2>
                        <v-text-field
                          v-model="newUser.username"
                          :rules="usernameRules"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row align-center justify-center px-5 mx-2>
                      <v-flex xs3>
                        <h3>Password:</h3>
                      </v-flex>
                      <v-flex xs9 pl-2>
                        <v-text-field
                          v-model="newUser.password"
                          :rules="passwordRules"
                          :append-icon="
                            showRegisterPassword
                              ? 'visibility'
                              : 'visibility_off'
                          "
                          :type="showRegisterPassword ? 'text' : 'password'"
                          @click:append="
                            showRegisterPassword = !showRegisterPassword
                          "
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row align-center justify-center px-5 mx-2>
                      <v-flex xs3>
                        <h3>Fullname:</h3>
                      </v-flex>
                      <v-flex xs9 pl-2>
                        <v-text-field
                          v-model="newUser.fullname"
                          :rules="fullnameRules"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row align-center justify-center px-5 mx-2>
                      <v-flex xs3>
                        <h3>Email:</h3>
                      </v-flex>
                      <v-flex xs9 pl-2>
                        <v-text-field
                          v-model="newUser.email"
                          :rules="emailRules"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                    <v-layout row align-center justify-center px-5 mx-2>
                      <v-flex xs3>
                        <h3>Monthly Income:</h3>
                      </v-flex>
                      <v-flex xs9 pl-2>
                        <v-text-field
                          v-model="newUser.monthlyIncome"
                          :rules="incomeRules"
                          required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                  <v-divider></v-divider>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="cancel">Cancel</v-btn>
                    <v-btn color="primary" flat @click="register"
                      >Register</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-form>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      valid2: true,
      showLoginPassword: false,
      showRegisterPassword: false,
      errorMessage: false,
      showDialog: false,
      username: "",
      password: "",
      loggedInUser: {},
      newUser: {
        userID: 0,
        userType: "applicant",
        username: "",
        password: "",
        fullname: "",
        email: "",
        monthlyIncome: ""
      },
      nameRules: [
        v => !!v || "Name is required",
        v => (v && v.length >= 3) || "At least 3 characters"
      ],
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 8) || "At least 8 characters"
      ],
      fullnameRules: [v => !!v || "Fullname is required"],
      usernameRules: [
        v => !!v || "Username is required",
        v => (v && v.length >= 3) || "At least 3 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "E-mail must be valid"
      ],
      incomeRules: [v => !!v || "Monthly income is required"]
    };
  },
  methods: {
    login() {
      if (this.$refs.loginForm.validate()) {
        if (this.validate()) {
          this.$store.commit("setLoggedInUser", this.loggedInUser);
          this.$store.commit("setAuth", true);
          this.errorMessage = false;
          if (this.loggedInUser.userType === "officer") {
            this.$router.push("/officer/home");
          } else if (this.loggedInUser.userType === "applicant") {
            this.$router.push("/applicant/home");
          }
        } else {
          this.errorMessage = true;
        }
      }
    },
    validate() {
      let users = this.$store.getters.getUsers;
      if (users.length) {
        for (let i = 0; i < users.length; i++) {
          if (users[i].username === this.username) {
            if (users[i].password === this.password) {
              this.loggedInUser = users[i];
              return true;
            }
          }
        }
      }
    },
    cancel() {
      this.newUser = {
        userID: 0,
        userType: "applicant",
        username: "",
        password: "",
        fullname: "",
        email: "",
        monthlyIncome: ""
      };
      this.showDialog = false;
      this.$refs.registerForm.reset();
    },
    register() {
      if (this.$refs.registerForm.validate()) {
        this.$store.commit("addNewUser", this.newUser);
        this.showDialog = false;
      }
    }
  }
};
</script>

<style scoped>
.rounded-card {
  border-radius: 30px;
}
</style>
