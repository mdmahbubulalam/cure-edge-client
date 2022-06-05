import {
  Button,
  createTheme,
  FormControl,
  TextField,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditHospital = (props) => {
  const hospitalId = props.hospitalId;
  const [hospitalName, setHospitalName] = useState("");

  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
  const handleSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertOpen(false);
  };

  useEffect(() => {
    const url = `https://tranquil-bastion-41948.herokuapp.com/hospitals/${hospitalId}`;
    axios.get(url).then((res) => {
      if (res.data) {
        setHospitalName(res.data.hospitalName);
      }
    });
  }, [hospitalId]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = () => {
    const formData = {
      hospitalName,
    };

    const url = `https://tranquil-bastion-41948.herokuapp.com/hospitals/${hospitalId}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          window.location.reload(false)
          setSuccessAlertOpen(true);
        }
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
    <>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={6000}
        onClose={handleSuccessAlertClose}
      >
        <Alert
          onClose={handleSuccessAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Hospital info updated successfully
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "0 auto" }}>
        <FormControl variant="standard" sx={{ minWidth: "100%" }}>
          <TextField
            type="text"
            {...register("hospitalName")}
            id="standard-basic"
            label="Hospital Name"
            variant="standard"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
          />
        </FormControl>
        <FormControl variant="standard" sx={{ mt: 2 }}>
          <ThemeProvider theme={theme}>
            <Button
              type="submit"
              variant="contained"
              color="info"
            >
              Edit Hospital Info
            </Button>
          </ThemeProvider>
        </FormControl>
      </form>
    </>
  );
};

export default EditHospital;
