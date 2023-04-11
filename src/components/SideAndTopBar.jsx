import { useContext, useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { ColorModeContext, colorPallets } from "../theme";
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TvOutlinedIcon from "@mui/icons-material/TvOutlined";
import ComputerOutlinedIcon from "@mui/icons-material/ComputerOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import HeadphonesBatteryOutlinedIcon from "@mui/icons-material/HeadphonesBatteryOutlined";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAllCheckItems } from "../redux/features/checkboxSlice";
import { resetFilter } from "../redux/features/filterSlice";
import TooltipTitle from "./TooltipTitle";
import { logout } from "../redux/features/admin/authSlice";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
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

const SideAndTopBar = () => {
  const colorMode = useContext(ColorModeContext);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickOnItem = () => {
    dispatch(removeAllCheckItems());
    dispatch(resetFilter());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        open={open}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? colors.dark[800]
              : colors.light[800],
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? colors.light[300]
                    : colors.dark[300],
                fontSize: "1.3rem",
              }}
            />
          </IconButton>
          <Box
            width={"100%"}
            display="flex"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Typography
              color={
                theme.palette.mode === "dark"
                  ? colors.light[300]
                  : colors.dark[300]
              }
              variant="h1"
              fontWeight="500"
            >
              Techstore Admin
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton
                sx={{ display: "flex", alignItems: "flex-end" }}
                onClick={() => dispatch(logout())}
              >
                <Typography mr={0.3}>Sign Out</Typography>
                <AccountCircleOutlinedIcon sx={{ fontSize: "1.3rem" }} />
              </IconButton>
              <Tooltip
                title={TooltipTitle(
                  theme.palette.mode === "dark"
                    ? "Turn on light mode"
                    : "Turn on dark mode"
                )}
                TransitionComponent={Zoom}
                arrow
              >
                <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                    <WbSunnyOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  ) : (
                    <ModeNightOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon sx={{ fontSize: "1.3rem" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <NavLink to={"/"} style={{ textDecoration: "none" }}>
            <ListItem
              disablePadding
              sx={{ display: "block", marginTop: "10px" }}
              onClick={handleClickOnItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip
                  title={!open ? TooltipTitle("Dashboard") : undefined}
                  placement="right"
                  arrow
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DashboardOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Dashboard"
                  sx={{ opacity: open ? 1 : 0, color: colors.light[100] }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/customers"} style={{ textDecoration: "none" }}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleClickOnItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip
                  title={!open ? TooltipTitle("Customers") : undefined}
                  placement="right"
                  arrow
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PeopleAltOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Customers"
                  sx={{ opacity: open ? 1 : 0, color: colors.light[100] }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <Divider />
          <NavLink to={"/tvs"} style={{ textDecoration: "none" }}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleClickOnItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip
                  title={!open ? TooltipTitle("TVs") : undefined}
                  placement="right"
                  arrow
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <TvOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="TVs"
                  sx={{ opacity: open ? 1 : 0, color: colors.light[100] }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/computers"} style={{ textDecoration: "none" }}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleClickOnItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip
                  title={!open ? TooltipTitle("Computers") : undefined}
                  placement="right"
                  arrow
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ComputerOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Computers"
                  sx={{ opacity: open ? 1 : 0, color: colors.light[100] }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/cellphones"} style={{ textDecoration: "none" }}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleClickOnItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip
                  title={!open ? TooltipTitle("Cell Phones") : undefined}
                  placement="right"
                  arrow
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <PhoneIphoneOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Cell Phones"
                  sx={{ opacity: open ? 1 : 0, color: colors.light[100] }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/accessories"} style={{ textDecoration: "none" }}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleClickOnItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip
                  title={!open ? TooltipTitle("Accessories") : undefined}
                  placement="right"
                  arrow
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <HeadphonesBatteryOutlinedIcon
                      sx={{ fontSize: "1.4rem" }}
                    />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Accessories"
                  sx={{ opacity: open ? 1 : 0, color: colors.light[100] }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/orders"} style={{ textDecoration: "none" }}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleClickOnItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip
                  title={!open ? TooltipTitle("Orders") : undefined}
                  placement="right"
                  arrow
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ShoppingBasketIcon sx={{ fontSize: "1.4rem" }} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Orders"
                  sx={{ opacity: open ? 1 : 0, color: colors.light[100] }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/reviews"} style={{ textDecoration: "none" }}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleClickOnItem}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <Tooltip
                  title={!open ? TooltipTitle("Reviews") : undefined}
                  placement="right"
                  arrow
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ReviewsIcon sx={{ fontSize: "1.4rem" }} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText
                  primary="Reviews"
                  sx={{ opacity: open ? 1 : 0, color: colors.light[100] }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        </List>
      </Drawer>
    </Box>
  );
};

export default SideAndTopBar;
