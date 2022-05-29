import React from "react";
import Box from "@mui/material/Box";
import { Grid, Container, Card, CardMedia } from "@mui/material";
import Typography from "@mui/material/Typography";
import g1 from "../../../assets/g1.jpg";
import g2 from "../../../assets/g2.jpg";
import g3 from "../../../assets/g3.jpg";
import g4 from "../../../assets/g4.jpg";
import g5 from "../../../assets/g5.jpg";
import g6 from "../../../assets/g6.jpg";
import g7 from "../../../assets/g7.jpg";
import g8 from "../../../assets/g8.jpg";

import "./Gallery.css";
import { ImageViewer } from "react-image-viewer-dv";
import { Masonry } from "@mui/lab";
import { Label } from "@mui/icons-material";

const Gallery = () => {
  // const Label = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(0.5),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  //   borderBottomLeftRadius: 0,
  //   borderBottomRightRadius: 0,
  // }));
  const photos = [
    {
      src: g1,
    },
    {
      src: g2,
    },
    {
      src: g3,
    },
    {
      src: g4,
    },
    {
      src: g5,
    },
    {
      src: g6,
    },
    {
      src: g7,
    },
    {
      src: g8,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1, padding: "60px 0 60px 0" }} id='gallery'>
      <Container>
        <Typography
          variant="h3"
          textAlign="center"
          component="div"
          marginBottom="50px"
          textTransform="uppercase"
          fontWeight="700"
        >
          Our Laboratories
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {photos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{padding:'5px'}}>
                <ImageViewer>
                  <CardMedia
                    component="img"
                    style={{ width: "100%", height:'auto' }}
                    image={photo.src}
                    alt="green iguana"
                  />
                </ImageViewer>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Gallery;
