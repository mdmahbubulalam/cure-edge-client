import {
  Box,
  Button,
  Checkbox,
  Container,
  createTheme,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.gif";
import GoogleIcon from "@mui/icons-material/Google";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../Shared/Loading/Loading";
import Alert from '@mui/material/Alert';

const SignIn = () => {
  const [newUser, setNewUser] = useState(false);
  let location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState();
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const {
    user,
    registerUser,
    loginUser,
    googleLogin,
    successText,
    authError,
    isLoading,
  } = useAuth();


  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const handleGoogleSignIn = (e) => {
    e.preventDefault();
    googleLogin(location, navigate);
  };

  const onSubmit = (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    console.log(user.email);

    if (newUser) {
      registerUser(formData.email, formData.password, formData.name);
      setError("");
      setValue("");
      reset();
    }
    if (!newUser) {
      loginUser(formData.email, formData.password, location, navigate);
        setError("");
        setValue("");
      
    }
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

  useEffect(() => {
    setTimeout(() => {
      setValue();
    }, 1000);
  });

  
  return (
    
    <div
    >
      {isLoading ? (
      <Loading />
    ) : (
      <Container>
        <Box  display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh">
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              textAlign="center"
              className="responsive-image"
            >
              <Link to="/">
                <img src={logo} alt="logo" style={{ width: "150px" }} />
              </Link>
            </Grid>
          
            <Grid
              item
              xs={10}
              sm={6}
              md={6}
              lg={5}
              style={{ margin: "0 auto" }}
            >
             
                <div
                  style={{
                    border: "1px solid gray",
                    borderRadius: "5px",
                    padding: "25px",
                    backgroundColor: "#F2FBFF",
                  }}
                >
                  {authError && <Alert severity="error">{authError}</Alert>}

                  {successText && (
                    <Alert severity="success" >{successText}</Alert>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl ariant="standard">
                      <FormControlLabel
                        control={<Checkbox />}
                        label={
                          newUser
                            ? "Back to Sign In"
                            : "For Sign Up, click the tik mark"
                        }
                        onChange={() => setNewUser(!newUser)}
                      />
                    </FormControl>
                    {newUser && (
                      <FormControl
                        variant="standard"
                        sx={{ mt: 1, minWidth: "100%" }}
                      >
                        <TextField
                          value={value}
                          type="text"
                          {...register("name", {
                            required: "Name is Required",
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
                          label="Name"
                          variant="outlined"
                        />
                        {errors.name && (
                          <small style={{ color: "red" }}>
                            {errors.name.message}
                          </small>
                        )}
                      </FormControl>
                    )}

                    <FormControl
                      variant="standard"
                      sx={{ mt: 1, minWidth: "100%" }}
                    >
                      <TextField
                        value={value}
                        type="email"
                        {...register("email", {
                          required: "Email is Required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
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
                      sx={{ mt: 1, minWidth: "100%" }}
                    >
                      <TextField
                        value={value}
                        type="password"
                        {...register("password", {
                          required: "Password is Required",
                          minLength: {
                            value: 6,
                            message: "Minimum Required length is 6",
                          },
                          maxLength: {
                            value: 20,
                            message: "Maximum allowed length is 20",
                          },
                        })}
                        label="password"
                        variant="outlined"
                      />
                      {errors.password && (
                        <small style={{ color: "red" }}>
                          {errors.password.message}
                        </small>
                      )}
                    </FormControl>
                    <FormControl
                      variant="standard"
                      sx={{ mt: 1, width: "100%" }}
                    >
                      <ThemeProvider theme={theme}>
                        <Button type="submit" variant="contained" color="info">
                          {newUser ? "Sign Up" : "Sign In"}
                        </Button>
                      </ThemeProvider>
                    </FormControl>
                  </form>

                  <hr />
                  <FormControl variant="standard" sx={{ width: "100%" }}>
                    <ThemeProvider theme={theme}>
                      <Button
                        type="button"
                        variant="contained"
                        color="info"
                        onClick={handleGoogleSignIn}
                      >
                        Sign In with google
                      </Button>
                    </ThemeProvider>
                  </FormControl>
                </div>
             
            </Grid>
          </Grid>
        </Box>
      </Container>
      )}
    </div>
    
  );
};

export default SignIn;
