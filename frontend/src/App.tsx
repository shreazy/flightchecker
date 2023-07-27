import { useState } from 'react'
import './App.css'
import { Button, Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Flight {
    status: string;
    flightNumber: string;
    arrivalTime: string;
    departureAirport: string;
    terminal: string;
    arrivalAirport: string;
}

// Header component
function Header() {
    return <Typography component="h1" variant="h5">Flight Search</Typography>;
}

// Search component
interface SearchProps {
    onSearch: (flightNumber: string) => void;
}

function Search({ onSearch }: SearchProps) {
    const [flightNumber, setFlightNumber] = useState('');

    const handleSearch = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(flightNumber);
    };

    return (
        <Box component="form" onSubmit={handleSearch} noValidate sx={{ mt: 1 }}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="flightNumber"
                label="Flight Number"
                name="flightNumber"
                autoFocus
                value={flightNumber}
                onChange={e => setFlightNumber(e.target.value)}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Search
            </Button>
        </Box>
    );
}

// FlightInfo component
interface FlightInfoProps {
    flight: Flight;
}

function FlightInfo({ flight }: FlightInfoProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Status</TableCell>
                        <TableCell>Flight Number</TableCell>
                        <TableCell>Arrival Time</TableCell>
                        <TableCell>Departure Airport</TableCell>
                        <TableCell>Terminal</TableCell>
                        <TableCell>Arrival Airport</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{flight.status}</TableCell>
                        <TableCell>{flight.flightNumber}</TableCell>
                        <TableCell>{flight.arrivalTime}</TableCell>
                        <TableCell>{flight.departureAirport}</TableCell>
                        <TableCell>{flight.terminal}</TableCell>
                        <TableCell>{flight.arrivalAirport}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

// Main App component
function App() {
    const [flight, setFlight] = useState<Flight | null>(null);

    const handleSearch = (flightNumber: string) => {
        setFlight({
            status: "",
            flightNumber: flightNumber,
            arrivalTime: "2023-07-27T09:05:00",
            departureAirport: "Hamburg",
            terminal: "1",
            arrivalAirport: "Berlin"
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Header />
            <Search onSearch={handleSearch} />
            {flight && <FlightInfo flight={flight} />}
        </Container>
    );
}

export default App;
