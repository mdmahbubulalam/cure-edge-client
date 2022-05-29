import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Container,
  createTheme,
  FormControl,
  Grid,
  Input,
  TextField,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import aboutImg from "../../../assets/about-img.jpg";
import { display, textAlign, ThemeProvider } from "@mui/system";
import { styled } from "@mui/material/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useForm } from "react-hook-form";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Contact = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = {
      name: data.patientName,
      email: data.email,
      review: data.review,
      status:'Unpublished',
      image: imgUrl
    };
    
    axios
      .post("http://localhost:5000/addReview", formData)
      .then(function (res) {
        if (res.data.insertedId) {
          setSuccessMessage("Thanks for the review.");
          setImgUrl("");
          reset();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleImageUpload = (e) => {
    const imageData = new FormData();
    imageData.set("key", "606693f2875564d94b8395fd730fb31f");
    imageData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImgUrl(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage('')
    }, 5000)
})

  const theme = createTheme({
    palette: {
      primary: {
        main: "#1CC7D0",
        darker: "#2899C4",
        contrastText: "#fff",
      },
      info: {
        main: "#0077C8",
        darker: "#2899C4",
        contrastText: "#fff",
      },
    },
  });
  return (
    <div
      style={{
        backgroundColor: "#000",
        margin: "0px",
        color: "#fff",
        padding: "60px 0 60px 0",
      }}
      id="contact"
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
          Contact Us
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography
                variant="h5"
                component="div"
                marginBottom="20px"
                fontWeight="700"
                sx={{ mx: 1.5 }}
              >
                Address
              </Typography>
              <Typography variant="p">
                <Typography variant="span" sx={{ display: "flex" }}>
                  <LocationOnIcon sx={{ mx: 1 }} /> Chandpur, Chittagong, <br />{" "}
                  Bangladesh <br />
                </Typography>
                <br />
                <Typography variant="span" sx={{ display: "flex" }}>
                  <EmailIcon sx={{ mx: 1 }} /> alam.diu13@gmail.com
                </Typography>
                <br />
                <Typography variant="span" sx={{ display: "flex" }}>
                  <PhoneIcon sx={{ mx: 1 }} /> 01836-883501
                </Typography>
                <br />
                <Typography variant="span" sx={{ display: "flex", mx: 1 }}>
                  <a href="https://www.facebook.com/" target="_blank">
                    <FacebookIcon className="iconColor" fontSize="large" />
                  </a>
                  <a href="https://twitter.com/" target="_blank">
                    <TwitterIcon className="iconColor" fontSize="large" />
                  </a>
                  <a href="https://www.linkedin.com/" target="_blank">
                    <LinkedInIcon className="iconColor" fontSize="large" />
                  </a>
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4} className="alignCenter">
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d469240.8857689589!2d90.50513034035717!3d23.245109511135468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3754f70d17000a7b%3A0xb088cd1c3df72010!2sChandpur%20District!5e0!3m2!1sen!2sbd!4v1653306916882!5m2!1sen!2sbd"
                width="300"
                height="320"
              ></iframe>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Typography
                variant="h5"
                component="div"
                marginBottom="20px"
                fontWeight="700"
                sx={{ mb: 1, mr:1, ml:1}}
              >
                Write a review
              </Typography>
              {successMessage && (
              <Typography
                variant="p"
                component="div"
                sx={{ m: 1, color: "green" }}
              >
                {successMessage}
              </Typography>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                  <TextField
                    type="text"
                    {...register("patientName", {
                      required: "Patient Name is Required",
                      minLength: {
                        value: 3,
                        message: "Minimum Required length is 3",
                      },
                      maxLength: {
                        value: 40,
                        message: "Maximum allowed length is 40",
                      },
                      pattern: {
                        value: /^[a-zA-Z\s\n]{1,150}$/,
                        message: "Only texts are allowed",
                      },
                    })}
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    InputProps={{
                      style: { color: "white" },
                      disableUnderline: true,
                    }}
                    InputLabelProps={{ style: { color: "gray" } }}
                    sx={{
                      "& .MuiInputLabel-root": { color: "green" },
                      borderBottom: "1px solid white",
                    }}
                  />
                  {errors.patientName && (
                    <small style={{ color: "red" }}>
                      {errors.patientName.message}
                    </small>
                  )}
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                  <TextField
                    type="email"
                    {...register("email", {
                      required: "Email is Required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    InputProps={{
                      style: { color: "white" },
                      disableUnderline: true,
                    }}
                    InputLabelProps={{ style: { color: "gray" } }}
                    sx={{
                      "& .MuiInputLabel-root": { color: "green" },
                      borderBottom: "1px solid white",
                    }}
                  />
                  {errors.email && (
                    <small style={{ color: "red" }}>
                      {errors.email.message}
                    </small>
                  )}
                </FormControl>

                <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                  <TextField
                    type="text"
                    {...register("review", {
                      required: "Review is Required",
                    })}
                    id="standard-basic"
                    label="Write your review..."
                    variant="standard"
                    InputProps={{
                      style: { color: "white" },
                      disableUnderline: true,
                    }}
                    InputLabelProps={{ style: { color: "gray" } }}
                    sx={{
                      "& .MuiInputLabel-root": { color: "green" },
                      borderBottom: "1px solid white",
                    }}
                    multiline
                    rows={3}
                  />

                  {errors.review && (
                    <small style={{ color: "red" }}>
                      {errors.review.message}
                    </small>
                  )}
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                  {imgUrl && (
                    <img src={imgUrl} alt="" style={{ width: "100px" }} />
                  )}
                  <label htmlFor="icon-button-file">
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      {...register("image", {
                        required: "Image is Required",
                      })}
                      onChange={handleImageUpload}
                    />
                  </label>
                  {errors.image && (
                    <small style={{ color: "red" }}>
                      {errors.image.message}
                    </small>
                  )}
                </FormControl>
                <br />
                <FormControl variant="standard" sx={{ m: 1 }}>
                  <ThemeProvider theme={theme}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="info"
                      endIcon={<SendIcon />}
                    >
                      Send
                    </Button>
                  </ThemeProvider>
                </FormControl>
              </form>
            </Grid>
          </Grid>
        </Box>
        <Typography
          variant="p"
          component="div"
          sx={{ textAlign: "center", pt: 5 }}
        >
          © {new Date().getFullYear()} Cure Edge. All Rights Reserved |
          Developed by{" "}
          <a
            href="https://github.com/mdmahbubulalam"
            target="_blank"
            className="iconColor"
          >
            Mohammad Mahbubul Alam
          </a>
        </Typography>
      </Container>
    </div>
  );
};

export default Contact;
