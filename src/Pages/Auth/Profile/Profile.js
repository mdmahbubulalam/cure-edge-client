import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/logo.gif";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../../../hooks/useAuth";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Profile = () => {
  let { user } = useAuth();
  const navigate = useNavigate()
  const [allAppoinments, setAllAppoinments] = useState([]);
  useEffect(() => {
    const url = "http://localhost:5000/appoinmentByUser?email=" + user.email;
    fetch(url, {
      headers:{
        'content-type' : 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('idToken')}`
      }
      
    })
    
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }else if(res.status === 401) {
        navigate('/signIn')
      }
    })
    .then(data => setAllAppoinments(data))
  }, []);

  const charge = allAppoinments.map(
    (appoinment) =>
      appoinment.status !== "Done" && parseInt(appoinment.serviceCharge)
  );
  const totalCharge = charge.reduce((partialSum, a) => partialSum + a, 0);

  let count = 1;

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Link to="/">
          <img src={logo} alt="" srcset="" style={{ width: "150px" }} />
        </Link>
      </Container>
      <Container sx={{ textAlign:'start' , color:'#4B77AD'}}>
        <Typography variant="subtitle2" gutterBottom component="div">
          <span style={{color:'green',fontWeight:'600'}}>Congratulations</span>, <span style={{color:'#39B5FF', fontWeight:'bold'}}>{user.displayName}</span>!!! <br />
          <span style={{fontWeight:'600'}}>Thanks for choosing our service. Your total service charge is - ${totalCharge}</span>
          
        </Typography>
      </Container>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#E7EBF0",
          borderRadius: "10px",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ marginTop: "24px", marginBottom: "24px" }}
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>id</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Sex</StyledTableCell>
                <StyledTableCell>Service</StyledTableCell>
                <StyledTableCell>Hospital</StyledTableCell>
                <StyledTableCell>Symptoms</StyledTableCell>
                <StyledTableCell>Address</StyledTableCell>
                <StyledTableCell>Date & Time</StyledTableCell>
                <StyledTableCell>Service Charge</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAppoinments.map((appoinment, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{count++}</StyledTableCell>
                  <StyledTableCell>{appoinment.patientName}</StyledTableCell>
                  <StyledTableCell>{appoinment.email}</StyledTableCell>
                  <StyledTableCell>{appoinment.phone}</StyledTableCell>
                  <StyledTableCell>{appoinment.age}</StyledTableCell>
                  <StyledTableCell>{appoinment.gender}</StyledTableCell>
                  <StyledTableCell>{appoinment.service}</StyledTableCell>
                  <StyledTableCell>{appoinment.hospital}</StyledTableCell>
                  <StyledTableCell>{appoinment.symptoms}</StyledTableCell>
                  <StyledTableCell>{appoinment.address}</StyledTableCell>
                  <StyledTableCell>{appoinment.dateTime}</StyledTableCell>
                  <StyledTableCell>${appoinment.serviceCharge}</StyledTableCell>
                  <StyledTableCell>{appoinment.status}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Profile;
