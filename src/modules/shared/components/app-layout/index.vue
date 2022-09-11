<template>
  <v-app class="v-app-Style fill-height">
    <Menu />

    <main class="mainStyle">
      <router-view></router-view>
    </main>
    <div class="conOfAllFooterSection">
      <FooterMessage />

    </div>
  </v-app>
</template>

<script>
import Menu from "@/modules/shared/components/menu-bar";

import FooterMessage from "@/modules/shared/components/layout/FooterMessage";
export default {
  components: {
    FooterMessage,
    Menu,
  },
  computed: {},
  watch: {},
};
</script>
<style>
.mainStyle {
  height: 100%;
  margin-top:70px;
  background: #fcfcfc;
}
</style>
