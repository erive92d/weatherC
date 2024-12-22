import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import getCityGeo from '../../api/getCityGeo';
import Loading from '../../lib/helper/Loading';
import { CityDetailsState } from '../../props';
import useCityStore from '../../lib/stores/cityStore';
import InputComp from './InputComp';
import ErrorComp from '../../lib/helper/ErrorComp';

export default function Header() {
    const [cityName, setCityName] = useState<string>('');
    const [searchResults, setSearchResults] = useState<CityDetailsState[]>([]);
    const [cityHistory, setCityHistory] = useState<CityDetailsState[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setSelectedCity } = useCityStore();
    const [debouncedCityName] = useDebounce(cityName, 1000);

    useEffect(() => {
        const fetchData = async () => {
            if (debouncedCityName) {
                setLoading(true);
                setError(null);
                try {
                    const response = await getCityGeo(debouncedCityName);
                    setSearchResults(response);
                } catch (err) {
                    setError('Failed to fetch city results.');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [debouncedCityName]);

    useEffect(() => {
        const savedCities = JSON.parse(localStorage.getItem('cityHistory') || '[]');
        setCityHistory(savedCities);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.value) {
            setSearchResults([])
        }
        setCityName(e.target.value);
    };

    const handleCitySelect = (city: CityDetailsState) => {
        setSelectedCity(city)
        setSearchResults([]); // Clear the search results
    };

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between py-4 px-4 lg:w-3/4 mx-auto">
            <div className="text-4xl font-extrabold  text-zinc-300">
                WeatherC
            </div>
            {/* Navigation Bar */}
            <InputComp loading={loading} handleCitySelect={handleCitySelect} results={searchResults} cityName={cityName} onChangeCity={handleChange} />
            {/* Loading, Error, or Search Results */}
            {/* {loading && <Loading />} */}
            {error && <ErrorComp message={error} />}
            <button className='custom-box rounded-full'>
                Settings
            </button>
        </div>
    );
}
