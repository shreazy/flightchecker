import { FormEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { FlightWithoutId } from "../models.ts";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
    onSubmitFlight: (data: FlightWithoutId) => void;
    flight: FlightWithoutId | undefined;
    legend: string;
    backUrl: string;
    placeholder: string;
};

export default function InputForm(props: Props) {
    const [flightNumber, setFlightNumber] = useState<string>("");
    const [scheduledDeparture, setScheduledDeparture] = useState<string>("");
    const [departureAirport, setDepartureAirport] = useState<string>("");
    const [arrivalAirport, setArrivalAirport] = useState<string>("");
    const [terminal, setTerminal] = useState<string>("");

    const [errorFlightNumber] = useState<string>("");
    const [errorScheduledDeparture] = useState<string>("");
    const [errorDepartureAirport] = useState<string>("");
    const [errorArrivalAirport] = useState<string>("");
    const [errorTerminal] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if (typeof props.flight !== "undefined") {
            setFlightNumber(props.flight.flightNumber);
            setScheduledDeparture(props.flight.scheduledDeparture);
            setDepartureAirport(props.flight.departureAirport);
            setArrivalAirport(props.flight.arrivalAirport);
            setTerminal(props.flight.terminal);
        }
    }, [props.flight]);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data: FlightWithoutId = {
            flightNumber: flightNumber,
            scheduledDeparture: scheduledDeparture,
            departureAirport: departureAirport,
            arrivalAirport: arrivalAirport,
            terminal: terminal
        };
        props.onSubmitFlight(data);
    }

    // Handle change functions for each input field
    function handleChangeFlightNumber(event: React.ChangeEvent<HTMLInputElement>) {
        setFlightNumber(event.target.value);
        // Add validation logic if needed
    }

    function handleChangeScheduledDeparture(event: React.ChangeEvent<HTMLInputElement>) {
        setScheduledDeparture(event.target.value);
        // Add validation logic if needed
    }

    function handleChangeDepartureAirport(event: React.ChangeEvent<HTMLInputElement>) {
        setDepartureAirport(event.target.value);
        // Add validation logic if needed
    }

    function handleChangeArrivalAirport(event: React.ChangeEvent<HTMLInputElement>) {
        setArrivalAirport(event.target.value);
        // Add validation logic if needed
    }

    function handleChangeTerminal(event: React.ChangeEvent<HTMLInputElement>) {
        setTerminal(event.target.value);
        // Add validation logic if needed
    }

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '28px' }}>{props.legend}</legend>
                <TextField
                    label="Flight Number"
                    value={flightNumber}
                    onChange={handleChangeFlightNumber}
                    error={!!errorFlightNumber}
                    helperText={errorFlightNumber}
                />
                <TextField
                    label="Scheduled Departure"
                    type="datetime-local"
                    value={scheduledDeparture}
                    onChange={handleChangeScheduledDeparture}
                    error={!!errorScheduledDeparture}
                    helperText={errorScheduledDeparture}
                />
                <TextField
                    label="Departure Airport"
                    value={departureAirport}
                    onChange={handleChangeDepartureAirport}
                    error={!!errorDepartureAirport}
                    helperText={errorDepartureAirport}
                />
                <TextField
                    label="Arrival Airport"
                    value={arrivalAirport}
                    onChange={handleChangeArrivalAirport}
                    error={!!errorArrivalAirport}
                    helperText={errorArrivalAirport}
                />
                <TextField
                    label="Terminal"
                    value={terminal}
                    onChange={handleChangeTerminal}
                    error={!!errorTerminal}
                    helperText={errorTerminal}
                />
                <div>
                    <Button variant="outlined" onClick={() => navigate(props.backUrl)}>Cancel</Button>
                    <Button type="submit" variant="contained">Submit</Button>
                </div>
            </fieldset>
        </form>
    );
}
