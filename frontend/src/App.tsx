import React, { useState } from 'react';
import { Button, Container, TextField, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

styled(Typography)({
    textAlign: 'center'
});

const SmallTableCell = styled(TableCell)({
    fontSize: '0.7rem'
});

interface Flight {
    status: string;
    flightNumber: string;
    arrivalTime: string;
    departureAirport: string;
    terminal: string;
    arrivalAirport: string;
}

function Header() {
    return (
        <div style={{ textAlign: 'center', padding: '0px 0' }}>
            <img src="/images/flightcheckerlogo.png" alt="logo"
                 loading="lazy"
                 style={{
                     maxWidth: '350px',
                     marginBottom: '5px'
                 }} />
        </div>
    );
}

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
                sx={{ mt: 3, mb: 2, backgroundColor: '#000', color: '#fff' }}
            >
                Search
            </Button>
        </Box>
    );
}

interface FlightInfoProps {
    flight: Flight;
}

function FlightInfo({ flight }: FlightInfoProps) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <SmallTableCell>Status</SmallTableCell>
                        <SmallTableCell>Flight</SmallTableCell>
                        <SmallTableCell>Arrival</SmallTableCell>
                        <SmallTableCell>Departure</SmallTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <SmallTableCell>{flight.status}</SmallTableCell>
                        <SmallTableCell>{flight.flightNumber}</SmallTableCell>
                        <SmallTableCell>{flight.arrivalTime.split('T')[1].substring(0, 5)}</SmallTableCell>
                        <SmallTableCell>{flight.departureAirport}</SmallTableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function App() {
    const [flight, setFlight] = useState<Flight | null>(null);

    const handleSearch = (flightNumber: string) => {
        // Fetch flight data from the backend
        fetch(`http://localhost:8080/flights/${flightNumber}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the backend returns a list and we're interested in the first flight
                const backendFlight = data[0];
                setFlight({
                    status: backendFlight.status,
                    flightNumber: backendFlight.flightNumber,
                    arrivalTime: backendFlight.scheduledArrival, // Adjust based on the backend's response structure
                    departureAirport: backendFlight.departureAirport,
                    terminal: backendFlight.terminal,
                    arrivalAirport: backendFlight.arrivalAirport
                });
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error.message);
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
