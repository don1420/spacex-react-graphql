import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Pagination } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { LAUNCHES_QUERY } from '../../queries';
import Loader from "../loader";
import LaunchCard from "../launch-card";

const useStyles = makeStyles(() => ({
    mainPagination: {
        marginTop: '40px',
        marginBottom: '80px'
    }
}));

const Launches = () => {
    const { loading, error, data } = useQuery(LAUNCHES_QUERY);
    const [pagination, setPagination] = useState({
        activePage: 1,
        itemsCountPerPage: 8,
        pageQty: 0
    });
    const styles = useStyles();

    if (loading) return <Loader/>;
    if (error) return <p>Error :(</p>;

    const idxOfLastProduct = pagination.activePage * pagination.itemsCountPerPage;
    const idxOfFirstProduct = idxOfLastProduct - pagination.itemsCountPerPage;
    const renderedItems = data.launches.slice(idxOfFirstProduct, idxOfLastProduct);

    const pageChange = (activePage) => {
        setPagination({
            ...pagination,
            activePage: activePage
        });
    }

    const pageQty = Math.ceil(data.launches.length / pagination.itemsCountPerPage);

    return (
        <Grid container spacing={2}>
            {
                renderedItems.map(({id, name, date_local, success, links, flight_number}) => (
                    <LaunchCard
                        key={id}
                        name={name}
                        date_local={date_local}
                        success={success}
                        links={links}
                        flight_number={flight_number}/>
                ))
            }
            <Pagination
                count={pageQty}
                color="primary"
                className={styles.mainPagination}
                onChange={(_, activePage) => pageChange(activePage)}/>
        </Grid>
    );
}

export default Launches;