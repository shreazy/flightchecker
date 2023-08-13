import {FlightWithoutId} from "../models.ts";
import InputForm from "./InputForm.tsx";

type Props = {
    onAddFlight: (data: FlightWithoutId) => void;
}

export default function AddPage(props: Props) {
    const newFlight: FlightWithoutId = {flightNumber: "", departureAirport: "", arrivalAirport: "", scheduledDeparture: "", terminal: ""}

    return <InputForm onSubmitFlight={props.onAddFlight} flight={newFlight} legend={"Add new Flight"} backUrl="/" placeholder=""/>
}
