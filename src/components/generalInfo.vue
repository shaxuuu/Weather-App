<template>
    <div class="flex flex-col" >
        <div class="flex mt-4 ">
            <div class="flex-col">
                <div class="text-2xl font-semibold"> {{ city_name }} </div>
                <div class="capitalize text-md"> {{ weather_subtitle }} </div>
            </div>
            
            
            
            <div class="flex ml-auto justify-center items-center mt-[-9px] ">
                
                <div class="flex-col   float-right">
                    <div class="text-lg font-semibold text-right"> {{ Math.trunc( temp ) }}°C </div>
                    <div class="text-sm text-right"> L:{{ Math.trunc( l ) }}° H:{{ Math.trunc( h ) }}°</div>
                </div>
                
                <img v-bind:src="'https://openweathermap.org/img/wn/'+ icon +'@2x.png'" width="80" class=" float-right"/> 
            </div>
        </div>
        

    </div>
</template>



<script>
    export default {
        name: 'generalInfo',
        props: ['icon', 'city_name', 'weather_subtitle', 'h', 'l', 'temp'],
        
        data() {
            return { 

            };
        }

        
    }
</script>