<template>
  <section class="sectionmenu">
    <v-container class="menuweb d-none d-sm-block">
      <v-row class="align-center">
        <v-col cols="12" class="py-1">
          <v-row class="conofMenu align-center">
            <v-col cols="6" class="p-1"> </v-col>
            <v-col
              cols="6"
              class="py-2 d-flex justify-end menu"
              @click="dialog = true"
            >
              <img
                class="menuImg mx-4"
                :src="require(`@/assets/img/${menuImg}`)"
                alt="menu"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <div class="text-center">
      <v-dialog
        content-class="dialog-style h-100"
        v-model="dialog"
        width="100%"
        overlay-opacity="1"
        overlay-color="#000"
      >
        <v-container fluid class="h-100 pb-0 pr-0 conOfAllMenu">
          <v-row class="h-100 ma-0">
            <div class="close-ico" @click="dialog = false">
              <v-icon style="color: #ffffff69">mdi-close</v-icon>
            </div>

            <v-col md="6" cols="12" class="h-100 pa-0">
              <v-list class="list-style" dark>
                <v-list-item-group caret-color="transparent" dark>
                  <v-list-item
                    :class="'/' === $route.path ? 'highlighted' : ''"
                    @click="dialog = false"
                  >
                    <v-list-item-content>
                      <router-link class="mob-link" :to="{ name: 'Home' }">
                        <v-list-item-title class="item-text"
                          >Website
                          <v-icon style="color: #fff"
                            >mdi-arrow-right-thin</v-icon
                          >
                        </v-list-item-title></router-link
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item-group caret-color="transparent" dark>
                  <v-list-item @click="dialog = false">
                    <v-list-item-content>
                      <router-link class="mob-link" :to="{}">
                        <v-list-item-title class="item-text"
                          >Mob Application
                          <v-icon style="color: #fff"
                            >mdi-arrow-right-thin</v-icon
                          ></v-list-item-title
                        >
                      </router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item-group caret-color="transparent" dark>
                  <v-list-item @click="dialog = false">
                    <v-list-item-content>
                      <router-link class="mob-link" :to="{}">
                        <v-list-item-title class="item-text"
                          >Web Application
                        </v-list-item-title>
                      </router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item-group caret-color="transparent" dark>
                  <v-list-item @click="dialog = false">
                    <v-list-item-content>
                      <router-link class="mob-link" :to="{}">
                        <v-list-item-title class="item-text"
                          >Game
                          <v-icon style="color: #fff"
                            >mdi-arrow-right-thin</v-icon
                          ></v-list-item-title
                        >
                      </router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item-group caret-color="transparent" dark>
                  <v-list-item
                    :class="'/about' === $route.path ? 'highlighted' : ''"
                    @click="dialog = false"
                  >
                    <v-list-item-content>
                      <router-link class="mob-link" :to="{ name: 'about' }">
                        <v-list-item-title class="item-text"
                          >About CAT
                          <v-icon style="color: #fff"
                            >mdi-arrow-right-thin</v-icon
                          ></v-list-item-title
                        >
                      </router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <!--      <v-list-item-group caret-color="transparent" dark>
                  <v-list-item
                    :class="'/mission' === $route.path ? 'highlighted' : ''"
                    @click="dialog = false"
                  >
                    <v-list-item-content>
                      <router-link class="mob-link" :to="{ name: 'mission' }">
                        <v-list-item-title class="item-text">
                          websites</v-list-item-title
                        >
                      </router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item-group caret-color="transparent" dark>
                  <v-list-item
                    :class="'/news' === $route.path ? 'highlighted' : ''"
                    @click="dialog = false"
                  >
                    <v-list-item-content>
                      <router-link class="mob-link" :to="{ name: 'news' }">
                        <v-list-item-title class="item-text"
                          >Aps</v-list-item-title
                        >
                      </router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
                <v-list-item-group caret-color="transparent" dark>
                  <v-list-item
                    :class="'/areas' === $route.path ? 'highlighted' : ''"
                    @click="dialog = false"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="item-text">
                        <router-link class="mob-link" :to="{ name: 'areas' }"
                          >Games</router-link
                        ></v-list-item-title
                      >
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group> -->
                <v-list-item-group caret-color="transparent" dark>
                  <v-list-item
                    :class="'/contact-us' === $route.path ? 'highlighted' : ''"
                    @click="dialog = false"
                  >
                    <v-list-item-content>
                      <router-link
                        class="mob-link"
                        :to="{ name: 'contact-us' }"
                      >
                        <v-list-item-title class="item-text"
                          >Contact Us
                        </v-list-item-title>
                      </router-link>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-col>
            <v-col md="6" cols="12" class="h-100 pa-0">
              <img src="@/assets/img/menu-img.png" class="w-100 h-100" />
            </v-col>
          </v-row>
        </v-container>
      </v-dialog>
    </div>
  </section>
  <!--   <v-col class="d-flex justify-start">

    <div class="left">
  leftSidebar
  </div>
  </v-col> -->
</template>
<script>
export default {
  props: ["menuImg"],
  data() {
    return {
      dialog: false,
      selectedItem: "",
      items: [
        { text: "HOME", route: "home" },
        { text: "ABOUT US", route: "about" },
        { text: "MISSION & VISION & VALUES", route: "mission" },

        { text: "AREAS", route: "areas" },

        { text: "NEWS & EVENTS", route: "news" },
        { text: "CONTACT US", route: "contact" },
      ],
    };
  },
  watch: {
    selectedItem: {
      handler: function (newVal) {
        this.selectedItem = newVal;
        console.log("new", newVal);
        console.log("old", this.selectedItem);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.close-ico {
  color: #fff;
  position: absolute;
  right: 2%;
  top: 2%;
  cursor: pointer;
}
.conOfAllMenu {
  padding-top: 5%;
}
.menuweb {
  width: 10%;
  position: fixed;
  right: 10px;
  color: #fff;
  z-index: 2;
  padding-top: 2%;
}
.swap {
  right: 50px;
  left: unset;
  direction: rtl;
}

.resImg {
  width: 70px;
}
.menuText {
  text-align: left;
  letter-spacing: 4.8px;
  color: #ffffff;
  font-size: 12px;
}
.item-text {
  color: #fff;
  font-family: "bio";
  font-size: 40px !important;
}

.menuImg {
  width: 35px;
}
.menu {
  cursor: pointer;
}
.close {
  cursor: pointer;

  width: auto;
}
.list-style {
  background: transparent !important;
}
.bg-active {
  color: #a1d683 !important;
}
.v-list-item--link:before {
  background-color: transparent;
}
.v-overlay__scrim {
  background-color: #000 !important;
}

.v-list-item.v-list-item--link.theme--dark.highlighted {
  color: #a1d683 !important;
}

.v-list-item__title.item-text.highlighted {
  color: #a1d683 !important;
}

@media only screen and (max-width: 768px) {
  .item-text {
    font-size: 20px !important;
  }
}
</style>
