<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="navDrawer" width="210px" style="background-color: #C3D4E6;" app>
        <v-layout row wrap fill-height align-content-space-between>
          <v-flex xs12>
            <v-card flat tile color="#C3D4E6">
              <v-flex pa-3>
                <v-card flat tile color="#C3D4E6" to="/home">
                  <v-img :src="require('./assets/roominate.png')" contain height="50px"></v-img>
                </v-card>
              </v-flex>
              <v-list light class="pa-0">
                <v-layout column v-if="getLoggedInUser == 1">
                  <v-flex mb-2>
                    <v-card color="#B4C0CD" flat tile>
                      <v-layout py-3 row wrap align-center justify-center>
                        <v-flex pr-2 shrink>
                          <v-avatar size="40px">
                            <v-img :src="require('@/assets/avatar.png')" contain></v-img>
                          </v-avatar>
                        </v-flex>
                        <v-flex shrink>
                          <v-layout row wrap align-center justify-space-around>
                            <v-flex xs12>
                              <h4>{{ getLoggedInUserFullname }}</h4>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap align-center justify-center>
                            <v-flex shrink>
                              <v-icon color="#1B5E20" small>radio_button_checked</v-icon>
                            </v-flex>
                            <v-flex shrink pt-1 pl-1>
                              <h5>Online</h5>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                      <v-divider></v-divider>
                      <v-layout row wrap align-center justify-center>
                        <v-flex text-xs-center>
                          <v-btn small flat to="/officer/profile">Profile</v-btn>
                          <v-btn small flat @click="logoutUser" to="/home">Logout</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-list-tile ripple to="/officer/residence">
                    <v-flex xs3>
                      <v-icon>home</v-icon>
                    </v-flex>
                    <v-flex xs9>
                      <v-list-tile-title style="font-size: 20px;">Residence</v-list-tile-title>
                    </v-flex>
                  </v-list-tile>

                  <v-list-tile ripple to="/officer/application">
                    <v-flex xs3>
                      <v-icon>assignment</v-icon>
                    </v-flex>
                    <v-flex xs9>
                      <v-list-tile-title style="font-size: 20px;">Application</v-list-tile-title>
                    </v-flex>
                  </v-list-tile>
                </v-layout>
                <v-layout column v-else-if="getLoggedInUser == 2">
                  <v-flex mb-2>
                    <v-card color="#B4C0CD" height="90px" flat tile>
                      <v-layout pt-2 row wrap align-center justify-center>
                        <v-flex pr-2 shrink>
                          <v-avatar size="40px">
                            <v-img :src="require('@/assets/avatar.png')" contain></v-img>
                          </v-avatar>
                        </v-flex>
                        <v-flex shrink>
                          <v-layout row wrap align-center justify-space-around>
                            <v-flex xs12>
                              <h4>{{ getLoggedInUserFullname }}</h4>
                            </v-flex>
                          </v-layout>
                          <v-layout row wrap align-center justify-center>
                            <v-flex shrink>
                              <v-icon color="#1B5E20" small>radio_button_checked</v-icon>
                            </v-flex>
                            <v-flex shrink pt-1 pl-1>
                              <h5>Online</h5>
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                      <v-layout row wrap align-center justify-center>
                        <v-flex text-xs-center>
                          <v-btn small flat to="/applicant/profile">Profile</v-btn>
                          <v-btn small flat @click="logoutUser" to="/home">Logout</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-flex>
                  <v-list-tile ripple to="/applicant/residence">
                    <v-flex xs3>
                      <v-icon>home</v-icon>
                    </v-flex>
                    <v-flex xs9>
                      <v-list-tile-title style="font-size: 20px;">Residence</v-list-tile-title>
                    </v-flex>
                  </v-list-tile>

                  <v-list-tile ripple to="/applicant/application">
                    <v-flex xs3>
                      <v-icon>assignment</v-icon>
                    </v-flex>
                    <v-flex xs9>
                      <v-list-tile-title style="font-size: 20px;">Application</v-list-tile-title>
                    </v-flex>
                  </v-list-tile>
                </v-layout>
                <v-layout column v-else-if="getLoggedInUser == 3">
                  <v-flex text-xs-center>
                    <v-btn small flat to="/register">Register</v-btn>
                    <v-btn small flat to="/login">Login</v-btn>
                  </v-flex>

                  <v-list-tile></v-list-tile>

                  <v-list-tile ripple to="/residence">
                    <v-flex xs3>
                      <v-icon>home</v-icon>
                    </v-flex>
                    <v-flex xs9>
                      <v-list-tile-title style="font-size: 20px;">Residence</v-list-tile-title>
                    </v-flex>
                  </v-list-tile>

                  <v-list-tile ripple to="/aboutus">
                    <v-flex xs3>
                      <v-icon>local_hospital</v-icon>
                    </v-flex>
                    <v-flex xs9>
                      <v-list-tile-title style="font-size: 20px;">About Us</v-list-tile-title>
                    </v-flex>
                  </v-list-tile>
                </v-layout>
              </v-list>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card flat tile color="#C3D4E6" width="210px">
              <v-list light class="pa-0">
                <v-list-tile ripple to="/contactus">
                  <v-flex xs3>
                    <v-icon>contact_mail</v-icon>
                  </v-flex>
                  <v-flex xs9>
                    <v-list-tile-title style="font-size: 20px;">Contact Us</v-list-tile-title>
                  </v-flex>
                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-navigation-drawer>
      <!-- navigation toolbar -->
      <v-toolbar
        class="tracking_toolbar"
        style="background-color: transparent;"
        height="60px"
        flat
        app
      >
        <v-layout>
          <v-flex>
            <v-btn icon @click="navDrawer = !navDrawer">
              <v-icon large>menu</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-content style="padding-top: 0;">
        <v-container fluid pa-0 mb-5>
          <router-view :key="$route.params.type" />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      navDrawer: true,
      showTooltip: true
    };
  },
  computed: {
    getLoggedInUser() {
      if (this.$store.getters.getLoggedInUser.userType === "officer") {
        return 1;
      } else if (this.$store.getters.getLoggedInUser.userType === "applicant") {
        return 2;
      } else {
        return 3;
      }
    },
    getLoggedInUserFullname() {
      return this.$store.getters.getLoggedInUser.fullname;
    }
  },
  methods: {
    logoutUser() {
      this.$store.commit("setLoggedInUser", {});
      this.$store.commit("setAuth", false);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}

.v-toolbar__content {
  padding: 0 10px !important;
}
</style>
