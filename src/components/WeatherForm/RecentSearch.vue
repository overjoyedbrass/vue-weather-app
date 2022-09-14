<script setup>
import HStack from '../layout/HStack.vue';
import VStack from '../layout/VStack.vue';
import Space from '../layout/Space.vue';
import { useSearchStore } from '../../stores/searches.js'
import WeatherIcon from '../Icons/WeatherIcon.vue';

const { searches } = useSearchStore()

</script>
<template>
    <HStack spacing="1em">
        <h1>Recent search</h1>
        <div 
            class="options-button" 
            @click="$emit('closePage')"
        >
            🔙
        </div>
    </HStack>

    <Space />

    <VStack spacing="0em" style="padding: 0em 2em; margin-bottom: 1em;">
        <template v-for="search in searches">
            <HStack @click="$emit('recentSearch', search.name)" style="cursor: pointer;">
                <WeatherIcon :icon_id="search.weather[0].icon"/>
                <span>{{ search.name }}</span>
                <span>{{ Math.round(search.main.temp) }}°</span>
            </HStack>
        </template>
    </VStack>
</template>
<style scoped>
    span {
        display: flex;
        align-items: center;
        font-size: 1.3em;
    }
</style>