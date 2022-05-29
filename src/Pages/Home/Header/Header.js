import React from "react";
import * as Scroll from "react-scroll";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  Link,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import CallIcon from "@mui/icons-material/Call";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookIcon from "@mui/icons-material/Book";
import useAuth from "../../../hooks/useAuth";

const Header = () => {
  const { user } = useAuth();
  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <p style={{ display: "flex" }}>
              <span style={{ fontSize: "23px", fontWeight: "600" }}>
                <CallIcon />
              </span>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                Call 12345678 <br />{" "}
                <span style={{ fontSize: "16px" }}>Ask for doctor</span>
              </span>
            </p>
            <p style={{ display: "flex" }}>
              <span style={{ fontSize: "23px", fontWeight: "600" }}>
                <AccessTimeIcon />
              </span>
              <span style={{ fontSize: "20px", fontWeight: "600" }}>
                Open Hours <br />
                <span style={{ fontSize: "16px" }}>
                  Sat-Thu(08:00-23:00 hrs)
                </span>
              </span>
            </p>
            <p style={{ cursor: "pointer" }}>
              <Link
                to="appoinment"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{ display: "flex" }}
              >
                <span style={{ fontSize: "23px", fontWeight: "600" }}>
                  <BookIcon />
                </span>
                <span style={{ fontSize: "20px", fontWeight: "600" }}>
                  For an Appointment <br />
                  <span style={{ fontSize: "16px" }}>Book Now</span>
                </span>
              </Link>
            </p>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
