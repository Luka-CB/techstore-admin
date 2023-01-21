import { useState } from "react";
import {
  useTheme,
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
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
  CircularProgress,
  TableBody,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { colorPallets } from "../theme";
import Search from "./Search";
import { Link } from "react-router-dom";
import Content from "./Content";
import SizesConfig from "./form/SizesConfig";
import { useDispatch, useSelector } from "react-redux";
import Gallery from "./Gallery";
import DeleteProductModal from "./DeleteProductModal";
import {
  addAllCheckItems,
  removeAllCheckItems,
} from "../redux/features/checkboxSlice";

const DataTable = ({ content, contentLoading, contentType }) => {
  const [dense, setDense] = useState(false);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const dispatch = useDispatch();

  const { checkedData } = useSelector((state) => state.checkbox);
  const { isSizesModalOpen } = useSelector((state) => state.sizesModal);
  const { isGalleryOpen } = useSelector((state) => state.gallery);
  const { isDelProductModalOpen } = useSelector(
    (state) => state.delProductModal
  );

  const checkAllItemHandler = (checkState) => {
    const itemIds = content.map((item) => item._id);

    if (checkState) {
      dispatch(addAllCheckItems({ contentType, itemIds }));
    } else {
      dispatch(removeAllCheckItems());
    }
  };

  const checkedItemCount = checkedData?.checkedItemIds?.length;
  const rowCount = content?.length;

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
                  {content?.length > 1 ? "Total Customers" : "Total Customer"}:{" "}
                  <span
                    style={{ color: colors.secondary[500], fontSize: "1rem" }}
                  >
                    {content?.length}
                  </span>
                </Typography>
              ) : (
                <Typography variant="h6" mr="20px">
                  {content?.length > 1 ? "Total Products" : "Total Product"}:{" "}
                  <span
                    style={{ color: colors.secondary[500], fontSize: "1rem" }}
                  >
                    {content?.length}
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
            sx={{ minWidth: 650, minHeight: "30vh", position: "relative" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="secondary"
                    indeterminate={
                      checkedItemCount > 0 && checkedItemCount < rowCount
                    }
                    checked={rowCount > 0 && checkedItemCount === rowCount}
                    onChange={(e) => checkAllItemHandler(e.target.checked)}
                  />
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
              {contentLoading ? (
                <CircularProgress
                  color="secondary"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ) : (
                <>
                  {content?.length === 0 ? (
                    <Typography
                      variant="h5"
                      color="error"
                      sx={{
                        position: "absolute",
                        top: "60%",
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {contentType === "customer"
                        ? "No Customers!"
                        : "No Products!"}
                    </Typography>
                  ) : (
                    <>
                      {content?.map((data) => (
                        <Content
                          key={data._id}
                          data={data}
                          loading={contentLoading}
                          contentType={contentType}
                        />
                      ))}
                    </>
                  )}
                </>
              )}
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

      {isSizesModalOpen && <SizesConfig />}
      {isGalleryOpen && <Gallery contentType={contentType} />}
      {isDelProductModalOpen && (
        <DeleteProductModal colors={colors} contentType={contentType} />
      )}
    </Box>
  );
};

export default DataTable;
