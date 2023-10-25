<script>
import WeatherHandler from '../components/WeatherHandler.vue'

export default {
  components: { WeatherHandler },
  data() {
    return { 
      city: ''
    }
  },
}
</script>

<template>
  <main>

<div class="flex  h-screen justify-center items-center">


  <div class="flex flex-col bg-gray-200/20 w-full sm:w-[27rem]   bg-white sm:shadow-2xl sm:rounded-xl">
    

    
    <div class="p-4 ">
      <WeatherHandler :city=city></WeatherHandler>
    </div>
    
    <div class="flex items-center justify-center  mt-auto bg-gray-200/50 w-full sm:rounded-b-xl h-12  ">
      <input v-model.lazy="city" placeholder="Search..." type="text" class=" capitalize w-3/4 text-center text-md bg-gray-200 outline-none rounded-md p-1 duration-500 transition-all focus:bg-gray-300/70 ">
    </div>

  </div>


</div>
  </main>
</template>
