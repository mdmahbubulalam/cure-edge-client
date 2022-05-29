import React from 'react';
import Box from '@mui/material/Box';
import { Button, Container, createTheme, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import aboutImg from '../../../assets/about-img.jpg'
import { display, textAlign, ThemeProvider } from '@mui/system';

const About = () => {
    return (
        <div style={{backgroundColor:'#EFEFEF', marginTop:'0px', padding:'60px 0 60px 0'}} id='about'>
            <Typography variant="h3" textAlign='center' component="div" marginBottom="50px" textTransform='uppercase' fontWeight='700'>
                About Us    
            </Typography>
            <Container>
                <Box sx={{ width: '100%'}}>
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        <Grid item xs={12} sm={12} md={6} lg={6} className='alignCenter'>
                            <img src={aboutImg} alt="aboutImg" style={{width:'100%',}}/>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6} sx={{textAlign:'justify'}}>
                            <div className='alignCenter'>
                                <Typography variant="h6" textTransform='uppercase' fontWeight='600' lineHeight= '35px' component="div">
                                    The foundation of success in life is good health: that is the substratum fortune; it is also the basis of happiness
                                </Typography>
                                <Typography variant="subtitle2" lineHeight= '25px'>
                                    Cure Edge is one of the nation’s most comprehensive, integrated academic health care delivery systems, dedicated to providing the highest quality. Our organizational priorities are aimed at ensuring that our patient focus permeates the entire organization, in every department at every location.
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </div>
        
    );
};

export default About;