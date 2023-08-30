import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import OurSpecialist from "../OurSpecialist/OurSpecialist";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const OurSpecialists = () => {
  const [ourSpecialists, setOurSpecialists] = useState([]);
  axios
    .get("https://cure-edge-server.onrender.com/doctors")
    .then(function (res) {
      if (res.data) {
        setOurSpecialists(res.data);
      }
    });

  return (
    <Box sx={{ flexGrow: 1, padding: "60px 0 60px 0" }}>
      <Container>
        <Typography
          variant="h3"
          textAlign="center"
          component="div"
          marginBottom="50px"
          textTransform="uppercase"
          fontWeight="700"
        >
          Our Specialists
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {ourSpecialists.length ? (
            ourSpecialists.map((ourSpecialist, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <OurSpecialist ourSpecialist={ourSpecialist} />
              </Grid>
            ))
          ) : (
            <Grid item md={12} sx={{ textAlign: "center" }}>
              <CircularProgress />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default OurSpecialists;
