<template>
  <v-layout row ma-5 px-3>
    <v-flex>
      <v-layout>
        <v-flex xs12>
          <h1>Officer Home</h1>
          <blockquote class="bquote">Bla bla bla...</blockquote>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <h2>Residences</h2>
        </v-flex>
        <v-flex xs12>
          <v-card
            color="rgba(0,0,0,0.2)"
            style="outline: 2px solid rgba(0,0,0,0.2)"
            height="30px"
            tile
            flat
          >
            <v-layout justify-end>
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
                      <v-layout align-center pa-2 mx-5>
                        <v-flex xs5 text-xs-left>
                          <h3>Name:</h3>
                        </v-flex>
                        <v-flex xs7>
                          <v-text-field
                            v-model="newResidence.name"
                            label="Name"
                            solo
                            hide-details
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
                            label="Address"
                            auto-grow
                            solo
                            hide-details
                            required
                          ></v-textarea>
                        </v-flex>
                      </v-layout>
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
            v-for="(res, index) in getResidences"
            :key="index"
            :residence="res"
          ></Resoff-comp>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>