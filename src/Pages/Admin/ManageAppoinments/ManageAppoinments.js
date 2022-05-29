import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import NavigationDrawer from "../NavigationDrawer/NavigationDrawer";
import { Box, Button, FormControl, MenuItem, Select } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import MoreIcon from "@mui/icons-material/More";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AppoinmentDetails from "../AppoinmentDetails/AppoinmentDetails";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const drawerWidth = 240;

const ManageAppoinments = () => {
  const [allAppoinments, setAllAppoinments] = useState([]);
  const [appoinmentId, setAppoinmentId] = useState("");
  const [statusSuccessAlertOpen, setStatusSuccessAlertOpen] =
    React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);

  const handleDialogOpen = (appoinmentId) => {
    setAppoinmentId(appoinmentId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleStatusSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatusSuccessAlertOpen(false);
  };

  const handleSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertOpen(false);
  };


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

  const handleDelete = (appoinmentId) => {
    const url = `http://localhost:5000/appoinments/${appoinmentId}`;
    axios.delete(url).then((res) => {
      if (res.data.deletedCount) {
        const remaining = allAppoinments.filter(
          (allAppoinment) => allAppoinment._id !== appoinmentId
        );
        setAllAppoinments(remaining);
        setSuccessAlertOpen(true);
      }
    });
  };

  let count = 1;
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const headerName = "Manage Appoinments";

  const handleStatus = (id, status) => {
    let modifiedAppoinments = [];
    allAppoinments.map((appoinment) => {
      modifiedAppoinments.push(appoinment);
    });
    setAllAppoinments(modifiedAppoinments);

    const modifiedStatus = { id, status };

    const url = `http://localhost:5000/updateAppoinmentStatus`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        'authorization' : `Bearer ${localStorage.getItem('idToken')}`
      },
      body: JSON.stringify(modifiedStatus),
    }).then((res) => setStatusSuccessAlertOpen(true));
  };

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
            Appoinment deleted successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={statusSuccessAlertOpen}
          autoHideDuration={6000}
          onClose={handleStatusSuccessAlertClose}
        >
          <Alert
            onClose={handleStatusSuccessAlertClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Appoinment status updated successfully
          </Alert>
        </Snackbar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Phone</StyledTableCell>
                <StyledTableCell>Age</StyledTableCell>
                <StyledTableCell>Service</StyledTableCell>
                <StyledTableCell>Hospital</StyledTableCell>
                <StyledTableCell>Service Charge</StyledTableCell>
                <StyledTableCell>Date and Time</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allAppoinments.map((Appoinment, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {count++}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {Appoinment.patientName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {Appoinment.phone}
                  </StyledTableCell>
                  <StyledTableCell>{Appoinment.age}</StyledTableCell>
                  <StyledTableCell>{Appoinment.service}</StyledTableCell>
                  <StyledTableCell>{Appoinment.hospital}</StyledTableCell>
                  {Appoinment.serviceCharge && (
                    <StyledTableCell>
                      ${Appoinment.serviceCharge}
                    </StyledTableCell>
                  )}
                  <StyledTableCell>{Appoinment.dateTime}</StyledTableCell>
                  <StyledTableCell>
                    <FormControl>
                      <Select
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={Appoinment.status}
                        onChange={(e) =>
                          handleStatus(Appoinment._id, e.target.value)
                        }
                      >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="On Going">On Going</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <span style={{ display: "flex" }}>
                      <MoreIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDialogOpen(Appoinment._id)}
                      />
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(Appoinment._id)}
                      />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Full appoinment info</DialogTitle>
          <DialogContent>
            <AppoinmentDetails appoinmentId={appoinmentId} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ManageAppoinments;
