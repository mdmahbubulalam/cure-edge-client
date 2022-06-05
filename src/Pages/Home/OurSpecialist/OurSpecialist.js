import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import './OurSpecialist.css'

const OurSpecialist = (props) => {
    const {doctorName, description, image,facebookLink,twitterLink,linkedInLink} = props.ourSpecialist;
    return (
        <Card sx={{ textAlign: 'center', backgroundColor:'#1976D2', color:'#fff' }}>
            <CardMedia
                component="img"
                width='auto'
                image={image}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" textTransform='uppercase'  component="div" sx={{ wordWrap: "break-word" }}>
                    {doctorName}
                </Typography>
                <Typography variant="body2" sx={{ wordWrap: "break-word" }}>
                    {description}
                </Typography>
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent:'center'}}>
                <a href={facebookLink}  target='_blank'><FacebookIcon className='iconColor' fontSize='large'/></a>
                <a href={twitterLink}  target='_blank'><TwitterIcon className='iconColor' fontSize='large'/></a>
                <a href={linkedInLink}  target='_blank'><LinkedInIcon className='iconColor' fontSize='large'/></a>
            </CardActions>
        </Card>
    );
};

export default OurSpecialist;