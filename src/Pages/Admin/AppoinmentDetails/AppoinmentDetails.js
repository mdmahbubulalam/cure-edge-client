
  import { Typography } from "@mui/material";
import axios from "axios";
  import React, { useEffect, useState } from "react";

  const AppoinmentDetails = (props) => {
    const appoinmentId = props.appoinmentId;
    const [appoinmentDetails, setAppoinmentDetails] = useState([]);
  
    useEffect(() => {
      const url = `https://cure-edge-server.onrender.com/appoinments/${appoinmentId}`;
      axios.get(url).then((res) => {
        if (res.data) {
            setAppoinmentDetails(res.data)
        }
      });
    }, [appoinmentId]);
    console.log(appoinmentDetails)

    return (
      <>
       <Typography variant="p" component="div">
         <strong>Name : </strong>{appoinmentDetails.patientName}
       </Typography>
       <Typography variant="p" component="div">
         <strong>Email : </strong>{appoinmentDetails.email}
       </Typography>
       <Typography variant="p" component="div">
         <strong>Phone No. : </strong>{appoinmentDetails.phone}
       </Typography>
       <Typography variant="p" component="div">
         <strong>Age : </strong>{appoinmentDetails.age}
       </Typography>
       <Typography variant="p" component="div">
         <strong>Service : </strong>{appoinmentDetails.service}
       </Typography>
       <Typography variant="p" component="div">
         <strong>Hospital : </strong>{appoinmentDetails.hospital}
       </Typography>
       <Typography variant="p" component="div">
         <strong>Symptoms : </strong>{appoinmentDetails.symptoms}
       </Typography>
       <Typography variant="p" component="div">
         <strong>Address : </strong>{appoinmentDetails.address}
       </Typography>
       <Typography variant="p" component="div">
         <strong>Date & Time : </strong>{appoinmentDetails.dateTime}
       </Typography>
        
      </>
    );
  };
  
  export default AppoinmentDetails;
  