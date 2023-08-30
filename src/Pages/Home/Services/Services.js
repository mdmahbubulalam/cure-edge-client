import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import Service from "../Service/Service";
import Typography from "@mui/material/Typography";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("https://cure-edge-server.onrender.com/services")
      .then(function (res) {
        if (res.data) {
          setServices(res.data);
        }
      });
  }, []);

  return (
    <Box
      sx={{ flexGrow: 1, backgroundColor: "#EFEFEF", padding: "60px 0 60px 0" }}
      id="services"
    >
      <Container>
        <Typography
          variant="h3"
          textAlign="center"
          component="div"
          marginBottom="50px"
          textTransform="uppercase"
          fontWeight="700"
        >
          Our Services
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {services.length ? (
            services.map((service, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                <Service service={service} />
              </Grid>
            ))
          ) : (
            <Grid item md={12} sx={{textAlign:'center'}}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
