import { useEffect, useState } from "react";
import { CityDetailsState, CityProps } from "../../props"
import getCityNow from "../../api/getCityNow";
import Loading from "../../lib/helper/Loading";
import ErrorComp from "../../lib/helper/ErrorComp";

interface CityHistoryProp {
    cities: CityDetailsState[]
    handleCitySelect: (city: CityDetailsState) => void;
}


export default function CityHistory({ handleCitySelect, cities }: CityHistoryProp) {
    const [cityWeather, setCityWeather] = useState<{ [key: string]: CityProps }>({}); // Storing weather data for each city
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherForCities = async () => {
            setLoading(true);
            setError(null);

            try {
                const weatherData: { [key: string]: CityProps } = {};
                // Fetch weather data for each city
                for (const city of cities) {
                    const { lat, lon } = city;
                    const weatherResponse = await getCityNow(lat, lon); // Fetching weather data from the API
                    weatherData[`${lat}-${lon}`] = weatherResponse;
                }
                setCityWeather(weatherData);
            } catch (err) {
                setError("Failed to fetch weather data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (cities.length > 0) {
            fetchWeatherForCities();
        }
    }, [cities]);

    return (
        <div className="mt-4 text-gray-200 bg-zinc-700  rounded-lg shadow-lg shadow-black p-4">
            <h2 className="text-lg font-bold mb-2">Recently Viewed Cities</h2>

            {/* Show loading or error message */}
            {loading && <Loading />}
            {error && <ErrorComp message={error} />}

            <ul className="divide-y divide-gray-200">
                {cities.map((city, index) => {
                    const weather = cityWeather[`${city.lat}-${city.lon}`]; // Get the weather for this city
                    return (
                        <li
                            key={`${city.lat}-${city.lon}-${index}`}
                            onClick={() => handleCitySelect(city)}
                            className="p-2 cursor-pointer hover:bg-gray-200 transition-all"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-semibold">{city.name}</span>, {city.state}

                                </div>
                                {/* If weather data exists, display it */}
                                {weather && (
                                    <div className="text-sm ">
                                        <span>{weather.main.temp}°</span> {/* Temperature */}
                                    </div>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}


