import { useRef } from "react";

export default function WeatherCarousel({ followingWeathers, isToday, getDayName, getHour, weatherIcons }: any) {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scrollCarousel = (scrollOffset: number) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
        }
    };

    return (
        <div className="relative">
            {/* Carousel Container */}
            <div
                ref={carouselRef}
                className="flex overflow-x-auto p-4 gap-4 bg-gradient-to-r from-zinc-600 via-zinc-700 to-zinc-800 shadow-lg shadow-black rounded-xl snap-x snap-mandatory scrollbar-hide"
            >
                {followingWeathers?.list?.map((dates: any, index: number) => (
                    <div
                        key={index}
                        className="flex-shrink-0 text-center bg-zinc-700 p-4 rounded-lg min-w-[120px] snap-center border border-zinc-500 hover:scale-105 transform transition-all duration-300"
                    >
                        <span className="block text-sm font-semibold text-gray-300">
                            {dates?.dt_txt ? (isToday(dates.dt_txt) ? "Today" : getDayName(dates.dt_txt)) : "Unknown Date"}
                        </span>
                        <h1 className="text-lg font-bold text-gray-200">
                            {dates?.dt_txt ? getHour(dates.dt_txt) : "Unknown Time"}
                        </h1>
                        <h1 className="text-4xl">{weatherIcons(dates?.weather?.[0]?.main ?? "Unknown Weather")}</h1>
                        <p className="text-lg text-gray-100 font-semibold">
                            {dates?.main?.temp}
                            <span className="font-thin">°</span>
                        </p>
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full shadow-lg hover:bg-zinc-700 transition-all z-10"
                onClick={() => scrollCarousel(-200)}
            >
                <i className="fas fa-chevron-left"></i>
            </button>
            <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-zinc-800 text-white p-2 rounded-full shadow-lg hover:bg-zinc-700 transition-all z-10"
                onClick={() => scrollCarousel(200)}
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
}
