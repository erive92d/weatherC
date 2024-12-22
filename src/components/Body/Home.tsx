// import React, { useEffect, useState } from 'react';
// import { useDebounce } from 'use-debounce';
// import getCityGeo from '../../api/getCityGeo';
// import { useNavigate } from 'react-router-dom';
// import Loading from '../../lib/helper/Loading';
// import EmptyState from '../../lib/helper/EmptyState';
// import { CityDetailsState } from '../../props';
// import ErrorComp from '../../lib/helper/ErrorComp';
// import CityHistory from './CityHistory';

// export default function Home() {
//     const navigate = useNavigate();
//     const [cityName, setCityName] = useState<string>('');
//     const [searchResults, setSearchResults] = useState<CityDetailsState[]>([]);
//     const [cityHistory, setCityHistory] = useState<CityDetailsState[]>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);

//     const [debouncedCityName] = useDebounce(cityName, 1000);

//     useEffect(() => {
//         const fetchData = async () => {
//             if (debouncedCityName) {
//                 setLoading(true);
//                 setError(null);
//                 try {
//                     const response = await getCityGeo(debouncedCityName);
//                     setSearchResults(response);
//                 } catch (err) {
//                     setError('Failed to fetch city results.');
//                 } finally {
//                     setLoading(false);
//                 }
//             }
//         };
//         fetchData();
//     }, [debouncedCityName]);

//     useEffect(() => {
//         const savedCities = JSON.parse(localStorage.getItem('cityHistory') || '[]');
//         setCityHistory(savedCities);
//     }, []);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setCityName(e.target.value);
//     };

//     const handleCitySelect = (city: CityDetailsState) => {
//         navigate(`/city-details`, { state: city });
//     };

//     return (
//         <div className="w-4/5 mx-auto py-8">
//             {/* Navigation Bar */}
//             <Nav cityName={cityName} onChangeCity={handleChange} />

//             {/* Loading, Error, or Search Results */}
//             {loading && <Loading />}
//             {error && <ErrorComp message={error} />}
//             {!loading && !error && searchResults.length === 0 && debouncedCityName && <EmptyState />}
//             {!loading && searchResults.length > 0 && (
//                 <ul className="bg-white text-center divide-y-2 ">
//                     {searchResults.map((result, idx) => (
//                         <li
//                             key={`${result.lat}-${result.lon}-${idx}`}
//                             onClick={() => handleCitySelect(result)}
//                             className="p-2 hover:bg-gray-200 cursor-pointer transition-all"
//                         >
//                             <span className="font-semibold">{result.name}</span>, {result.state}
//                         </li>
//                     ))}
//                 </ul>
//             )}

//             {/* City History */}
//             {cityHistory.length > 0 && <CityHistory handleCitySelect={handleCitySelect} cities={cityHistory} />}
//         </div>
//     );
// }
