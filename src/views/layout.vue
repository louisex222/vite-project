<template>
  <Header />
  <RouterView />
  <Footer />
</template>
<script setup lang="ts">
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
import useHome from '@/mixins/useHome'
const { fcGetGameTypeListData } = useHome()
fcGetGameTypeListData()
</script>