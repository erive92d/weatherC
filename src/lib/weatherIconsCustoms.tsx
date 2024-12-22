export const weatherIcons = (condition: string) => {

    let conditionIcon: React.ReactNode;

    const clearConditionIcon = <i className="fa-regular text-yellow-300 fa-sun"></i>
    const fewCloudsConditionIcon = <i className="fa-solid fa-cloud-sun"></i>
    // const cloudsConditionIcon = <i className="fa-solid fa-cloud"></i>
    const rainConditionIcon = <i className="fa-solid fa-cloud-showers-heavy"></i>
    const snowConditionIcon = <i className="fa-regular fa-snowflake"></i>
    const mistConditionIcon = <i className="fa-solid fa-bars-staggered"></i>
    const thunderStormIcon = <i className="fa-solid fa-bolt-lightning"></i>

    switch (condition) {
        case "Clear":
            conditionIcon = clearConditionIcon;
            break;
        case "Clouds":
            conditionIcon = fewCloudsConditionIcon;
            break;
        case "Rain":
            conditionIcon = rainConditionIcon;
            break;
        case "Snow":
            conditionIcon = snowConditionIcon;
            break;
        case "Thunderstorm":
            conditionIcon = thunderStormIcon;
            break;
        default:
            conditionIcon = mistConditionIcon;
            break;
    }

    return conditionIcon
}