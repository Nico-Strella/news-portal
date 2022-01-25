<template>
  <v-app-bar
    app
    color='rgba(19,84,122,1)'
    dark
    shrink-on-scroll
    prominent
    src='../assets/banner.jpg'
    fade-img-on-scroll
  >
    <template v-slot:img='{ props }'>
      <v-img
        v-bind='props'
        gradient='to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)'
      ></v-img>
    </template>

    <v-container class='container'>
      <v-app-bar-title id='page-title'>
        <div>{{ title }}</div>
      </v-app-bar-title>
    </v-container>

  </v-app-bar>
</template>

<script>
export default {
  name: 'page-title',
  props: {
    title: String,
  },
};
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
  }
  #page-title {
    align-self: flex-start;
    padding-bottom: 0;
    text-overflow: none !important;
  }
</style>