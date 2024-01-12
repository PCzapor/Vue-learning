import { instnce } from '@/main'
import axios from 'axios'
import { ref } from 'vue'
import type { Ref } from 'vue'

export interface CityData {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}
interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
}

interface Wind {
  speed: number
  deg: number
  gust: number
}
export interface ListOfWeather {
  dt: number
  main: Main
  weather: Weather[]
  wind: Wind
  pop: number
  rain: {
    hhh: number
  }

  dt_txt: string
}
interface City {
  id: number
  name: string
  coord: {
    lon: number
    lat: number
  }
  country: string
  sunrise: number
  sunset: number
}

export interface WeatherApiSevenDayResponse {
  list: ListOfWeather[]
  cnt: number
  city: City
  active: string
}

type CityDataResponse = CityData[]

export function useCity() {
  const cityData: Ref<CityDataResponse | null> = ref(null)
  const sevenDayForecastData: Ref<WeatherApiSevenDayResponse | null> = ref(null)
  const error: Ref<string | null> = ref(null)
  const isLoading: Ref<boolean> = ref(false)
  const APIkey = 'c1b3bc542ae7be31ea8b9675cfa46e13'

  const fetchCityData = async (cityName: string) => {
    isLoading.value = true
    error.value = null
    cityData.value = null

    try {
      const response = await axios.get<CityDataResponse>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}}&limit=1&appid=${APIkey}`
      )
      cityData.value = response.data
      return response.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      isLoading.value = false
    }
  }
  const fetchSevenDayForecast = async (lat: number, lon: number) => {
    isLoading.value = true
    error.value = null
    sevenDayForecastData.value = null
    try {
      const response = await instnce.get<WeatherApiSevenDayResponse>(
        `forecast?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`
      )
      sevenDayForecastData.value = response.data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      isLoading.value = false
    }
  }
  return {
    cityData,
    error,
    sevenDayForecastData,
    isLoading,
    fetchCityData,
    fetchSevenDayForecast
  }
}
