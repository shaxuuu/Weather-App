<template>
    <div class="grid gap-3 grid-rows-5 grid-cols-1 w-full	h-64  rounded-xl p-3  bg-gray-300/30 shadow-lg mt-4" >
        
        <div v-for="day in formatedFiveDaysData" class="flex items-center  w-full  h-full rounded-md shadow-md bg-white text-left p-2"> 
            <div class=" w-28"> <p class="capitalize text-lg font-semibold text-left"> {{day.day}} </p> </div>
            <img v-bind:src="'https://openweathermap.org/img/wn/'+ day.icon +'@2x.png'" width="45" class=" ml-3.5 sm:ml-10" /> 
            <div class=" w-[5.5rem] text-left ml-auto "> <p class="text-sm font-semibold "> <p class="float-left"> L:{{day.min}}°</p> <p class="float-left ml-3.5"> H:{{day.max}}°</p> </p> </div>
        </div>
    

    </div>

</template>

<!-- 6 dni jest  -->

<script>
    export default {
        name: 'FiveDaysWeather',
        props: ['rawFiveDaysData' ],
        
        data() {
            return { 
                formatedFiveDaysData: []
            };
        },
        watch: {
            rawFiveDaysData(newQuestion, oldQuestion) {
                this.calculateMinMaxOfDay( this.rawFiveDaysData )

            }
        },
        methods:{
            calculateMinMaxOfDay( data ){
                this.formatedFiveDaysData = []

                let todayCount = 0
                data.forEach(element => {
                    let today_date = new Date()
                    today_date = `${today_date.getFullYear()}-${(today_date.getMonth() + 1).toString().padStart(2, "0")}-${today_date.getDate().toString().padStart(2, "0")}`

                    if( today_date == element.dt_txt.substr(0, 10) ){
                        todayCount ++;
                    }else{
                        return
                    }
                }); 

                let loopCounter = 0;
                
                for (let i = 0; i < 4; i++) {
                    let minAndMax = []
                    let icons = []
                    
                        for (let i_2 = 0; i_2 < 8; i_2++) {
                            minAndMax.push( Math.trunc( this.rawFiveDaysData[ loopCounter + todayCount ].main.temp ) )
                            icons.push(  this.rawFiveDaysData[ loopCounter + todayCount].weather[0].icon  )
                            
                            loopCounter ++;
                        }
                    
                    let min = Math.min(...minAndMax)
                    let max = Math.max(...minAndMax)
                    var d = new Date( ( this.rawFiveDaysData[ loopCounter + todayCount - 1].dt ) * 1000).toLocaleString('pl-PL', {weekday:'long'})
                    var dayName = d.toString().split(' ')[0];

                    
                    let icon = this.rawFiveDaysData[ loopCounter - 4 ].weather[0].icon
                    
                    
                    this.formatedFiveDaysData.push( {'day':dayName, 'min':min, 'max':max, 'icon':icon } )
                }

                for (let i = 0; i < 1; i++) {
                    let minAndMax = []
                        
                            for (let i_2 = 0; i_2 < 8 - todayCount ; i_2++) {
                                minAndMax.push( Math.trunc( this.rawFiveDaysData[ loopCounter  ].main.temp ) )
                                
                                loopCounter ++;
                            }
                        
                    let min = Math.min(...minAndMax)
                    let max = Math.max(...minAndMax)
                    var d = new Date( ( this.rawFiveDaysData[ loopCounter + todayCount - 1].dt ) * 1000).toLocaleString('pl-PL', {weekday:'long'})
                    var dayName = d.toString().split(' ')[0];
                    let icon;
                    if( todayCount == 0){
                        icon = this.rawFiveDaysData[ loopCounter - 1 ].weather[0].icon
                    }else{
                        icon = this.rawFiveDaysData[ loopCounter - parseInt(( todayCount / 2 ), 10) ].weather[0].icon
                    }


                    this.formatedFiveDaysData.push( {'day':dayName, 'min':min, 'max':max, 'icon':icon } )

                }
                
                console.log( this.formatedFiveDaysData )
            }
        }

        
    }
</script>