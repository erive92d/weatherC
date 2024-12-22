import { CityDetailsState } from "../../props";

const saveCityToLocalStorage = (city: CityDetailsState) => {

    // Retrieve current city history
    const cityHistory: CityDetailsState[] = JSON.parse(localStorage.getItem("cityHistory") || "[]");

    // Check if the city already exists in the history
    const cityExists = cityHistory.some(
        (c) => c.name === city.name && c.state === city.state && c.country === city.country
    );


    if (!cityExists) {
        // Add the new city to the front of the array
        const updatedHistory = [city, ...cityHistory];

        // Limit to 4 cities
        const limitedHistory = updatedHistory.slice(0, 4);
        console.log(limitedHistory)

        // Save the limited history back to localStorage
        localStorage.setItem("cityHistory", JSON.stringify(limitedHistory));
    }
};




export default saveCityToLocalStorage