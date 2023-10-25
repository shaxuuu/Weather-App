<script>
import { RouterLink, RouterView } from 'vue-router'
import Toast from 'primevue/toast';


export default {
  components: { RouterLink, RouterView, Toast }
}
</script>

<template>

    <RouterView />
    <Toast/>

</template>

<style scoped>
</style>
