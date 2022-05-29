import React from 'react';
import Navigation from '../../../Shared/Navigation/Navigation';
import About from '../About/About';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import Departments from '../Departments/Departments';
import Gallery from '../Gallery/Gallery';
import Header from '../Header/Header';
import OurSpecialists from '../OurSpecialists/OurSpecialists';
import Services from '../Services/Services';
import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
    return (
        <div>
            <Navigation/>
            <Header/>
            <Banner/>
            <About/>
            <OurSpecialists/>
            <Services/>
            <Testimonials/>
            <Departments/>
            <AppointmentForm/>
            <Gallery/>
            <Contact/>
        </div>
    );
};

export default Home;