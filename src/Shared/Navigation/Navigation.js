import React, { useEffect, useState } from "react";
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
import { createTheme, ThemeProvider } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Element,
  Events,
  ScrollLink,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import logo from "../../assets/logo.gif";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navigation = () => {
  let { user, logOut } = useAuth();
  const [singleUser, setSingleUser] = useState([]);
  
  useEffect(()=>{
    fetch(`https://tranquil-bastion-41948.herokuapp.com/singleUser/${user.email}`,{
      method:'GET',
      headers:{
        'content-type' : 'application/json',
        //'authorization' : `Bearer ${localStorage.getItem('idToken')}`
      }
    })
    .then( (res) => res.json())
    .then( data => {
      setSingleUser(data);
    })
  },[])

  let LinkNav = Scroll.Link;
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
    <AppBar position="none" sx={{ backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              color: "black",
              fontWeight: "600",
            }}
          >
            <img src={logo} alt="logo" height="100px" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: "#1CC7D0", fontWeight: "bolder" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <LinkNav
                to="banner"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1CC7D0",
                    textAlign: "start",
                  }}
                >
                  Home
                </Button>
              </LinkNav>
              <LinkNav
                to="about"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1CC7D0",
                    textAlign: "start",
                  }}
                >
                  About
                </Button>
              </LinkNav>
              <LinkNav
                to="services"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1CC7D0",
                    textAlign: "start",
                  }}
                >
                  Services
                </Button>
              </LinkNav>
              <LinkNav
                to="testimonials"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1CC7D0",
                    textAlign: "start",
                  }}
                >
                  Testimonials
                </Button>
              </LinkNav>
              <LinkNav
                to="departments"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1CC7D0",
                    textAlign: "start",
                  }}
                >
                  Departments
                </Button>
              </LinkNav>
              <LinkNav
                to="appoinment"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1CC7D0",
                    textAlign: "start",
                  }}
                >
                  Appoinment
                </Button>
              </LinkNav>
              <LinkNav
                to="gallery"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1CC7D0",
                    textAlign: "start",
                  }}
                >
                  Gallery
                </Button>
              </LinkNav>
              <LinkNav
                to="contact"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1CC7D0",
                    textAlign: "start",
                  }}
                >
                  Contact
                </Button>
              </LinkNav>
              <Link
                to="/admin"
                style={{
                  fontWeight: "500",
                  cursor: "pointer",
                  textDecoration:'none'
                }}
              >
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    mx: 0,
                    display: "block",
                    width: "100%",
                    color: "#1976D2",
                    textAlign: "start",
                  }}
                >
                  Admin
                </Button>
              </Link>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "black",
              fontWeight: "bolder",
            }}
          >
            <img src={logo} alt="logo" height="100px" />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              <LinkNav
                to="banner"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  color: "#1CC7D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Home
              </LinkNav>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              <LinkNav
                to="about"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  color: "#1CC7D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                About
              </LinkNav>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              <LinkNav
                to="services"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  color: "#1CC7D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Services
              </LinkNav>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              <LinkNav
                to="testimonials"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  color: "#1CC7D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Testimonials
              </LinkNav>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              <LinkNav
                to="departments"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  color: "#1CC7D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Departments
              </LinkNav>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, display: "block" }}
            >
              <LinkNav
                to="appoinment"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  color: "#1CC7D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Appoinment
              </LinkNav>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ mx: 0, display: "block" }}
            >
              <LinkNav
                to="gallery"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  color: "#1CC7D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Gallery
              </LinkNav>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ mx: 0, display: "block" }}
            >
              <LinkNav
                to="contact"
                spy={true}
                smooth={true}
                offset={-100}
                duration={500}
                style={{
                  color: "#1CC7D0",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Contact
              </LinkNav>
            </Button>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ mx: 0, display: "block" }}
            >
              <Link
                to="/admin"
                style={{
                  color: "#1976D2",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textDecoration:'none'
                }}
              >
                Admin
              </Link>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Tooltip>
            {user?.email ? (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link to="/profile" style={{ textDecoration: "none" }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    {user?.displayName || singleUser?.displayName || user?.email}
                  </MenuItem>
                </Link>
                <Typography onClick={logOut}>
                  <MenuItem onClick={handleCloseUserMenu}>Sign Out</MenuItem>
                </Typography>
              </Menu>
            ) : (
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link style={{ textDecoration: "none" }} to="/signIn">
                    Sign In
                  </Link>
                  <br />
                </MenuItem>
              </Menu>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
