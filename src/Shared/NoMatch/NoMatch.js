import { Box, Button } from "@mui/material";
import React from "react";
import notFound from "../../assets/404.jpg";
import "./NoMatch.css";
import logo from "../../assets/logo.gif";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      textAlign="center"
    >
      <Box>
        <Box>
          <img
            src={notFound}
            alt="https://www.freepik.com/vectors/unavailable"
            className="bg-image"
          />
        </Box>
        <Box>
          <Link to="/" className="link-text">
            <Button variant="contained" sx={{ backgroundColor: "#50CE87" }}>
              Back to Homepage
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default NoMatch;
