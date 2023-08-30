import {
  Box,
  Button,
  Container,
  createTheme,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import formImg from "../../../assets/form-img.png";
import { useForm } from "react-hook-form";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Alert from "@mui/material/Alert";

const AppointmentForm = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [chooseService, setChooseService] = useState("");
  const [chooseHospital, setChooseHospital] = useState("");
  const [singleUser, setSingleUser] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const date = new Date();
  let localDate = date.toLocaleString();
  const [dateTimeValue, setDateTimeValue] = useState(localDate); 

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let { user } = useAuth();

  const handleChooseService = (event) => {
    setChooseService(event.target.value);
  };
  const handleChooseHospital = (event) => {
    setChooseHospital(event.target.value);
  };

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

  useEffect(()=>{
    fetch(`https://cure-edge-server.onrender.com/singleUser/${user.email}`,{
      method:'GET',
      headers:{
        'content-type' : 'application/json',
        //'authorization' : `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    .then( (res) => res.json())
    .then( data => {
      setSingleUser(data);
    })
  },[])

  useEffect(() => {
    axios
      .get("https://cure-edge-server.onrender.com/hospitals")
      .then(function (res) {
        if (res.data) {
          setHospitals(res.data);
        }
      });
  }, []);

  const onSubmit = (data) => {
    const formData = {
      patientName: data.patientName,
      email: data.email,
      phone: data.phone,
      age: data.age,
      gender: data.gender,
      service: data.chooseService,
      hospital: data.chooseHospital,
      symptoms: data.symptoms,
      address: data.address,
      dateTime: dateTimeValue,
      serviceCharge: data.serviceCharge,
      status: "Pending",
    };

    axios
      .post(
        "https://cure-edge-server.onrender.com/addAppoinment",
        formData
      )
      .then(function (res) {
        if (res.data.insertedId) {
          setSuccessMessage("Appoinment booked successfully");
          reset();
          setDateTimeValue(new Date());
          setChooseService("");
          setChooseHospital("");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage("");
    }, 10000);
  });

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
      id="appoinment"
      style={{
        backgroundColor: "#EFEFEF",
        margin: "0px",
        padding: "60px 0 0 0",
        color: "#000",
      }}
    >
      <Typography
        variant="h3"
        textAlign="center"
        component="div"
        marginBottom="50px"
        textTransform="uppercase"
        fontWeight="700"
      >
        Appointment Form
      </Typography>
      <Container>
        <Box sx={{ width: "100%" }}>
          {user?.email ? (
            <Grid container spacing={{ xs: 2, md: 2 }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
                className="alignCenter"
              >
                <img src={formImg} alt="formImg" style={{ width: "100%" }} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                {successMessage && (
                  <Typography
                    variant="p"
                    component="div"
                    sx={{ m: 1, color: "green" }}
                  >
                    <Alert severity="success">{successMessage}</Alert>
                  </Typography>
                )}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{
                    backgroundColor: "#F2FBFF",
                    padding: "25px",
                    borderRadius: "10px",
                  }}
                >
                  <FormControl
                    variant="standard"
                    sx={{ mt: 2, minWidth: "100%" }}
                  >
                    <TextField
                      value={user?.displayName || singleUser?.displayName}
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
                      label="Patient Name"
                      variant="outlined"
                    />
                    {errors.patientName && (
                      <small style={{ color: "red" }}>
                        {errors.patientName.message}
                      </small>
                    )}
                  </FormControl>
                  <FormControl
                    variant="standard"
                    sx={{ mt: 2, minWidth: "100%" }}
                  >
                    <TextField
                      value={user && user.email}
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
                      variant="outlined"
                    />
                    {errors.email && (
                      <small style={{ color: "red" }}>
                        {errors.email.message}
                      </small>
                    )}
                  </FormControl>

                  <FormControl
                    variant="standard"
                    sx={{ mt: 2, minWidth: "100%" }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      {...register("phone", {
                        required: "Phone is Required",
                        pattern: {
                          value:
                            /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                          message: "Invalid phone no",
                        },
                      })}
                      id="standard-basic"
                      label="Phone"
                      variant="outlined"
                    />
                    {errors.phone && (
                      <small style={{ color: "red" }}>
                        {errors.phone.message}
                      </small>
                    )}
                  </FormControl>

                  <FormControl
                    variant="standard"
                    sx={{ mt: 2, minWidth: "100%" }}
                  >
                    <TextField
                      type="number"
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                      {...register("age", {
                        required: "Age is Required",
                        min: {
                          value: 1,
                          message: "Minimum Required length is 1",
                        },
                        max: {
                          value: 120,
                          message: "Maximum allowed length is 120",
                        },
                        pattern: {
                          value: /^[0-9]*$/,
                          message: "Only numbers are allowed",
                        },
                      })}
                      id="standard-basic"
                      label="Age"
                      variant="outlined"
                    />

                    {errors.age && (
                      <small style={{ color: "red" }}>
                        {errors.age.message}
                      </small>
                    )}
                  </FormControl>

                  <FormControl
                    variant="standard"
                    sx={{ mt: 2, minWidth: "100%" }}
                  >
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <FormLabel
                        sx={{
                          fontWeight: "500",
                          fontSize: "20px",
                          color: "#000",
                        }}
                      >
                        Gender :{" "}
                      </FormLabel>
                      <input
                        type="radio"
                        value="male"
                        {...register("gender", {
                          required: "Gender is Required",
                        })}
                        style={{ marginRight: "5px" }}
                      />
                      <Typography sx={{ mr: 1 }} variant="span">
                        Male
                      </Typography>

                      <input
                        type="radio"
                        value="female"
                        {...register("gender", {
                          required: "Gender is Required",
                        })}
                        style={{ marginRight: "5px" }}
                      />
                      <Typography variant="span">Female</Typography>
                    </RadioGroup>
                    {errors.gender && (
                      <small style={{ color: "red" }}>
                        {errors.gender.message}
                      </small>
                    )}
                  </FormControl>

                  <FormControl sx={{ mt: 2, minWidth: "100%" }}>
                    <InputLabel>Choose Service</InputLabel>

                    <Select
                      value={chooseService}
                      {...register("chooseService", { required: true })}
                      onChange={handleChooseService}
                      label="Specialization"
                    >
                      {services.map((service) => (
                        <MenuItem value={service.serviceName}>
                          {service.serviceName}
                        </MenuItem>
                      ))}
                    </Select>

                    {errors.chooseService && (
                      <small style={{ color: "red" }}>
                        Please choose a service
                      </small>
                    )}
                  </FormControl>

                  {services.map(
                    (service) =>
                      service.serviceName === chooseService && (
                        <FormControl sx={{ display: "none" }}>
                          <TextField
                            type="text"
                            {...register("serviceCharge")}
                            value={service.serviceCharge}
                          />
                        </FormControl>
                      )
                  )}

                  <FormControl sx={{ mt: 2, minWidth: "100%" }}>
                    <InputLabel>Choose Hospital</InputLabel>
                    <Select
                      value={chooseHospital}
                      {...register("chooseHospital", { required: true })}
                      onChange={handleChooseHospital}
                      label="Choose Hospital"
                    >
                      {hospitals.map((hospital) => (
                        <MenuItem value={hospital.hospitalName}>
                          {hospital.hospitalName}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.chooseHospital && (
                      <small style={{ color: "red" }}>
                        Please choose a hospital
                      </small>
                    )}
                  </FormControl>
                  <FormControl
                    variant="standard"
                    sx={{ mt: 2, minWidth: "100%" }}
                  >
                    <TextField
                      type="text"
                      {...register("symptoms", {
                        required: "Symptoms filed is Required",
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
                      label="Write your symptoms..."
                      variant="outlined"
                      multiline
                      rows={2}
                    />
                    {errors.symptoms && (
                      <small style={{ color: "red" }}>
                        {errors.symptoms.message}
                      </small>
                    )}
                  </FormControl>
                  <FormControl
                    variant="standard"
                    sx={{ mt: 2, minWidth: "100%" }}
                  >
                    <TextField
                      type="text"
                      {...register("address", {
                        required: "Address is Required",
                      })}
                      id="standard-basic"
                      label="Write your address..."
                      variant="outlined"
                      multiline
                      rows={2}
                    />
                    {errors.address && (
                      <small style={{ color: "red" }}>
                        {errors.address.message}
                      </small>
                    )}
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: "100%" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        disablePast
                        required
                        value={dateTimeValue}
                        label="Choose date"
                        onChange={(newDateTimeValue) => {
                          if (newDateTimeValue) {
                            setDateTimeValue(newDateTimeValue);
                          }
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl variant="standard" sx={{ mt: 2 }}>
                    <ThemeProvider theme={theme}>
                      <Button type="submit" variant="contained" color="info">
                        Book Appoainment
                      </Button>
                    </ThemeProvider>
                  </FormControl>
                </form>
              </Grid>
            </Grid>
          ) : (
            <Typography
              variant="P"
              textAlign="center"
              component="div"
              fontWeight="700"
              paddingBottom="50px"
            >
              For appoinment, please <Link to="/signIn">Sign In</Link> first
            </Typography>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default AppointmentForm;
