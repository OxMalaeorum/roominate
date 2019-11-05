<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-carousel cycle height="400" hide-delimiters show-arrows-on-hover>
        <v-carousel-item :src="require('../assets/h2.jpg')"></v-carousel-item>
        <v-carousel-item :src="require('../assets/h3.jpg')"></v-carousel-item>
        <v-carousel-item :src="require('../assets/h4.jpg')"></v-carousel-item>
        <v-carousel-item :src="require('../assets/h5.jpg')"></v-carousel-item>
        <v-carousel-item :src="require('../assets/h6.jpg')"></v-carousel-item>
      </v-carousel>
    </v-flex>
    <v-flex xs12 mx-4 my-4>
      <h1>The home of affordable accommodation</h1>
      <blockquote class="bquote">Bringing young people in touch with the future.</blockquote>
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  data() {
    return {};
  }
};
</script>

<style lang="scss">
.bquote {
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
