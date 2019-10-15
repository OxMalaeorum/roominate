<template>
  <v-layout fill-height align-center justify-center mt-5 pt-5>
    <v-flex xs7>
      <v-card class="rounded-card elevation-12" min-width="450px">
        <v-form ref="registerForm" v-model="valid2" lazy-validation>
          <v-flex px-2 py-3>
            <v-card-title class="justify-center">
              <h2>Register</h2>
            </v-card-title>
            <v-layout row align-center justify-center px-5 mx-2>
              <v-flex xs3>
                <h3>Username:</h3>
              </v-flex>
              <v-flex xs9 pl-2>
                <v-text-field v-model="newUser.username" :rules="usernameRules" required></v-text-field>
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
                    showRegisterPassword ? 'visibility' : 'visibility_off'
                  "
                  :type="showRegisterPassword ? 'text' : 'password'"
                  @click:append="showRegisterPassword = !showRegisterPassword"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row align-center justify-center px-5 mx-2>
              <v-flex xs3>
                <h3>Fullname:</h3>
              </v-flex>
              <v-flex xs9 pl-2>
                <v-text-field v-model="newUser.fullname" :rules="fullnameRules" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row align-center justify-center px-5 mx-2>
              <v-flex xs3>
                <h3>Email:</h3>
              </v-flex>
              <v-flex xs9 pl-2>
                <v-text-field v-model="newUser.email" :rules="emailRules" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row align-center justify-center px-5 mx-2>
              <v-flex xs3>
                <h3>Monthly Income:</h3>
              </v-flex>
              <v-flex xs9 pl-2>
                <v-text-field v-model="newUser.monthlyIncome" :rules="incomeRules" required></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout py-2>
              <v-flex text-xs-center>
                <v-btn color="#B0BEC5" @click="register">Register</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-form>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      valid2: true,
      showRegisterPassword: false,
      newUser: {
        userID: 0,
        userType: "applicant",
        username: "",
        password: "",
        fullname: "",
        email: "",
        monthlyIncome: ""
      },
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
    register() {
      if (this.$refs.registerForm.validate()) {
        this.$store.commit("addNewUser", this.newUser);
        console.log(1);
        console.log(this.newUser);
        this.$store.commit("setLoggedInUser", this.newUser);
        console.log(2);
        console.log(this.newUser);
        this.$store.commit("setAuth", true);
        this.$router.push("/applicant/home");
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
