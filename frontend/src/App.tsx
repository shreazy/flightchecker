import { useState } from 'react';
import { Button, TextField, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle, Container, Paper, Typography, Grid, Box } from '@mui/material';

type Flight = {
    id: string;
    flightNumber: string;
    departureAirport: string;
    arrivalAirport: string;
    scheduledDeparture: string;
    scheduledArrival: string;
    terminal: string;
};

function App() {
    const [flights, setFlights] = useState<Flight[]>([
        {
            id: '1',
            flightNumber: 'LH123',
            departureAirport: 'FRA',
            arrivalAirport: 'JFK',
            scheduledDeparture: '2023-08-14T10:00:00',
            scheduledArrival: '2023-08-14T14:00:00',
            terminal: 'A'
        },
        {
            id: '2',
            flightNumber: 'BA456',
            departureAirport: 'LHR',
            arrivalAirport: 'DXB',
            scheduledDeparture: '2023-08-15T12:00:00',
            scheduledArrival: '2023-08-15T20:00:00',
            terminal: 'B'
        }
    ]);

    const [open, setOpen] = useState(false);
    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [newFlight, setNewFlight] = useState<Omit<Flight, 'id'>>({
        flightNumber: '',
        departureAirport: '',
        arrivalAirport: '',
        scheduledDeparture: '',
        scheduledArrival: '',
        terminal: ''
    });

    const handleOpen = (flight: Flight) => {
        setSelectedFlight(flight);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedFlight(null);
    };

    const handleAddFlight = () => {
        const id = Date.now().toString(); // Using current timestamp as a simple ID generator
        setFlights([...flights, { ...newFlight, id }]);
        setNewFlight({
            flightNumber: '',
            departureAirport: '',
            arrivalAirport: '',
            scheduledDeparture: '',
            scheduledArrival: '',
            terminal: ''
        });
    };

    const handleUpdateFlight = (id: string) => {
        setFlights(flights.map(flight => flight.id === id ? { ...selectedFlight! } : flight));
        handleClose();
    };

    const handleDeleteFlight = (id: string) => {
        setFlights(flights.filter(flight => flight.id !== id));
    };

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>Flight Management</Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#0b655a' }}>
                        <Typography variant="h6" align="center" gutterBottom>Existing Flights</Typography>
                        <List>
                            {flights.map(flight => (
                                <ListItem key={flight.id} style={{ backgroundColor: '#b2c7c5', margin: '10px 0' }}>
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
