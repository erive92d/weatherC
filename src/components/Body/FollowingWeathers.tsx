import { useEffect, useState } from "react";
import getCurrentCity from "../../api/getCurrentCity";
import isToday from "../../lib/isTodayMatch";
import { CityProps, ResultsProps } from "../../props";
import { weatherIcons } from "../../lib/weatherIconsCustoms";
import WeatherCarousel from "./WeatherCarousel";

interface CityDetailsState {
    name: string;
    state: string;
    lat: number;
    lon: number;
    country: string;
}
const getDayName = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
};

const getHour = (dateTime: string) => {
    const date = new Date(dateTime);
    return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        hour12: true, // For 12-hour format. Set to false for 24-hour format.
    }).format(date);
};



export default function FollowingWeathers({ city }: { city: CityDetailsState }) {

    const [followingWeathers, setFollowingWeathers] = useState<ResultsProps | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);

    const fetchFollowingWeathers = async (lat: number, lon: number) => {

        try {
            setLoading(true);
            setError(null);
            const response = await getCurrentCity(lat, lon);
            setFollowingWeathers(response);
        } catch (err) {
            setError("Failed to fetch city details.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!city) return;
        fetchFollowingWeathers(city.lat, city.lon)
    }, [city])
    return (
        <div>
            <WeatherCarousel
                followingWeathers={followingWeathers}
                isToday={isToday}
                getDayName={getDayName}
                getHour={getHour}
                weatherIcons={weatherIcons}
            />
        </div>

    )
}
