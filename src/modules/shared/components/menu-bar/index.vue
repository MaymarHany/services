<template>
  <section
    class="sec-menu"
    :style="{ background: navbarColors[$route.path] }"
    :class="{ change_color: scrollPosition > 50 }"
  >
    <v-app-bar class="toolbar-menu hidden-lg-and-up" color="white" fixed>
      <v-app-bar-nav-icon
        @click="drawer = true"
        class="hidden-lg-and-up"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-toolbar-items flat class="toolbar-menu hidden-md-and-down">

        <img src="@/assets/img/logo.png" class="w-50 pl-15" />

      <v-menu
        v-for="item in items"
        :key="item.title.En"
        content-class="elevation-0"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            :to="item.routeName ? { name: item.routeName } : ''"
            :class="[item.className, item.single ? 'singleItem' : '']"
            :ripple="false"
            :exact="item.routeName == 'landingPage'"
            id="btn-menu"
          >
            <div>{{ item.title.En }}</div>
            <div :class="item.addActive"></div>
            <v-icon v-if="!item.single"> mdi-chevron-down </v-icon>
          </v-btn>
        </template>
      </v-menu>
    </v-toolbar-items>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      v-if="drawer"
      class="fixedAndIndexed"
    >
      <v-list>
        <v-col md="2" cols="12">
          <img src="@/assets/img/logo.png" class="logoImg" />
        </v-col>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :class="item.single ? 'hidden-lg-and-up' : ''"
        >
          <template v-slot:activator>
            <v-btn
              text
              :to="item.routeName ? { name: item.routeName } : ''"
              :class="[item.className, item.single ? 'singleItem' : '']"
              :ripple="false"
              :exact="item.routeName == 'landingPage'"
            >
              <!--      <v-btn
              text
              :to="
                item.routeName.query
                  ? {
                      name: item.routeName,
                      query: { id: item.routeName.query.id },
                    }
                  : { name: item.routeName }
              "
              v-scroll-to="
                item.routeName.query
                  ? '#' + item.routeName.query.id
                  : '#' + item.routeName
              "
              :class="[item.className, item.single ? 'singleItem' : '']"
              :ripple="false"
              :exact="item.routeName == 'landingPage'"
            > -->
              <!-- item.single -->
              <!-- :class="item.className" -->

              <v-list-item-content>
                <v-list-item-title v-text="item.title.En"></v-list-item-title>
              </v-list-item-content>
            </v-btn>
          </template>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </section>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      drawer: false,

      selectedItem: "",
      scrollPosition: null,
      navbarColors: {
        "/": "#FFF",
      },
      items: [
        {
          active: false,
          title: { En: "Home", AR: "الرئيسية" },
          routeName: "landingPage",
          addActive: "",
          single: true,
          className: "",
        },

        {
          active: false,
          single: true,
          title: { En: "About Us", AR: "نبذه  عنا" },
          addActive: "",
          routeName: "about",
        },
        {
          active: false,
          title: { En: "Contact us", AR: "تواصل معنا" },

          routeName: "contacts",
          addActive: "",
          single: true,
        },
        {
          active: false,
          title: { En: "Blogs", AR: " " },
          addActive: "",
          single: true,
          routeName: "blogs",
        },

      ],
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  watch: {
    $route(to) {
      this.items.forEach(function (el) {
        el.addActive = "";
      });
      this.items.filter(function (item) {
        if (item) {
          if (item.routeName == to.name) {
            item.addActive = "addActive";
          }
        }
      });
    },

    deep: true,
    immediate: true,
  },
};
</script>
<style lang="scss" scoped>
.change_color {
  background: #fff !important;
}
.sec-menu {
  padding: 10px;
  display: flex;
  align-items: center;
  height: 70px;
  font-family: "Somar-Regular";
  width: 100%;
  position: fixed;
  background: transparent;
  z-index: 4;
  color: #808080;
  text-transform: uppercase !important;
}


.v-list-group.hidden-lg-and-up {
  .v-list-group__header .v-list-item__icon.v-list-group__header__append-icon {
    display: none;
  }
}
@media only screen and (max-width: 768px) {
  .sec-menu {
    height: 56px;
  }

  .v-application .hidden-md-and-down {
    display: none !important;
  }
}
::v-deep {
  @media only screen and (max-width: 768px) {
    .toolbar-menu {
      background: transparent !important;
      background-color: transparent !important;
      border-color: transparent !important;
    }
    .v-toolbar__content {

    }
    .v-btn__content {
      flex-direction: row !important;
    }
  }
  .v-overlay__scrim {
    background: transparent;
    opacity: unset;
    border-color: transparent;
  }

  .v-sheet.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: none !important;
  }
  .v-toolbar__content {
    background: #f6f0f5;
  }
  .theme--light.v-btn--active:hover::before,
  .theme--light.v-btn--active::before,
  .theme--light.v-btn:hover::before {
    opacity: 0 !important;
  }

  .v-toolbar__items > .v-btn {
    height: unset !important;
    text-transform: uppercase !important;
  }
  .theme--light.v-btn.v-btn--has-bg {
    background-color: transparent;
    color: #808080;
    font-size: 14px;
  }
  .v-btn--is-elevated {
    box-shadow: none;
  }
  .v-btn--is-elevated:active {
    box-shadow: none;
  }
  .theme--light.v-btn:hover::before {
    background-color: transparent;
  }
  .v-btn--is-elevated:hover {
    box-shadow: none;
    background: transparent;
  }

  .v-btn__content {
    font-size: 0.9rem;

    white-space: pre-line;
    width: 130px;
    text-align: left;
    display: flex;
    flex-direction: column;
  }
  .theme--light.v-btn:focus::before {
    opacity: 0;
  }
  .v-application .white {
    background-color: transparent !important;
    border-color: transparent !important;
  }
}
</style>
