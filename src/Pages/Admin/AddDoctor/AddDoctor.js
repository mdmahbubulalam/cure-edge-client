import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Container,
  createTheme,
  FormControl,
  Grid,
  styled,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import NavigationDrawer from "../NavigationDrawer/NavigationDrawer";
import { useForm } from "react-hook-form";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const drawerWidth = 240;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const AddDoctor = () => {
  const headerName = "Add Doctor";
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [imgUrl, setImgUrl] = useState("");


  const onSubmit = (data) => {
    const formData = {
      doctorName: data.doctorName,
      facebookLink: data.facebookLink,
      twitterLink: data.twitterLink,
      linkedInLink: data.linkedInLink,
      description: data.description,
      image: imgUrl,
    };
    console.log(formData);
    axios
      .post("http://localhost:5000/addDoctor", formData)
      .then(function (res) {
        if (res.data.insertedId) {
          setOpen(true);
          setImgUrl('')
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
        console.log(response.data.image.filename);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
    <Box sx={{ display: "flex" }}>
      <NavigationDrawer headerName={headerName}></NavigationDrawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Doctor added successfully
              </Alert>
            </Snackbar>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ margin: "0 auto" }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  type="text"
                  {...register("doctorName", {
                    required: "Doctor Name is Required",
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
                />
                {errors.doctorName && (
                  <small style={{ color: "red" }}>
                    {errors.doctorName.message}
                  </small>
                )}
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  type="text"
                  {...register("facebookLink", {
                    required: "Facebook Link is Required",
                  })}
                  id="standard-basic"
                  label="Facebook Link"
                  variant="standard"
                />
                {errors.facebookLink && (
                  <small style={{ color: "red" }}>
                    {errors.facebookLink.message}
                  </small>
                )}
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  type="text"
                  {...register("twitterLink", {
                    required: "Twitter Link is Required",
                  })}
                  id="standard-basic"
                  label="Twitter Link"
                  variant="standard"
                />
                {errors.twitterLink && (
                  <small style={{ color: "red" }}>
                    {errors.twitterLink.message}
                  </small>
                )}
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  type="text"
                  {...register("linkedInLink", {
                    required: "LinkedIn Link is Required",
                  })}
                  id="standard-basic"
                  label="LinkedIn Link"
                  variant="standard"
                />
                {errors.linkedInLink && (
                  <small style={{ color: "red" }}>
                    {errors.linkedInLink.message}
                  </small>
                )}
              </FormControl>

              <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  type="text"
                  {...register("description", {
                    required: "Description is Required",
                  })}
                  id="standard-basic"
                  label="Write a description..."
                  variant="standard"
                  multiline
                  rows={3}
                />

                {errors.description && (
                  <p style={{ color: "red" }}>
                    {errors.description.message}
                  </p>
                )}
              </FormControl>
              <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
              {imgUrl && <img src={imgUrl} alt="" style={{width:'100px'}}/>}
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
                  <Button type="submit" variant="contained" color="info">
                    Add Doctor
                  </Button>
                </ThemeProvider>
              </FormControl>
            </form>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AddDoctor;
