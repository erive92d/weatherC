export const isToday = (day: string) => {

    const today = new Date();
    const givenDay = new Date(day)


    if (today.getDate() === givenDay.getDate()) {
        return true
    }

}

export default isToday