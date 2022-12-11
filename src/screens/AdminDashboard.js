import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AnalyticsIcon from "@mui/icons-material/PeopleAlt";
import { Typography } from "@mui/material";
import Analytics from "./Analytics";
import { useAuth0 } from "@auth0/auth0-react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#343a40",
  color: "white",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: "#343a40",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function AdminDashboard() {
  const { logout } = useAuth0();
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <>
      {isAuthenticated &&
      user.email === process.env.REACT_APP_ADMIN_EMAIL &&
      user.nickname === process.env.REACT_APP_ADMIN_NICKNAME ? (
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <AppBar
            sx={{
              backgroundColor: "#003B5F",
              padding: "5px",
            }}
            position="fixed"
            open={open}
          >
            <Toolbar>
              {auth && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 2,
                      ...(open && { display: "none" }),
                    }}
                  >
                    <MenuIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle fontSize="large" />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        logout();
                      }}
                      style={{ color: "red", fontWeight: "bolder" }}
                    >
                      LOGOUT
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </AppBar>
          <Box>
            <Drawer
              ModalProps={{ backgroundColor: "red" }}
              variant="permanent"
              open={open}
            >
              <DrawerHeader sx={{ backgroundColor: "#343a40", padding: "5px" }}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronRightIcon color="error" fontSize="large" />
                  ) : (
                    <ChevronLeftIcon color="error" fontSize="large" />
                  )}
                </IconButton>
              </DrawerHeader>
              {/* <Divider /> */}
              <List>
                {[
                  {
                    label: "Analytics",
                    route: "analytics",
                    icon: <AnalyticsIcon color="primary" />,
                  },
                ].map((e, i) => (
                  <ListItem
                    key={i}
                    onClick={() => {
                      navigate(e.route);
                    }}
                    disablePadding
                    className="sideBtns"
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {e.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={e.label}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              pt: 2,
            }}
          >
            <Routes>
              <Route path="analytics" element={<Analytics />} />
            </Routes>
          </Box>
        </Box>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default AdminDashboard;
