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

const ManageReviews = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [reviewId, setReviewId] = useState("");

  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);
  const [statusSuccessAlertOpen, setStatusSuccessAlertOpen] = React.useState(false);


  const handleSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessAlertOpen(false);
  };

  const handleStatusSuccessAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatusSuccessAlertOpen(false);
  };

  useEffect(()=>{
    fetch("http://localhost:5000/reviews",{
      method:'GET',
      headers:{
        'content-type' : 'application/json',
        'authorization' : `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    .then( (res) => res.json())
    .then( data => {
      data.sort((a, b) => (new Date(a) < new Date(b) ? 1 : -1));
      setAllReviews(data);
    })
  },[])

  const handleStatus = (id, status) => {
    let modifiedReviews = [];
    allReviews.map((review) => {
      modifiedReviews.push(review);
    });
    setAllReviews(modifiedReviews);

    const modifiedStatus = { id, status };

    const url = `http://localhost:5000/updateReviewStatus`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        'authorization' : `Bearer ${localStorage.getItem('idToken')}`
      },
      body: JSON.stringify(modifiedStatus),
    }).then((res) => setStatusSuccessAlertOpen(true));
  };

  const handleDelete = (reviewId) => {
    const url = `http://localhost:5000/reviews/${reviewId}`;
    axios.delete(url).then((res) => {
      if (res.data.deletedCount) {
        const remaining = allReviews.filter(
          (allReview) => allReview._id !== reviewId
        );
        setAllReviews(remaining);
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

  const headerName = "Manage Review";

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
            Review deleted successfully
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
            Review status updated successfully
          </Alert>
        </Snackbar>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Id</StyledTableCell>
                <StyledTableCell>Image</StyledTableCell>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allReviews.map((review, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {count++}
                  </StyledTableCell>
                  <StyledTableCell>
                    <img src={review.image} alt="" width="50px" />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {review.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {review.email}
                  </StyledTableCell>
                  <StyledTableCell>{review.review}</StyledTableCell>
                  <StyledTableCell>
                    <FormControl>
                      <Select
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={review.status}
                        onChange={(e) =>
                          handleStatus(review._id, e.target.value)
                        }
                      >
                        <MenuItem value="Unpublished">
                          Unpublished
                        </MenuItem>
                        <MenuItem value="Published">Published</MenuItem>
                      </Select>
                    </FormControl>
                  </StyledTableCell>
                  <StyledTableCell>
                    <span style={{ display: "flex" }}>
                      <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(review._id)}
                      />
                    </span>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ManageReviews;
