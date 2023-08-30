import React, { useState } from "react";
import {
  Box,
  Button,
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
import axios from "axios";

const drawerWidth = 240;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const AddHospital = () => {
  const headerName = "Add Hospital";
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


  const onSubmit = (data) => {
    const formData = {
      hospitalName: data.hospitalName,
    };
    axios
      .post("https://cure-edge-server.onrender.com/addHospital", formData)
      .then(function (res) {
        if (res.data.insertedId) {
          setOpen(true);
          reset();
        }
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
                Hospital added successfully
              </Alert>
            </Snackbar>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ margin: "0 auto" }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
                <TextField
                  type="text"
                  {...register("hospitalName", {
                    required: "Hospital Name is Required",
                    minLength: {
                      value: 3,
                      message: "Minimum Required length is 3",
                    },
                    maxLength: {
                      value: 100,
                      message: "Maximum allowed length is 100",
                    },
                  })}
                  id="standard-basic"
                  label="Hospital Name"
                  variant="standard"
                />
                {errors.hospitalName && (
                  <small style={{ color: "red" }}>
                    {errors.hospitalName.message}
                  </small>
                )}
              </FormControl>
              
              <FormControl variant="standard" sx={{ m: 1 }}>
                <ThemeProvider theme={theme}>
                  <Button type="submit" variant="contained" color="info">
                    Add Hospital
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

export default AddHospital;
