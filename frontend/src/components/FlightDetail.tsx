import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Flight} from "../models.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from "@mui/material";
import {Typography} from "@mui/joy";

type Props = {
    onDeleteFlight: (id: string) => void
    user?: string
    userId?: string
}

export default function FlightDetail(props: Props) {
    const [flight, setFlight] = useState<Flight>();
    const isAuthenticated = props.user !== undefined && props.user !== "anonymousUser";
    const params = useParams();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get(`/api/flights/${params.id}`)
            .then(response => response.data)
            .then(data => setFlight(data))
            .catch(console.error);
    }, [params.id]);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Card sx={{maxWidth: 345, display: "flex", flexDirection: "column"}}>
            <CardContent style={{display: "flex", gap: "2rem"}}>
                <Typography component="div">
                    Flight Number: {flight?.flightNumber}
                </Typography>
                <Typography component="div">
                    Departure: {flight?.departureAirport}
                </Typography>
                <Typography component="div">
                    Arrival: {flight?.arrivalAirport}
                </Typography>
            </CardContent>
            {isAuthenticated && <>
                <Button
                    sx={{m: 1, bgcolor: "rgb(44, 161, 173)"}}
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => navigate(`/${flight?.id}/edit`)}>Edit</Button>
                <Button
                    sx={{m: 1}}
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={handleClickOpen}>Delete</Button>

                <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>{"Delete this flight?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this flight?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>No</Button>
                        <Button onClick={() => props.onDeleteFlight(flight?.id!)} color="error" variant="outlined">Delete Flight</Button>
                    </DialogActions>
                </Dialog>
            </>}
            <Button
                sx={{m: 1, color: "rgb(44, 161, 173)", borderColor: "rgb(44, 161, 173)"}}
                variant="outlined"
                disableElevation
                onClick={() => navigate(`/`)}>Back to List</Button>
        </Card>
    );
}
