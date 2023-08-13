export type Flight = {
    id: string,
    scheduledDeparture: string,
    departureAirport: string,
    arrivalAirport: string,
    flightNumber: string,
    terminal: string,
    userId: string,
}

export type FlightWithoutId = {
    scheduledDeparture: string,
    departureAirport: string,
    arrivalAirport: string,
    flightNumber: string,
    terminal: string,
}

export type Quiz = {
    id: string,
    question: string,
    answers: {
        answerText: string
        rightAnswer: boolean
    }[]
}
