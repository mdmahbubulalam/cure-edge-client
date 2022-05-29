import { Box, Container, Grid, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DashBoard from "../DashBoard/DashBoard";
import NavigationDrawer from "../NavigationDrawer/NavigationDrawer";
import PersonIcon from '@mui/icons-material/Person';
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PendingIcon from "@mui/icons-material/Pending";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";


const drawerWidth = 240;

const Admin = () => {
  const headerName = "Dashboard";
  const [allAppoinments, setAllAppoinments] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const appoinmentPending = [];
  const appoinmentOnGoing = [];
  const appoinmentDone = [];

  useEffect(()=>{
    fetch("http://localhost:5000/appoinments",{
      method:'GET',
      headers:{
        'content-type' : 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    .then( (res) => res.json())
    .then( data => {
      data.sort((a, b) => (new Date(a) < new Date(b) ? 1 : -1));
      setAllAppoinments(data);
    })
  },[])

  useEffect(()=>{
    fetch("http://localhost:5000/users",{
      method:'GET',
      headers:{
        'content-type' : 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    .then( (res) => res.json())
    .then( data => {
      data.sort((a, b) => (new Date(a) < new Date(b) ? 1 : -1));
      setAllUsers(data);
    })
  },[])

  const pending = allAppoinments.map(
    (appoinment) =>
      appoinment.status === "Pending" && appoinmentPending.push([appoinment])
  );
  const onGoing = allAppoinments.map(
    (appoinment) =>
      appoinment.status === "On Going" && appoinmentOnGoing.push([appoinment])
  );
  const done = allAppoinments.map(
    (appoinment) =>
      appoinment.status === "Done" && appoinmentDone.push([appoinment])
  );
  const totalCharge = allAppoinments.map(
    (appoinment) =>
      appoinment.status === "Done" && parseInt(appoinment.serviceCharge)
  );
  const totalSales = totalCharge.reduce((partialSum, a) => partialSum + a, 0);

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dashboardContent = [
    {
      title: "Total Appoinments",
      total: allAppoinments.length,
      bgColor: "#F47721",
      icon:<MeetingRoomIcon/>
    },
    {
      title: "Total Sales",
      total: totalSales,
      bgColor: "#1CC7D0",
      icon:<AttachMoneyIcon/>
    },
    {
      title: "Total Users",
      total: allUsers.length,
      bgColor: "#000000",
      icon:<PersonIcon/>
    },
    {
      title: "Pending",
      total: appoinmentPending.length,
      bgColor: "#335238",
      icon:<PendingIcon/>
    },
    {
      title: "On Going",
      total: appoinmentOnGoing.length,
      bgColor: "#00B2A9",
      icon:<DirectionsWalkIcon/>
    },
    {
      title: "Done",
      total: appoinmentDone.length,
      bgColor: "#3B3141",
      icon:<DoneAllIcon/>
    },
  ];

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
        <Container>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {dashboardContent.map((content, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                <DashBoard key={index} content={content} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Admin;
