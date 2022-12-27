import { useState } from "react";
import {
  useTheme,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  FormControlLabel,
  Switch,
  Zoom,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { colorPallets } from "../theme";
import DummyImage from "../assets/dummy.jpg";
import Search from "./Search";
import { Link } from "react-router-dom";

const dummyColors = [
  {
    _id: 1,
    name: "Graphite",
    code: "#1a2129",
    qty: 7,
  },
  {
    _id: 2,
    name: "Silver",
    code: "#f9f4f0",
    qty: 0,
  },
  {
    _id: 3,
    name: "Gold",
    code: "#fee2de",
    qty: 4,
  },
  {
    _id: 4,
    name: "Sierra Blue",
    code: "#256080",
    qty: 8,
  },
  {
    _id: 5,
    name: "Alpine Green",
    code: "#586958",
    qty: 3,
  },
];

const DataTable = ({ contentType }) => {
  const [dense, setDense] = useState(false);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  return (
    <Box sx={{ width: "90%", margin: "30px auto" }}>
      <Paper
        sx={{
          width: "100%",
          mb: 2,
          backgroundColor: theme.palette.mode === "light" && colors.light[500],
        }}
      >
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          }}
        >
          <Box width="100%" display="flex" justifyContent="space-between">
            <Typography variant="h6" id="tableTitle" component="div">
              Product:{" "}
              <span style={{ color: colors.secondary[500] }}>
                {contentType.toUpperCase()}
              </span>
            </Typography>
            <Search contentType={contentType} />
            <Box display="flex" alignItems="center">
              {contentType === "customer" ? (
                <Typography variant="h6" mr="20px">
                  Total Customers:{" "}
                  <span
                    style={{ color: colors.secondary[500], fontSize: "1rem" }}
                  >
                    2909
                  </span>
                </Typography>
              ) : (
                <Typography variant="h6" mr="20px">
                  Total Products:{" "}
                  <span
                    style={{ color: colors.secondary[500], fontSize: "1rem" }}
                  >
                    2390
                  </span>
                </Typography>
              )}
              <Tooltip
                title="Filter list"
                sx={{
                  mr: "10px",
                  transition: "0.2s ease-in-out",
                  "&:hover": { color: colors.secondary[500] },
                }}
                placement="top"
                TransitionComponent={Zoom}
                arrow
              >
                <IconButton>
                  <FilterListIcon sx={{ fontSize: "1.3rem" }} />
                </IconButton>
              </Tooltip>
              {contentType !== "customer" && (
                <Link to={`/create/${contentType}`}>
                  <Tooltip
                    title={`Add new ${contentType}`}
                    sx={{
                      transition: "0.2s ease-in-out",
                      "&:hover": { color: colors.secondary[500] },
                    }}
                    placement="top"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <IconButton>
                      <AddCircleOutlineOutlinedIcon
                        sx={{ fontSize: "1.8rem" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Link>
              )}
            </Box>
          </Box>
        </Toolbar>
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor:
              theme.palette.mode === "light" && colors.light[600],
          }}
        >
          <Table
            sx={{ minWidth: 650 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox color="secondary" />
                </TableCell>
                <TableCell sx={{ fontSize: "0.7rem" }}>Product Name</TableCell>
                <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
                  Image
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
                  Brand
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
                  {contentType === "computer" ? "Type" : "Year"}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
                  {contentType === "tv" ? "resolution" : "Storage/Ram"}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
                  {contentType === "tv" ? "Sizes" : "Colors"}
                </TableCell>
                <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
                  Quantity
                </TableCell>
                {contentType !== "tv" && (
                  <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
                    Price
                  </TableCell>
                )}
                <TableCell align="right" sx={{ fontSize: "0.7rem" }}>
                  Settings
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                hover
                role="checkbox"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox color="secondary" />
                </TableCell>
                <TableCell component="th" scope="row">
                  Some Product Name
                </TableCell>
                <TableCell align="center">
                  <img src={DummyImage} alt="" id="table-image" />
                </TableCell>
                <TableCell align="center">Samsung</TableCell>
                {contentType === "computer" ? (
                  <TableCell align="center">All-In-One</TableCell>
                ) : (
                  <TableCell align="center">2018</TableCell>
                )}
                {contentType === "tv" ? (
                  <TableCell align="center">4K</TableCell>
                ) : (
                  <TableCell align="center">256 GB / 8 GB</TableCell>
                )}
                <TableCell align="center">
                  {contentType === "tv" ? (
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      sx={{
                        width: "170px",
                        height: "100%",
                        margin: "auto",
                      }}
                    >
                      {[43, 48, 55, 66, 75, 85].map((size) => (
                        <Box
                          key={size}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          sx={{
                            width: "25px",
                            height: "25px",
                            border: `1px solid ${colors.light[200]}`,
                            ml: "10px",
                            mt: "5px",
                          }}
                        >
                          {size}"
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      flexWrap="wrap"
                      sx={{
                        width: "170px",
                        height: "100%",
                        margin: "auto",
                      }}
                    >
                      {dummyColors.map((color) => (
                        <Tooltip
                          key={color._id}
                          title={color.name}
                          placement="top"
                          TransitionComponent={Zoom}
                          arrow
                        >
                          <Box
                            sx={{
                              width: "20px",
                              height: "20px",
                              backgroundColor: color.code,
                              border: `1px solid ${colors.light[200]}`,
                              ml: "10px",
                              mt: "5px",
                            }}
                          ></Box>
                        </Tooltip>
                      ))}
                    </Box>
                  )}
                </TableCell>
                <TableCell align="center">22</TableCell>
                {contentType !== "tv" && (
                  <TableCell align="center">$859.99</TableCell>
                )}
                <TableCell align="right">
                  <IconButton
                    sx={{
                      transition: "0.2s ease-in-out",
                      "&:hover": { color: colors.secondary[500] },
                    }}
                  >
                    <SettingsOutlinedIcon sx={{ fontSize: "1.3rem" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={25}
          rowsPerPage="5"
          page={1}
          // onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
      <FormControlLabel
        control={
          <Switch
            color="secondary"
            checked={dense}
            onChange={() => setDense(!dense)}
          />
        }
        label="Change Density"
      />
    </Box>
  );
};

export default DataTable;
