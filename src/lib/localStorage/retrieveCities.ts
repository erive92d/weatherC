const retrieveCities = () => {
    const visitedCities = JSON.parse(localStorage.getItem("cityHistory") || "[]");
    console.log(visitedCities)

}

export default retrieveCities