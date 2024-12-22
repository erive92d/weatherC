export const formatDateTime = (dateTime: string) => {
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    }).format(new Date(dateTime));
};

export default formatDateTime
