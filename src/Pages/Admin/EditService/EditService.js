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
  
  const EditService = (props) => {
    const serviceId = props.serviceId;
    const [serviceName, setServiceName] = useState('');
    const [serviceCharge, setServiceCharge] = useState('');
    const [serviceDescription, setServiceDescription] = useState("");
    const [imgUrl, setImgUrl] = useState("");
  
    const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
    const handleSuccessAlertClose = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSuccessAlertOpen(false);
    };
  
    useEffect(() => {
      const url = `http://localhost:5000/services/${serviceId}`;
      axios.get(url).then((res) => {
        if (res.data) {
          setServiceName(res.data.serviceName);
          setServiceCharge(res.data.serviceCharge);
          setServiceDescription(res.data.serviceDescription);
          setImgUrl(res.data.image);
        }
      });
    }, [serviceId]);
  
    const {
      register,
      handleSubmit,
      control,
      formState: { errors },
      reset,
    } = useForm();
  
    const onSubmit = () => {
      const formData = {
        serviceName,
        serviceCharge,
        serviceDescription,
        image: imgUrl,
      };
      
      const url = `http://localhost:5000/services/${serviceId}`;
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
            setSuccessAlertOpen(true);
          }
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
            Service info updated successfully
          </Alert>
        </Snackbar>
  
        <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "0 auto" }}>
          <FormControl variant="standard" sx={{ minWidth: "100%" }}>
            <TextField
              type="text"
              {...register("serviceName")}
              id="standard-basic"
              label="Service Name"
              variant="standard"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
            />
          </FormControl>

          <FormControl variant="standard" sx={{ minWidth: "100%" }}>
            <TextField
              type="number"
              {...register("serviceCharge")}
              id="standard-basic"
              label="Service Charge"
              variant="standard"
              value={serviceCharge}
              onChange={(e) => setServiceCharge(e.target.value)}
            />
          </FormControl>
  
          <FormControl variant="standard" sx={{ mt: 1, minWidth: "100%" }}>
            <TextField
              type="text"
              {...register("serviceDescription")}
              id="standard-basic"
              label="Write a description..."
              variant="standard"
              multiline
              rows={3}
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
          </FormControl>
          <FormControl variant="standard" sx={{ mt: 1, minWidth: "100%" }}>
            <img src={imgUrl} alt="" style={{ width: "100px" }} />
            <label htmlFor="icon-button-file">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                {...register("image")}
                onChange={handleImageUpload}
              />
            </label>
          </FormControl>
          <br />
          <FormControl variant="standard" sx={{ mt: 2 }}>
            <ThemeProvider theme={theme}>
              <Button type="submit" variant="contained" color="info">
                Edit service Info
              </Button>
            </ThemeProvider>
          </FormControl>
        </form>
      </>
    );
  };
  
  export default EditService;
  