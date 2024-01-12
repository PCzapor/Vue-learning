import type { CityData, WeatherApiSevenDayResponse } from '@/components/composables/fetch'
import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    citiesData: [] as CityData[],
    sevenDayForecastData: [] as WeatherApiSevenDayResponse[]
  }),
  actions: {
    addCityData(cityData: CityData) {
      const cityExists = this.citiesData.some((city) => {
        return city.name === cityData.name
      })
      if (!cityExists) {
        this.citiesData.push(cityData)
      }
    },
    addSevenDayForecast(forecastSevenDays: WeatherApiSevenDayResponse) {
      const cityExistsSevenDay = this.sevenDayForecastData.some((city) => {
        return city.city.name === forecastSevenDays.city.name
      })

      if (!cityExistsSevenDay && this.sevenDayForecastData.length < 1) {
        return this.sevenDayForecastData.push({ ...forecastSevenDays, active: 'active' })
      }
      if (!cityExistsSevenDay) {
        this.sevenDayForecastData.push(forecastSevenDays)
      }
    },

    removeCityData(forecastSevenDays: WeatherApiSevenDayResponse) {
      this.sevenDayForecastData = this.sevenDayForecastData.filter((e) => {
        return e.city.name !== forecastSevenDays.city.name
      })
    },
    setActive(forecastSevenDays: WeatherApiSevenDayResponse) {
      this.sevenDayForecastData.forEach((city) => {
        city.active = city.city.name === forecastSevenDays.city.name ? 'active' : ''
      })
    }
  }
})
