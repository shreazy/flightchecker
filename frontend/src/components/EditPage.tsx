import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {FlightWithoutId, Flight} from "../models.ts";
import InputForm from "./InputForm.tsx";

type Props = {
    onEditFlight: (id: string, data: FlightWithoutId) => void;
}

export default function EditPage(props: Props) {
    const [id, setId] = useState<string>("")
    const [flight, setFlight] = useState<Flight>()

    const params = useParams();

    useEffect(() => {
        axios.get(`/api/flights/${params.id}`)
            .then(response => response.data)
            .catch(console.error)
            .then(data => {
                setId(data.id)
                setFlight(data)
            })
    }, [params.id])

    function handleSubmit(editedFlight: FlightWithoutId) {
        props.onEditFlight(id, editedFlight)
    }

    const flightWithoutID: FlightWithoutId = typeof flight !== "undefined"
        ? {flightNumber: flight.flightNumber, departureAirport: flight.departureAirport, arrivalAirport: flight.arrivalAirport, scheduledDeparture: flight.scheduledDeparture, terminal: flight.terminal}
        : {flightNumber: "", departureAirport: "", arrivalAirport: "", scheduledDeparture: "", terminal: ""}

    return flight &&
        <InputForm onSubmitFlight={handleSubmit} flight={flightWithoutID} legend="Edit Flight" backUrl={`/${id}`} placeholder=""/>
}
