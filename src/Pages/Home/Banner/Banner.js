import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button, Container, createTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import doctorBanner from '../../../assets/doctor-banner.png'

import { display, textAlign, ThemeProvider } from '@mui/system';
import './Banner.css';
import { Link } from 'react-scroll/modules';

const Banner = () => {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#1CC7D0',
            darker: '#2899C4',
            contrastText: '#fff',
          },
          info: {
            main: '#0077C8',
            darker: '#2899C4',
            contrastText: '#fff',
          },
        },
      });
    return (
        <Container id='banner'>
            <Box sx={{ width: '100%', margin:'0px', padding:'20px 0px 0px 0px'}}>
            <Grid container   >
                <Grid item xs={12} sm={12} md={6} className='alignCenter'>
                    <img src={doctorBanner} width='90%' alt="doctorBanner"/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} sx={{display:'flex', justifyContent:'center', alignItems:'center', textAlign:'justify'}}>
                    <div className='alignCenter'>
                        <Typography variant="h5" textTransform='uppercase' fontWeight='600' color='#0077C8' component="div">
                           <span style={{fontSize:'40px', color:'#1CC7D0'}}>MAKING</span>  <br /> YOUR LIFE EASY AND <span style={{color:'#1CC7D0'}}>HAPPY</span> 
                        </Typography>
                        <Typography variant="subtitle2">
                            Lorem Ipsum is simply dummy text of the typesetting industry Lorem Ipsum is simply dummy text of the typesetting industry
                        </Typography><br />
                        <ThemeProvider theme={theme}>
                            <Link to='about' spy={true} smooth={true} offset={-100} duration={500}><Button variant="contained" color="primary" sx={{margin:'0 10px 0 0'}}>Learn More</Button></Link>
                            <Link to='departments' spy={true} smooth={true} offset={-100} duration={500}><Button variant="contained" color="info">Portfolio</Button></Link> 
                        </ThemeProvider>  
                    </div>
                </Grid>
            </Grid>
            </Box>
        </Container>
    );
};

export default Banner;