import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Flight} from "../models.ts";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

type Props = {
    flights: Flight[];
    user?: string;
    userId?: string;
};

export default function FlightCard(props: Props) {
    const [expanded, setExpanded] = useState(false);
    const isAuthenticated = props.user !== undefined && props.user !== "anonymousUser";
    const navigate = useNavigate();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleShareClick = (id: string) => {
        const url = window.location.href + id;
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`;
        window.open(shareUrl, '_blank');
    };

    return (
        <>
            {props.flights.map((flight) => (
                <Card key={flight.id} sx={{ maxWidth: 345, flexDirection: 'column' }}>
                    <Box sx={{ ml: 2, justifyContent: 'flex-start'}}>
                        <Avatar aria-label="emoji"><span>✈️</span></Avatar>
                        <Typography sx={{ mt: 2, ml: 1, color: 'rgb(44, 161, 173)', fontSize: '30px', fontFamily: 'Belanosima'}}>
                            {flight.flightNumber}
                        </Typography>
                    </Box>
                    <CardContent sx={{ ml: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography>
                            Departure: {new Date(flight.scheduledDeparture).toLocaleDateString("de-DE")} from {flight.departureAirport}
                        </Typography>
                        <Typography>
                            Arrival: {flight.arrivalAirport}
                        </Typography>
                        <Typography>
                            Terminal: {flight.terminal}
                        </Typography>
                    </CardContent>

                    <CardActions disableSpacing>
                        {isAuthenticated && props.userId === flight.userId && <FavoriteIcon />}
                        <IconButton aria-label="share flight" onClick={() => handleShareClick(flight.id)}>
                            <ShareIcon />
                        </IconButton>
                        <IconButton aria-label="edit flight" onClick={() => navigate(`/${flight.id}`)}>
                            <EditIcon />
                        </IconButton>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>More details coming soon</Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </>
    )
}
