<template>
  <div class="fill-height">


    <AppLayout />
  </div>
</template>

<script>
import AppLayout from "@/modules/shared/components/app-layout";
export default {
  components: {
    AppLayout,
  },
};
</script>
<style>
.theme--dark.v-overlay {
  z-index: 1 !important;
}
</style>
