

export type CityProps = {
    base: string
    clouds: {
        all: number
    }
    cod: number
    coord: {
        lon: number
        lat: number
    }
    dt: number
    id: number
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        grnd_level: 950
        humidity: number
        sea_level: number
    }
    name: string
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    visibility: number
    weather: {
        description: string
        icon: string
        id: number
        main: string
    }[]
    wind: {
        deg: number
        gust: number
        speed: number
    }

}

export type ResultsProps = {
    city: CityProps & Partial<{
        country: string
    }>
    cnt: number
    cod: string
    list: CityProps & Partial<{
        dt_txt: string
        pop: number
        sys: {
            pod: string
        }
        main: {
            temp: number
            feels_like: number
            temp_min: number
            temp_max: number
            pressure: number
            grnd_level: 950
            humidity: number
            sea_level: number
        }
        weather: {
            description: string
            icon: string
            id: number
            main: string
        }[]
    }[]>
    message: number
}

export type CityDetailsState = {
    name: string;
    state: string;
    lat: number;
    lon: number;
    country: string;
}