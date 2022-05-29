import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from "@mui/material";
import quoteImg from "../../../assets/quote-img.png";
import { height, padding } from "@mui/system";

const Testimonial = (props) => {
  const { name, review, image, status } = props.testimonial;
  return (
    <Card
      sx={{
        textAlign: "center",
        border: 0,
        boxShadow: "none",
        margin: "0 20px 0 0px",
        padding: "20px",
      }}
    >
      <CardMedia
        component="img"
        image={quoteImg}
        alt="img"
        style={{ maxWidth: "40px", height: "40px", margin: "0 auto" }}
      />
      <CardContent>
        <Typography variant="body2" sx={{ textAlign: "justify" }}>
          {review}
        </Typography>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CardMedia
          component="img"
          image={image}
          alt="img"
          style={{
            maxWidth: "70px",
            height: "70px",
            boxShadow: "box-shadow: 5px 10px #888888;",
            borderRadius: "50%",
          }}
        />
        <Typography
          gutterBottom
          variant="p"
          textTransform="uppercase"
          padding="10px"
          fontWeight="600"
          component="div"
        >
          {name}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default Testimonial;
