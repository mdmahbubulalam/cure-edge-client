import { Grid } from '@mui/material';
import React from 'react';

const Department = (props) => {
    const [name,description ]=props.department;
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={6} lg={6}>
        <h2>{name}</h2>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6}>
<p>{description}</p>
            </Grid>
        </Grid>
    );
};

export default Department;