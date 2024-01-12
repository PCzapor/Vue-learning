<template>
    <div class="searchCotainer">
        <input
            type="text"
            v-model="cityName"
            list="cityList"
            @keyup.enter="searchCity"
            @input="debouncedFetchSuggestions"
            placeholder="Enter city name"
            @focus="showDropdown = true"
            @blur="hideDropdown"
        />
        <button @click="searchCity">Search</button>
        <div v-if="showDropdown" class="dropdown">
            <div
                v-for="city in suggestion"
                :key="city.name"
                class="dropdown-item"
                @click="selectCity(city)"
            >
                {{ city.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useCity } from "./../composables/fetch";
import type { Ref } from "vue";
import type { CityData } from "./../composables/fetch";
import { useWeatherStore } from "@/stores/useWeatherStore";

const weatherStore = useWeatherStore();
const { cityData, sevenDayForecastData, fetchCityData, fetchSevenDayForecast } =
    useCity();
const cityName: Ref<string> = ref("");
const suggestion = ref<CityData[]>();
const showDropdown = ref(false);
const debounceTime = 400;
let debounceTimeout: number | null = null;

const debouncedFetchSuggestions = () => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        fetchSuggestions();
    }, debounceTime);
};

const fetchSuggestions = async () => {
    if (cityName.value.length > 2) {
        const res = await fetchCityData(cityName.value);
        if (res) {
            suggestion.value = res;
        }
    }
};
const selectCity = (city: CityData) => {
    cityName.value = city.name;
    showDropdown.value = false;
    searchCity();
};
const hideDropdown = () => {
    setTimeout(() => {
        showDropdown.value = false;
    }, 300);
};
const searchCity = async () => {
    await fetchCityData(cityName.value);
    if (cityData.value && cityData.value.length > 0) {
        weatherStore.addCityData(cityData.value[0]);

        await fetchSevenDayForecast(
            cityData.value[0].lon,
            cityData.value[0].lat
        );
        if (!sevenDayForecastData.value) return;
        if (sevenDayForecastData.value) {
            const combined = {
                ...sevenDayForecastData.value,
                city: {
                    ...sevenDayForecastData.value.city,
                    name: cityData.value[0].name,
                    country: cityData.value[0].country,
                },
            };

            weatherStore.addSevenDayForecast(combined);
        }
    }
};

watch(cityName, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        debouncedFetchSuggestions();
    }
});
</script>

<style scoped>
.searchCotainer {
    width: 100%;
    justify-self: flex-start;
    display: flex;
    position: relative;
}
input {
    width: 40%;
    padding: 0.5rem;
}

.dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: 40%;

    z-index: 10;
    border: 1px solid #ccc;
    background-color: white;
}
.dropdown-item {
    padding: 0.5rem;
    color: black;
    cursor: pointer;
    text-align: start;
}
.dropdown-item:hover {
    background-color: #f0f0f0;
}
</style>
