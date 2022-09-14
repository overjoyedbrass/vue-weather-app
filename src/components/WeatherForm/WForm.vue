<script setup>
import { ref } from 'vue';
import HStack from '../layout/HStack.vue';
import VStack from '../layout/VStack.vue';
import { getWeatherData } from '../../api/api.js'
import WeatherIcon from '../Icons/WeatherIcon.vue';
import Space from '../layout/Space.vue';
import { format, fromUnixTime } from 'date-fns'
import Error from '../Informative/Error.vue'
import Link from '../layout/Link.vue';
import RecentSearch from './RecentSearch.vue';
import { useSearchStore } from '../../stores/searches.js'

const { addSearch } = useSearchStore()
const searchText = ref('')
const weatherData = ref({
    sys: { sunrise: 0, sunset: 0, country: ""},
    main: {},
    weather: [{ icon: "01d" }],
    wind: {},
    firstLoad: true
})
const modalOpen = ref(false)

const loading = ref(false)

async function fetchOnClick(){
    if(!searchText.value) return;
    loading.value = true;
    const data = await getWeatherData(searchText.value)
    weatherData.value = { ...data }
    searchText.value = ""
    loading.value = false;
    if(data.cod === 200){
        addSearch({ ...data })
    }
}

async function switchModal(){
    modalOpen.value = !modalOpen.value
}

async function recentSearch(searchQuery){
    await switchModal()
    searchText.value = searchQuery
    await fetchOnClick()
}
</script>

<template>
    <div :class="'wform'">
        <RecentSearch 
            v-if="modalOpen" 
            @closePage="switchModal"
            @recentSearch="recentSearch"
        />
        <VStack v-else>
            <HStack>
                <input v-model="searchText" placeholder="city name"/>
                <button @click="fetchOnClick" class="sub-button">
                    <span>Search</span>
                </button>
                <div class="options-button" @click="switchModal">
                    🔍
                </div>
            </HStack>
            <Space />

            <span v-if="weatherData.firstLoad" style="font-size: 1.5em;">
                Enter city name to the search bar
            </span>
            <div v-else-if="loading" class="lds-hourglass"></div>
            <Error v-else-if="weatherData.cod !== 200" :code="weatherData.cod">
                {{ weatherData.message }}
            </Error>
            <div v-else class="wdisplay">
                <h1>
                    {{ weatherData.name || "None" }}
                    ({{ weatherData.sys?.country || "TBD" }})
                </h1>
                <HStack spacing="0em">
                    <WeatherIcon 
                        :icon_id="weatherData.weather[0].icon"
                    />
                    <div id="temp">{{ Math.round(weatherData.main?.temp) || 0 }}°</div>
                </HStack>
                <h2>
                    {{ weatherData.weather[0].main || "Condition" }}, {{weatherData.weather[0].description}}
                </h2>

                <Space space="3em" />

                <HStack spacing="3em">
                    <VStack spacing="5px">
                        <div class="numeric">
                            {{ Math.round(weatherData.wind.speed) }} m/s
                        </div>
                        <img src="https://www.svgrepo.com/show/113083/wind.svg" id="icon"/>
                    </VStack>
                    <VStack spacing="5px">
                        <div class="numeric">
                            {{ format(fromUnixTime(weatherData.sys.sunrise), "HH:mm") }}
                        </div>
                        <img src="https://cdn-icons-png.flaticon.com/512/3222/3222792.png" id="icon"/>
                    </VStack>
                    <VStack spacing="5px">
                        <div class="numeric">
                            {{ format(fromUnixTime(weatherData.sys.sunset), "HH:mm") }}
                        </div>
                        <img src="https://www.svgrepo.com/show/37753/sunset.svg" id="icon"/>
                    </VStack>
                </HStack>
            </div>
        </VStack>
        <footer style="position: relative;">
            <Link to="https://github.com/overjoyedbrass">
                github.com/overjoyedbrass
            </Link>
        </footer>
    </div>
</template>


<style scoped>
.wform {
    align-items: center;
    flex-direction: column;
    display: flex;
    color: white;
    padding: 3em 2em 1em 2em;
    min-width: 400px;
    min-height: 600px;
    max-height: 700px;
    background: linear-gradient(33deg, rgb(119, 0, 255) 0%, rgba(47, 47, 207, 0.747) 55%, rgba(0, 255, 221, 0.781) 100%);
    border-radius: 1em;
    justify-content: space-between;
}

.numeric {
    font-size: 1.2em;
    min-width: 3em;
    text-align: center;
}

.wdisplay {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    width: fit-content;
}
h1 {
    width: fit-content;
    padding: 0.25em;
}

footer {
    width: 100%;
    text-align: center;
}

#temp {
    font-size: 4em;
}
#icon {
    width: 50px;
}
</style>