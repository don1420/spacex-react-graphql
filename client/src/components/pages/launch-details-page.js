import React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography } from "@mui/material";
import { LAUNCH_QUERY } from '../../queries';
import Loader from "../loader";
import './launch-details-page.scss';


const LaunchDetailsPage = () => {
    const { flightNumber } = useParams();

    const { loading, error, data } = useQuery(LAUNCH_QUERY, {
        variables: {flight_number: parseInt(flightNumber)}
    });

    if (loading) return <Loader/>;
    if (error) return <p>Error :(</p>;

    const hDate = new Date(data.launch.launch_date_local).toLocaleDateString();
    const youtubeId = data.launch.links.youtube_id;

    return (
        <Container>
            <Grid container spacing={2} justifyContent="space-between">
                <Grid item xs={6} md={4}>
                    <img src={data.launch.links.mission_patch} alt={data.launch.mission_name}/>
                </Grid>
                <Grid item xs={6} md={6} align="left">
                    <Typography>{`Flight number: ${data.launch.flight_number}`}</Typography>
                    <Typography>{`Mission name: ${data.launch.mission_name}`}</Typography>
                    <Typography>{`Rocket name: ${data.launch.rocket.rocket_name}`}</Typography>
                    <Typography>{`Rocket type: ${data.launch.rocket.rocket_type}`}</Typography>
                    <Typography>{`Launch date: ${hDate}`}</Typography>
                    <Typography style={data.launch.launch_success ? {color:'green'} : {color: 'red'}}>
                        {data.launch.launch_success ? 'Success' : 'Fail'}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <div className="iframe-wrapper">
                    <iframe title={data.launch.mission_name}
                            className="iframe-youtube-video"
                            frameBorder="0"
                            allowFullScreen=""
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            data-element="video"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </Grid>
        </Container>
    );
}

export default LaunchDetailsPage;