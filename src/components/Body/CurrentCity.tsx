import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { CityDetailsState, CityProps } from "../../props";
import getCityNow from "../../api/getCityNow";
import FollowingWeathers from "./FollowingWeathers";
import { weatherIcons } from "../../lib/weatherIconsCustoms";
import saveCityToLocalStorage from "../../lib/localStorage/saveCityToLocalStorage";
import useCityStore from "../../lib/stores/cityStore";

const Loader = () => <p className="text-center text-blue-500">Loading city details...</p>;

const ErrorMessage = ({ message }: { message: string }) => (
    <p className="text-center text-red-500">{message}</p>
);

const convertTime = (time: number) => {
    const date = new Date(time * 1000);
    console.log(date)
    const timeString = date.toLocaleString('en-US', { hour: 'numeric', hour12: true, timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
    return timeString

}


const WeatherCard = ({ weatherNow }: { weatherNow: CityProps }) => {
    const [isClick, setIsClick] = useState<boolean>(false);

    return (
        <div className="flex flex-col md:flex-row lg:flex-row gap-8 mb-4">
            {/* Main Weather Info */}
            <div className="flex-1 flex justify-evenly items-center space-y-4 custom-box rounded-xl">
                <p className="text-9xl">{weatherIcons(weatherNow?.weather[0]?.main)}</p>
                <div className="flex flex-col text-5xl gap-2 justify-center text-center">
                    <p className="font-bold">
                        {weatherNow.main.temp}
                        <span className="font-thin">°</span>
                    </p>
                    <p className="font-semibold text-2xl">{weatherNow.weather[0].main}</p>
                    <h1 className="text-sm">
                        {weatherNow.name}, <span>{weatherNow.sys.country}</span>
                    </h1>
                </div>

            </div>

            {/* Additional Info */}
            <div
                className={`lg:w-1/4 custom-box flex md:flex-col lg:flex-col rounded-lg items-center justify-between space-y-4 text-center overflow-hidden`}
            >
                <div>
                    <i className="fa-solid text-blue-400 fa-droplet"></i>
                    <p className="text-lg">{weatherNow.main.humidity}%</p>
                    <p className="text-sm">Humidity</p>
                </div>
                <div>
                    <i className="fa-solid fa-wind"></i>
                    <p className="text-lg">{weatherNow.wind.speed} mph</p>
                    <p className="text-sm">Wind</p>
                </div>
                <div>
                    <p className="text-lg">{weatherNow.main.feels_like}°</p>
                    <p className="text-sm">Feels like</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-lg">{convertTime(weatherNow.sys.sunrise)}</p>
                    <p className="text-sm font-thin">Sunrise</p>
                    <p className="text-lg">{convertTime(weatherNow.sys.sunset)}</p>
                    <p className="text-sm font-thin">Sunset</p>
                </div>
            </div>
        </div>
    );
};





export default function CurrentCity() {
    const { selectedCity, setSelectedCity } = useCityStore()
    const [weatherNow, setWeatherNow] = useState<CityProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedCity = localStorage.getItem("selectedCity");

        if (storedCity && !selectedCity) {
            setSelectedCity(JSON.parse(storedCity) as CityDetailsState);
        }
    }, [selectedCity, setSelectedCity]);


    useEffect(() => {
        if (!selectedCity) return;
        const fetchWeatherNow = async () => {
            try {
                setLoading(true);
                setError(null);
                saveCityToLocalStorage(selectedCity); // Save to history
                localStorage.setItem("selectedCity", JSON.stringify(selectedCity)); // Persist the selected city
                const response = await getCityNow(selectedCity.lat, selectedCity.lon);
                setWeatherNow(response);
            } catch (err) {
                setError("Failed to fetch city details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherNow();
    }, [selectedCity]);

    if (!selectedCity) {
        return null
    }

    return (
        <div className="flex-1 w-full px-4 lg:w-3/4 mx-auto">
            {/* Loader */}
            {loading && <Loader />}
            {/* Error Message */}
            {error && <ErrorMessage message={error} />}
            {/* Weather Details */}
            {!loading && !error && weatherNow && <WeatherCard weatherNow={weatherNow} />}
            {/* Following Weathers */}
            <FollowingWeathers city={selectedCity} />
        </div>
    );
}


