import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import './Service.css'

const Service = (props) => {
    console.log(props)
    const {serviceName, serviceDescription, image} = props.service;
    return (
        <div>
            
            <Card sx={{ minWidth: 275, textAlign:'center', border:0, boxShadow:0, color:'#ffffff', p:3, backgroundColor:'#1CC7D0'}}>
                <CardMedia
                    component="img"
                    style={{width:'auto', height:'100px', margin:'0 auto'}}
                    image={image}
                    alt="green iguana"
                 />
                <CardContent>
                    <Typography variant="h5" textTransform='uppercase' fontWeight='600' component="div">
                        {serviceName}
                    </Typography>
                    <Typography variant="p">
                        {serviceDescription}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default Service;