<template>
    <div class="grid gap-2 grid-rows-2 grid-cols-2 w-full	h-28  rounded-xl p-2 bg-gray-300/30 shadow-lg  " >
        
            <div class="flex text-sm justify-center items-center w-full h-full rounded-md shadow-md bg-white  "> 
                <i class="bi bi-sunrise text-xl sm:mr-32 mr-28 "></i> <p class="absolute sm:mr-20 mr-[4.5rem]"> {{ getTimeFromUnix(sunStats.sunrise) }} </p>
                <p class=" absolute sm:ml-[5rem] ml-[4.5rem]">{{ getTimeFromUnix(sunStats.sunset) }} </p> <i class="bi bi-sunset-fill text-xl ml-1 "></i>
            </div>
                
            <div class="flex text-sm items-center justify-center w-full  h-full rounded-md shadow-md   bg-white  bg-gradient-to-b from-gray-100/50 to-white"> 
                
                <i class="bi bi-clouds text-xl sm:mr-32 mr-28"></i> <p class="absolute sm:mr-[5rem] mr-[4.5rem]"> {{  clouds + '%' }} </p>
                <p class=" absolute sm:ml-[3.5rem] ml-[3rem]"> {{ pressure + 'hPa' }} </p> <img src="../assets/icons/pressure.png" width="24" class="">

            </div>
        
            <div class="flex text-sm items-center justify-center w-full  h-full rounded-md shadow-md   bg-white  bg-gradient-to-b from-gray-100/50 to-white"> 
                <i class="bi bi-wind text-xl sm:mr-32 mr-28"></i> <p class="absolute sm:mr-[4rem] mr-[3rem]"> {{ leaveOneFloatNum(wind) + 'km/h' }} </p>
                <p class=" absolute sm:ml-[5rem] ml-[3.8rem]"> {{  leaveOneFloatNum( visibility/1000 )  + 'km' }}  </p> <i class="bi bi-eye text-xl sm:ml-1 "></i>

            </div>

            <div class="flex text-sm items-center justify-center w-full  h-full rounded-md shadow-md   bg-white  bg-gradient-to-b from-gray-100/5 0 to-white"> 
                <i class="bi bi-cloud-drizzle text-xl sm:mr-32 mr-28"></i> <p v-if="rain" class="absolute sm:mr-20 mr-[4.5rem]"> {{  leaveOneFloatNum( rain['1h'] )  + '%'  }} </p> <p v-else class="absolute sm:mr-[5.5rem] text-justify  mr-[4.5rem]"> 0% </p> 
                <p class=" absolute sm:ml-[5.5rem] text-right ml-[4.5rem]"> {{ humidity + '%' }} </p> <i class="bi bi-moisture text-xl sm:ml-1 "></i>
            </div>


        

    </div>

</template>

<!-- 6 dni jest  -->

<script>

    export default {
        name: 'otherWeatherConditions',
        props: [ 'sunStats', 'timezone', 'pressure', 'wind', 'clouds', 'visibility', 'rain', 'humidity' ],
        data() {
            return { 
            };
        },
        methods: {
            getTimeFromUnix(unixTimestamp){
                let dateObj = new Date(unixTimestamp * 1000);
                dateObj = new Date((typeof dateObj === 'string' ? new Date(dateObj) : dateObj).toLocaleString('en-US', this.timezone )) 

                let hours = dateObj.getHours();
                let minutes = dateObj.getMinutes();

                let result =  hours.toString().padStart(2, "0")  + ':' +  minutes.toString().padStart(2, "0") 
                
                return result;

            },
            leaveOneFloatNum(givenNumber){
                let formatedNumbers = givenNumber.toFixed(1)
                return formatedNumbers
            }
            },

        }

        
</script>