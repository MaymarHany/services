<template>
  <section class="conOfFooter" v-if="!appearFooter">
    <section class="sectionOne">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-row class="align-center">
             <v-col md="3" cols="12">
               <div class="btnContainer text-center">
                 <v-btn text>
                   <v-icon color="#fff"> mdi-facebook </v-icon>
                 </v-btn>

                 <v-btn text>
                   <v-icon color="#fff"> mdi-twitter </v-icon>
                 </v-btn>
                 <v-btn text>
                   <v-icon color="#fff"> mdi-linkedin </v-icon>
                 </v-btn>


               </div>
             </v-col>
              <v-col class="d-flex justify-center" md="7" cols="12">
                <div class="conEachFooterSec">
                  <div class=" d-flex">
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      :to="{ name: 'home' }"
                    >
                      Home
                    </v-btn>
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      :to="{ name: 'about' }"
                    >
                     About Us
                    </v-btn>
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      :to="{ name: 'contact' }"
                    >
                      Contact Us
                    </v-btn>
                    <v-btn
                      text
                      tile
                      :ripple="false"
                      class="eachLinkFooter"
                      :to="{ name: 'blogs' }"
                    >
                      Blogs
                    </v-btn>
                  </div>
                  </div>

              </v-col>
              <v-col md="2" cols="12" class="d-flex justify-center">
                <img src="@/assets/img/logo.png" class="logoImg" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </section>
</template>
<script>
export default {
  name: "footerMessage",
  components: {},
  data: () => ({
    appearFooter: false,
  }),
  methods: {
    hideFooter() {
      this.appearFooter = true;
      this.$store.commit("setFooterExist", true);
    },
  },
};
</script>
