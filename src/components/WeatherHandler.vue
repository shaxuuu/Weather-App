<template>
    <div v-if="fetchStatus == 200">
        <generalInfo :icon=city_data.weather[0].icon :city_name=city_data.name :weather_subtitle=city_data.weather[0].description :h=this.h_temp   :l=this.l_temp  :temp=city_data.main.temp > </generalInfo>
        <div class="mt-2"></div>
        
        
        <otherWeatherConditions :sunStats=city_data.sys   :timezone=city_data.timezone :clouds=city_data.clouds.all  :rain=city_data.rain  :visibility=city_data.visibility  :pressure=city_data.main.pressure  :wind=city_data.wind.speed  :humidity=city_data.main.humidity> </otherWeatherConditions>
        <FiveDaysWeather :rawFiveDaysData=five_days_data class="mt-6"> </FiveDaysWeather>
    </div>
    
    <div class="flex h-full items-center justify-center" v-else-if="fetchStatus == 0 || city == ''">
        <div class="flex flex-col items-center justify-center" >
            <img v-bind:src="'https://openweathermap.org/img/wn/02d@2x.png'" class="" /> 
            <p class="text-lg text-center">Hi, use searchbar to find <br> weather for your city.</p>
        </div>
    </div>

    <div class="flex h-full items-center justify-center" v-else>
        <div class="flex flex-col items-center justify-center" >
            <img v-bind:src="'https://openweathermap.org/img/wn/02d@2x.png'" class="" /> 
            <p class="text-lg ">Are you sure this city exist?</p>
        </div>
    </div>
</template>



<script>
    import generalInfo from './generalInfo.vue';
    import FiveDaysWeather from './fiveDaysWeather.vue';
    import otherWeatherConditions from './otherWeatherConditions.vue';

    export default {
        name: 'WeatherHandler',
        components:  { generalInfo, FiveDaysWeather, otherWeatherConditions } ,
        props: ['city'],
        
        data() {
            return { 
                city_data: [],
                five_days_data:[],
                fetchStatus: 0
            };
        },
        watch: {
            city(newQuestion, oldQuestion) {
                this.fetchCityWeather( this.city )
                this.fetchFiveDaysWeather( this.city )

            },
            five_days_data(newQuestion, oldQuestion) {
                this.getHighLow(this.five_days_data)
            }
        },
        methods:
        {
            fetchCityWeather( city ){
                this.axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pl&appid=36bb972eb44abc7137a2a84bd63afd71&units=metric`)
                .then(response => {
                    
                    this.fetchStatus = response.status
                    this.city_data = response.data
                    console.log( this.city_data  )

                }).catch( error => {
                    this.fetchStatus = error.response.status
                })
            },
            fetchFiveDaysWeather( city ){
                this.axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=pl&appid=36bb972eb44abc7137a2a84bd63afd71&units=metric`)
                .then(response => {
                
                    this.five_days_data = response.data.list
                
                }).catch( error => {
                })
            },
            getHighLow(cityData){
                let minMax = []
                console.log(cityData)
                cityData.forEach(element => {
                    let today_date = new Date()
                    today_date = `${today_date.getFullYear()}-${(today_date.getMonth() + 1).toString().padStart(2, "0")}-${today_date.getDate().toString().padStart(2, "0")}`

                    if( today_date == element.dt_txt.substr(0, 10) ){
                        minMax.push( element.main.temp )
                    }else{
                        this.l_temp = Math.min(...minMax)
                        this.h_temp = Math.max(...minMax)
                        return
                    }
                }); 
            }
        }
        
    }
</script>