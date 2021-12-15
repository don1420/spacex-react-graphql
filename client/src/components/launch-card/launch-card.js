import React from "react";
import { Grid, Card, CardMedia, CardContent, CardActions, Typography, Button} from '@mui/material';
import { grey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
    launchCardImg: {
        backgroundSize: "contain"
    },
    buttonInfo: {
        color: grey[300]
    }
}));

const LaunchCard = ({ name, date_local, success, links, flight_number }) => {
    const defaultPlaceholderUrl = 'https://via.placeholder.com/300x300';
    const styles = useStyles();

    return (
        <Grid item xs={6} md={3}>
            <Card variant="outlined">
                <CardMedia
                    sx={{height: 256}}
                    image={links.patch.small !== null ? links.patch.small : defaultPlaceholderUrl}
                    title={name}
                    className={ styles.launchCardImg }
                />
                <CardContent>
                    <Typography>Mission name: {name}</Typography>
                    <Typography>Launch date: {new Date(date_local).toDateString()}</Typography>
                    <Typography>
                        Launch status: <span
                        style={success ? {color: 'green'} : {color: 'red'}}>{success ? 'Success' : 'Fail'}</span>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        color="info"
                        variant="contained"
                        className={ styles.buttonInfo }
                        component={ Link }
                        to={`/launch/${flight_number}`}>
                        Launch details
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default LaunchCard;