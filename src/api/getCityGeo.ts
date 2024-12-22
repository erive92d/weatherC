export default async function getCityGeo(cityName: string) {

    try {
        const getData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${import.meta.env.VITE_WEATHER_API}`)
        if (!getData.ok) {
            console.log(getData)
        }
        const data = await getData.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}