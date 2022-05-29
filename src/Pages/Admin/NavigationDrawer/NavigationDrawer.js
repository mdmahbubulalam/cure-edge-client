import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManIcon from "@mui/icons-material/Man";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/logo.gif";
import { Link } from "react-router-dom";
import { Collapse, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import StarBorder from "@mui/icons-material/StarBorder";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import CommentIcon from "@mui/icons-material/Comment";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import PersonIcon from '@mui/icons-material/Person';

const drawerWidth = 240;

const NavigationDrawer = (props) => {
  const [doctorsMenuOpen, setDoctorsMenuMenu] = React.useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = React.useState(false);
  const [hospitalsMenuOpen, setHospitalsMenuOpen] = React.useState(false);


  const { window, headerName } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDocorsMenuClick = () => {
    setDoctorsMenuMenu(!doctorsMenuOpen);
  };

  const handleServicesMenuClick = () => {
    setServicesMenuOpen(!servicesMenuOpen);
  };

  const handleHospitalsMenuMenuClick = () => {
    setHospitalsMenuOpen(!hospitalsMenuOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography
        sx={{
          textAlign: "center",
        }}
      >
        <Link to="/">
          <img src={logo} alt="logo" height="56px" />
        </Link>
      </Typography>

      <Divider />
      <List>
        <Link
          to="/admin"
          style={{
            textDecoration: "none",
            color: "#000",
            fontWeight: "500",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              DashBoard
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/appoinments"
          style={{
            textDecoration: "none",
            color: "#000",
            fontWeight: "500",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              Appoinments
            </ListItemButton>
          </ListItem>
        </Link>
        <ListItemButton onClick={handleServicesMenuClick}>
          <ListItemIcon>
            <MedicalServicesIcon />
          </ListItemIcon>
          <ListItemText primary="Services" />
          {servicesMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={servicesMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/addService"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "500",
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText>Add Service</ListItemText>
              </ListItemButton>
            </Link>
            <Link
              to="/manageServices"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "500",
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText>Manage Services</ListItemText>
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <ListItemButton onClick={handleDocorsMenuClick}>
          <ListItemIcon>
            <ManIcon />
          </ListItemIcon>
          <ListItemText primary="Doctors" />
          {doctorsMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={doctorsMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/addDoctor"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "500",
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText>Add Doctor</ListItemText>
              </ListItemButton>
            </Link>
            <Link
              to="/manageDoctors"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "500",
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText>Manage Doctors</ListItemText>
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <ListItemButton onClick={handleHospitalsMenuMenuClick}>
          <ListItemIcon>
            <MedicalInformationIcon />
          </ListItemIcon>
          <ListItemText primary="Hospitals" />
          {hospitalsMenuOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={hospitalsMenuOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/addHospital"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "500",
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddBoxIcon />
                </ListItemIcon>
                <ListItemText>Add Hospital</ListItemText>
              </ListItemButton>
            </Link>
            <Link
              to="/manageHospitals"
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "500",
              }}
            >
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText>Manage Hospital</ListItemText>
              </ListItemButton>
            </Link>
          </List>
        </Collapse>
        <Link
          to="/reviews"
          style={{
            textDecoration: "none",
            color: "#000",
            fontWeight: "500",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <CommentIcon />
              </ListItemIcon>
              Reviews
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/manageUsers"
          style={{
            textDecoration: "none",
            color: "#000",
            fontWeight: "500",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              Users
            </ListItemButton>
          </ListItem>
        </Link>
        
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <Box>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {headerName}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavigationDrawer;
