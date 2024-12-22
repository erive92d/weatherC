import { CityDetailsState } from "../../props"

type NavProps = {
    onChangeCity: React.ReactEventHandler
    cityName: string
    results: CityDetailsState[]
    handleCitySelect: (result: CityDetailsState) => void
    loading: boolean
}


export default function InputComp({ loading, onChangeCity, cityName, results, handleCitySelect }: NavProps) {

    return (
        <div className='relative py-2  flex items-center flex-col space-y-4'>
            <div className="custom-box rounded-full text-white w-96 flex items-center space-x-4">
                <input
                    value={cityName}
                    onChange={onChangeCity}
                    type="text"
                    placeholder="Search for a city..."
                    className="bg-transparent flex-grow outline-none text-white placeholder-zinc-400"
                />
                {loading ?
                    <i className="fa-solid fa-spinner"></i>
                    :
                    <i className="fa-solid fa-magnifying-glass text-zinc-300"></i>

                }
            </div>
            {!loading &&
                <ul className="absolute rounded-lg top-10 w-full bg-white text-black text-center divide-y-2 shadow-lg shadow-black">
                    {results.map((result, idx) => (
                        <li
                            key={`${result.lat}-${result.lon}-${idx}`}
                            onClick={() => handleCitySelect(result)}
                            className="p-2 hover:bg-gray-200 cursor-pointer transition-all"
                        >
                            <span className="font-semibold">{result.name}</span>, {result.state}
                        </li>
                    ))}
                </ul>
            }

        </div>
    )
}
