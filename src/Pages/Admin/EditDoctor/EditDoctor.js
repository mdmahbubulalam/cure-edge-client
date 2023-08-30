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

const EditDoctor = (props) => {
  const doctorId = props.doctorId;
  const [doctorName, setDoctorName] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedInLink, setLinkedInLink] = useState("");
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
  const handleSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertOpen(false);
  };

  useEffect(() => {
    const url = `https://cure-edge-server.onrender.com/doctors/${doctorId}`;
    axios.get(url).then((res) => {
      if (res.data) {
        setDoctorName(res.data.doctorName);
        setFacebookLink(res.data.facebookLink);
        setTwitterLink(res.data.twitterLink);
        setLinkedInLink(res.data.linkedInLink);
        setDescription(res.data.description);
        setImgUrl(res.data.image);
      }
    });
  }, [doctorId]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = () => {
    const formData = {
      doctorName,
      facebookLink,
      twitterLink,
      linkedInLink,
      description,
      image: imgUrl,
    };

    const url = `https://cure-edge-server.onrender.com/doctors/${doctorId}`;
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
          Doctor's info updated successfully
        </Alert>
      </Snackbar>

      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: "0 auto" }}>
        <FormControl variant="standard" sx={{ minWidth: "100%" }}>
          <TextField
            type="text"
            {...register("doctorName")}
            name="doctorName"
            id="standard-basic"
            label="Name"
            variant="standard"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ mt: 1, minWidth: "100%" }}>
          <TextField
            type="text"
            {...register("facebookLink")}
            id="standard-basic"
            label="Facebook Link"
            variant="standard"
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ mt: 1, minWidth: "100%" }}>
          <TextField
            type="text"
            {...register("twitterLink")}
            id="standard-basic"
            label="Twitter Link"
            variant="standard"
            value={twitterLink}
            onChange={(e) => setTwitterLink(e.target.value)}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ mt: 1, minWidth: "100%" }}>
          <TextField
            type="text"
            {...register("linkedInLink")}
            id="standard-basic"
            label="LinkedIn Link"
            variant="standard"
            value={linkedInLink}
            onChange={(e) => setLinkedInLink(e.target.value)}
          />
        </FormControl>

        <FormControl variant="standard" sx={{ mt: 1, minWidth: "100%" }}>
          <TextField
            type="text"
            {...register("description")}
            id="standard-basic"
            label="Write a description..."
            variant="standard"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            <Button
              type="submit"
              variant="contained"
              color="info"
            >
              Edit Doctor's Info
            </Button>
          </ThemeProvider>
        </FormControl>
      </form>
    </>
  );
};

export default EditDoctor;
