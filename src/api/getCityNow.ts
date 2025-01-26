export default async function getCityNow(lat: number, lon: number) {

    try {
        const getData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${import.meta.env.VITE_WEATHER_API}`)
        if (getData.ok) {
            const data = await getData.json()
            return data
        }
    } catch (error) {
        console.log(error)
    }
}
