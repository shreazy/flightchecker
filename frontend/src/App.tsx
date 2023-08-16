import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Container, Paper, Typography, Grid, Box } from '@mui/material';

type Flight = {
    id: string;
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    scheduledDeparture: string;
    scheduledArrival: string;
    terminal: string;
    userId: string;
};

type FlightWithoutId = {
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    scheduledDeparture: string;
    scheduledArrival: string;
    terminal: string;
};

function App() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [newFlight, setNewFlight] = useState<FlightWithoutId>({
        flightNumber: '',
        departureAirport: '',
        arrivalAirport: '',
        scheduledDeparture: '',
        scheduledArrival: '',
        terminal: ''
    });

    useEffect(() => {
        axios.get('/api/flights').then(response => {
            setFlights(response.data);
        });
    }, []);

    const handleOpen = (flight: Flight) => {
        setSelectedFlight(flight);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFlight(null);
    };

    const handleAddFlight = () => {
        axios.post('/api/flights', newFlight).then(response => {
            setFlights(prevFlights => [...prevFlights, response.data]);
        });
    };

    const handleUpdateFlight = (id: string) => {
        if (selectedFlight) {
            axios.put(`/api/flights/${id}`, selectedFlight).then(response => {
                setFlights(prevFlights => prevFlights.map(flight => flight.id === id ? response.data : flight));
            });
        }
    };

    const handleDeleteFlight = (id: string) => {
        axios.delete(`/api/flights/${id}`).then(() => {
            setFlights(prevFlights => prevFlights.filter(flight => flight.id !== id));
        });
    };


    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>Flight Management</Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h6" align="center" gutterBottom>Existing Flights</Typography>
                        <List>
                            {flights.map(flight => (
                                <ListItem key={flight.id} style={{ backgroundColor: '#e0e0e0', margin: '10px 0' }}>
                                    <ListItemText primary={flight.flightNumber} secondary={`${flight.departureAirport} to ${flight.arrivalAirport}`} />
                                    <Button variant="outlined" color="primary" onClick={() => handleOpen(flight)}>Edit</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDeleteFlight(flight.id)}>Delete</Button>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
                        <Typography variant="h6" align="center" gutterBottom>Add New Flight</Typography>
                        <TextField label="Flight Number" value={newFlight.flightNumber} onChange={e => setNewFlight(prev => ({ ...prev, flightNumber: e.target.value }))} fullWidth />
                        <TextField label="Departure Airport" value={newFlight.departureAirport} onChange={e => setNewFlight(prev => ({ ...prev, departureAirport: e.target.value }))} fullWidth />
                        <TextField label="Arrival Airport" value={newFlight.arrivalAirport} onChange={e => setNewFlight(prev => ({ ...prev, arrivalAirport: e.target.value }))} fullWidth />
                        <TextField label="" type="datetime-local" value={newFlight.scheduledDeparture} onChange={e => setNewFlight(prev => ({ ...prev, scheduledDeparture: e.target.value }))} fullWidth />
                        <TextField label="" type="datetime-local" value={newFlight.scheduledArrival} onChange={e => setNewFlight(prev => ({ ...prev, scheduledArrival: e.target.value }))} fullWidth />
                        <TextField label="Terminal" value={newFlight.terminal} onChange={e => setNewFlight(prev => ({ ...prev, terminal: e.target.value }))} fullWidth />
                        <Button variant="contained" color="primary" onClick={handleAddFlight} style={{ marginTop: '20px' }}>Add Flight</Button>
                    </Paper>
                </Grid>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Flight</DialogTitle>
                <DialogContent>
                    <TextField label="Flight Number" value={selectedFlight?.flightNumber} onChange={e => setSelectedFlight(prev => ({ ...prev!, flightNumber: e.target.value }))} fullWidth />
                    <TextField label="Departure Airport" value={selectedFlight?.departureAirport} onChange={e => setSelectedFlight(prev => ({ ...prev!, departureAirport: e.target.value }))} fullWidth />
                    <TextField label="Arrival Airport" value={selectedFlight?.arrivalAirport} onChange={e => setSelectedFlight(prev => ({ ...prev!, arrivalAirport: e.target.value }))} fullWidth />
                    <TextField label="Scheduled Departure" type="datetime-local" value={selectedFlight?.scheduledDeparture} onChange={e => setSelectedFlight(prev => ({ ...prev!, scheduledDeparture: e.target.value }))} fullWidth />
                    <TextField label="Scheduled Arrival" type="datetime-local" value={selectedFlight?.scheduledArrival} onChange={e => setSelectedFlight(prev => ({ ...prev!, scheduledArrival: e.target.value }))} fullWidth />
                    <TextField label="Terminal" value={selectedFlight?.terminal} onChange={e => setSelectedFlight(prev => ({ ...prev!, terminal: e.target.value }))} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleUpdateFlight(selectedFlight?.id || '')} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default App;
