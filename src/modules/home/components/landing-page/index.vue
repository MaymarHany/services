<template>
  <section class="h-100">
 <div class="h-100" v-if="!confirmed">
   <v-container>
     <v-row class="justify-center">
       <v-col md="3">
         <div class="conOfleftSide mt-10">

           <div class="d-flex">
             <div class="conOfarrow mr-2 cursor" @click="backStep()"><v-icon class="arrow">mdi-arrow-left</v-icon></div>
             <div>
               <div class="currentStepTitle">{{currentStepTitle}}</div>
               <div class="subLeftTxt">long established fact that a
                 reader will be distracted by
                 the readable content of a
                 page when looking at its </div>
             </div>

           </div>

         </div>
       </v-col>
       <v-col  md="8" cols="12" >
         <v-col   cols="12">
           <div class="conOfStepper">
             <v-stepper :value="currentStep" alt-labels elevation="0">
               <v-stepper-header>
                 <v-stepper-step step="1" :complete="currentStep > 1">
                   <div class="txtStep">Choose the service</div>
                 </v-stepper-step>
                 <v-divider></v-divider>
                 <v-stepper-step step="2" :complete="currentStep > 2">
                   <div class="txtStep">Choose languages</div>
                 </v-stepper-step>
                 <v-divider></v-divider>
                 <v-stepper-step step="3" :complete="files.length>0">
                   <div class="txtStep">file to be translated</div>
                 </v-stepper-step>


               </v-stepper-header>
             </v-stepper>
           </div>
         </v-col>
         <v-col cols="12">
           <div v-if="currentStep==1" class="conOfSectionStep">
             <label class="currentStepTitle">{{currentStepTitle}}</label>

             <v-col md="10" cols="12">
               <v-select
                 filled
                 v-model="service"
                 :items="serviceList"
                 item-text="name"
                 item-value="id"
                 placeholder="select service"
                 hide-details="true"
                 attach
                 append-icon="mdi-menu-down"
               ></v-select>
             </v-col>
            <div class="d-flex align-center justify-end w-80 pt-15">
              <v-btn class="primaryBtn" :disabled="service==''" @click="currentStep=2">Next</v-btn>
            </div>
           </div>
           <div v-if="currentStep==2" class="conOfSectionStep">
             <label class="currentStepTitle">source file language</label>

             <v-col md="10" cols="12">
               <v-select
                 filled
                 v-model="sourceLang"
                 :items="sourceLangList"
                 item-text="name"
                 item-value="id"
                 placeholder="select source language"
                 hide-details="true"
                 attach
                 append-icon="mdi-menu-down"
               ></v-select>
             </v-col>
             <label class="currentStepTitle">target language</label>

             <v-col md="10" cols="12">
               <v-select
                 filled
                 v-model="targetLang"
                 :items="targetLangList"
                 item-text="name"
                 item-value="id"
                 placeholder="select target language"
                 hide-details="true"
                 attach
                 append-icon="mdi-menu-down"
               ></v-select>
             </v-col>
             <div class="d-flex align-center justify-end w-80 pt-15">

             <v-btn class="primaryBtn" :disabled="sourceLang=='' || targetLang==''" @click="currentStep=3">Next</v-btn>
           </div>
           </div>

           <div v-if="currentStep==3" class="conOfSectionStep">
             <label class="currentStepTitle mb-4">Drop File here or click to upload file</label>


             <file-upload
               ref="upload"
               :post-action="postAction"
               :put-action="putAction"
               :extensions="extensions"
               :accept="accept"
               :multiple="multiple"
               :directory="directory"
               :create-directory="createDirectory"
               :size="size || 0"
               :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"

               :drop="drop"
               :drop-directory="dropDirectory"
               :add-index="addIndex"
               v-model="files"

               @input-file="inputFile"
               @input-filter="inputFilter"
             >
               <div class="conOfUploadIcon">
                 <img src="@/assets/img/uploadIcon.png"  />
               </div>
               <div>  The File format must be a <span class="fileType"> word , pdf</span> </div>
             </file-upload>
             <div class="conOfFiles" v-if="files.length>0">
               <div  :key="index" v-for="(file, index) in files">

                 <div class="d-flex justify-space-between align-center w-100">
                   <div class="filename d-flex align-center mb-2">
                     <img src="@/assets/img/pdf.png" class="mr-4"> <div>
                     <div>
                       {{file.name}}
                     </div>
                     <div>
                       {{file.size | bytes('KB')}}
                     </div>
                   </div>
                   </div>
                   <div class="cursor" @click="deleteFile(file.id)">
                     <v-icon class="mr-2" >mdi-delete</v-icon> Delete
                   </div>
                 </div>
               </div>
             </div>
             <div class="d-flex align-center justify-end w-80 pt-15">

             <v-btn class="primaryBtn" :disabled="files.length==0" @click="confirmed=true">Confirmation</v-btn>
             </div>
           </div>
         </v-col>
       </v-col>
     </v-row>
   </v-container>
   <div class="d-flex justify-center">
     <v-col md="4">
       <v-snackbar
         :timeout="3000"
         :value="errorAlert"
         class="text-center"
         v-model="errorAlert"
         color="red"
       >
         Please choose a word or pdf file.
       </v-snackbar>
     </v-col>
   </div>
 </div>
    <div v-else class="d-flex align-center justify-center h-100" >
       <div class="ConOfThanks d-flex align-center justify-center">
         <v-icon class="markIcon" >
           mdi-checkbox-marked-circle
         </v-icon>
       <div class="pb-15">  Thank you for you order</div>
         <v-btn class="primaryBtn" @click="confirmed=false">Orders</v-btn>

       </div>
    </div>
  </section>
</template>

<script>
import Vue from "vue";
const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)
export default {
  name: "Home",
  components: {
    FileUpload: VueUploadComponent
  },

  data() {
    return {
      confirmed:false,
      files: [],
      errorAlert:false,
      postAction: '/upload/post',
      putAction: '/upload/put',
      accept: 'file/doc,file/docx,file/pdf',
      extensions: 'doc,docx,pdf',
      // extensions: ['gif', 'jpg', 'jpeg','png', 'webp'],
      // extensions: /\.(gif|jpe?g|png|webp)$/i,
      minSize: 1024,
      size: 1024 * 1024 * 10,
      multiple: true,
      directory: false,
      drop: true,
      dropDirectory: true,
      createDirectory: false,
      addIndex: false,
      thread: 3,
      name: 'file',
      currentStep:1,
      service:'',
      sourceLang:'',
      targetLang:'',
      serviceList:[
       {name:"service1" , id:"1"},

        {name:"service2" , id:"2"},

        {name:"service3" , id:"3"},

        {name:"service4" , id:"4"},

        {name:"service5" , id:"5"},

        {name:"service6" , id:"6"},

      ]
      ,
      targetLangList:[
        {name:"English" , id:"1"},

        {name:"French" , id:"2"},

        {name:"Arabic" , id:"3"},

        {name:"German" , id:"4"},

      ],
      sourceLangList:[
        {name:"English" , id:"1"},

        {name:"French" , id:"2"},

        {name:"Arabic" , id:"3"},

        {name:"German" , id:"4"},

      ],
    };
  },
  computed:{
    currentStepTitle(){

      return this.currentStep==1 ? "Choose the service" :this.currentStep==2 ? "Choose the Language":"File to be translated"

    }
  },
  mounted() {
    /* setTimeout(() => {
      var el = this.$el.getElementsByClassName(this.$route.query.id)[0];
      el.scrollIntoView({ behavior: "smooth" });
      console.log(this.$route.query.id);
    }); */
  },
  created() {},
  methods: {
    backStep(){
      if(this.currentStep !=1){
        this.currentStep-=1
      }
    },
    inputFile: function (newFile, oldFile) {
      if (newFile && oldFile && !newFile.active && oldFile.active) {
        // Get response data
        console.log('response', newFile.response)
        if (newFile.xhr) {
          //  Get the response status code
          console.log('status', newFile.xhr.status)
        }
      }
    },
    deleteFile(id){
      this.files = this.files.filter(function(item) {
        return item.id != id;
      });
      console.log(this.files);
    },
    inputFilter: function (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Filter non-image file
        if (/\.(jpeg|jpe|jpg|gif|png|webp|csv|xls|xlsx|ppt|pptx|txt|HTML|HTM)$/i.test(newFile.name)) {
          this.errorAlert=true
          return prevent()
        }
      }

      // Create a blob field
      newFile.blob = ''
      let URL = window.URL || window.webkitURL
      if (URL && URL.createObjectURL) {
        newFile.blob = URL.createObjectURL(newFile.file)
      }
    },

  },
};
</script>

<style lang="scss" scoped>
@import "./_landing-page.scss";
</style>
