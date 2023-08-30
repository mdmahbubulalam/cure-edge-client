import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Container, Grid, Typography } from "@mui/material";
import Testimonial from "../Testimonial/Testimonial";
import Slider from "react-slick/lib/slider";
import CircularProgress from "@mui/material/CircularProgress";

const Testimonials = () => {
  const [allReviews, setAllReviews] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  useEffect(() => {
    fetch("https://cure-edge-server.onrender.com/reviews", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => (new Date(a) < new Date(b) ? 1 : -1));
        setAllReviews(data);
      });
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: "80px 50px 80px 50px",
        backgroundColor: "#F4BB44",
        display: "flex",
        justifyContent: "center",
      }}
      id="testimonials"
    >
      <Container>
        <Typography
          variant="h3"
          textAlign="center"
          component="div"
          color="#fff"
          marginBottom="50px"
          textTransform="uppercase"
          fontWeight="700"
        >
          Testimonials
        </Typography>
        {allReviews.length ? (
          <Slider {...settings}>
            {allReviews.map(
              (testimonial, index) =>
                testimonial.status === "Published" && (
                  <Testimonial key={index} testimonial={testimonial} />
                )
            )}
          </Slider>
        ) : (
          <Grid item md={12} sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Testimonials;
