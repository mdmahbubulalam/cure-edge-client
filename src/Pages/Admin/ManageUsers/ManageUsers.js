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
import {
  Box, Button, FormControl, MenuItem, Select,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import EditService from "../EditService/EditService";
import EditHospital from "../EditHospital/EditHospital";

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

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [hospitalId, setHospitalId] = useState('');

  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
  const [roleChangeSuccessAlertOpen, setRoleChangeSuccessAlertOpen] = React.useState(false);

  const handleSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertOpen(false);
  };

  const handleRoleChangeSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setRoleChangeSuccessAlertOpen(false);
  };

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogOpen = (hospitalId) => {
    setHospitalId(hospitalId)
    setDialogOpen(true);
    
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

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
  
  const handleRole = (email, role) => {
    let modifiedUserRole = [];
    allUsers.map((user) => {
      modifiedUserRole.push(user);
    });
    setAllUsers(modifiedUserRole);

    const modifiedStatus = { email, role };

    const url = `http://localhost:5000/users/role`;
    fetch(url, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(modifiedStatus),
    }).then((res) => setRoleChangeSuccessAlertOpen(true));
  };

  

  const handleDelete = (userId) => {
    const url = `http://localhost:5000/users/${userId}`;
    axios.delete(url).then((res) => {
      if (res.data.deletedCount) {
        const remaining = allUsers.filter((user) => user._id !== userId);
        setAllUsers(remaining);
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

  const headerName = "Manage Users";


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
            User deleted successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={roleChangeSuccessAlertOpen}
          autoHideDuration={6000}
          onClose={handleRoleChangeSuccessAlertClose}
        >
          <Alert
            onClose={handleRoleChangeSuccessAlertClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            User role updated successfully
          </Alert>
        </Snackbar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Role</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers.map((user, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {count++}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.displayName}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                  <FormControl>
                      <Select
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={user.role === "Admin" ? user.role : 'General'}
                        onChange={(e) =>
                          handleRole(user.email, e.target.value)
                        }
                      >
                        <MenuItem value="General">General</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <span style={{ display: "flex" }}>
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(user._id)}
                      />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Edit form Data</DialogTitle>
          <DialogContent>
            <EditHospital hospitalId={hospitalId} handleDialogClose={handleDialogClose}/>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ManageUsers;
