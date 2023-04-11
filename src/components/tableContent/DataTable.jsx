import { useState } from "react";
import {
  useTheme,
  Box,
  Table,
  TableContainer,
  Toolbar,
  Typography,
  Paper,
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
import { colorPallets } from "../../theme";
import Search from "./Search";
import { Link } from "react-router-dom";
import ProductContent from "./product/ProductContent";
import SizesConfig from "../form/SizesConfig";
import { useSelector } from "react-redux";
import Gallery from "../gallery/Gallery";
import DeleteProductModal from "./product/DeleteProductModal";
import MarkedState from "./MarkedState";
import CustomPagination from "./CustomPagination";
import ColorsConfig from "../form/ColorsConfig";
import ProductTableHead from "./product/ProductTableHead";
import CustomerTableHead from "./customer/CustomerTabelHead";
import CustomerContent from "./customer/CustomerContent";
import DeleteCustomerModal from "./customer/DeleteCustomerModal";
import OrderTableHead from "./order/OrderTableHead";
import OrderContent from "./order/OrderContent";
import TooltipTitle from "../TooltipTitle";
import ShowMore from "../ShowMore";

const omitCreateBtn = ["customer", "order", "review"];

const DataTable = ({
  content,
  totalProductCount,
  contentLoading,
  contentType,
}) => {
  const [dense, setDense] = useState(false);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { searchQ } = useSelector((state) => state.filter);
  const { checkedData } = useSelector((state) => state.checkbox);
  const { isSizesModalOpen } = useSelector((state) => state.sizesModal);
  const { isColorsModalOpen } = useSelector((state) => state.colorsModal);
  const { isGalleryOpen } = useSelector((state) => state.gallery);
  const { isDelProductModalOpen } = useSelector(
    (state) => state.delProductModal
  );
  const { isDelCustomerModalOpen } = useSelector(
    (state) => state.delCustomerModal
  );

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
            {checkedData?.checkedItemIds?.length > 0 ? (
              <MarkedState
                colors={colors}
                markedItemCount={checkedData?.checkedItemIds?.length}
                contentType={checkedData.contentType}
                markedIds={checkedData?.checkedItemIds}
              />
            ) : (
              <>
                <Search contentType={contentType} />
                <Box display="flex" alignItems="center">
                  {contentType === "customer" ? (
                    <Typography variant="h6" mr="20px">
                      {content?.length > 1 ? "Total Customers" : "Customer"}:{" "}
                      <span
                        style={{
                          color: colors.secondary[500],
                          fontSize: "1rem",
                        }}
                      >
                        {content?.length}
                      </span>
                    </Typography>
                  ) : contentType === "order" ? (
                    <Typography variant="h6" mr="20px">
                      {content?.length > 1 ? "Total Orders" : "Order"}:{" "}
                      <span
                        style={{
                          color: colors.secondary[500],
                          fontSize: "1rem",
                        }}
                      >
                        {content?.length}
                      </span>
                    </Typography>
                  ) : (
                    <Typography variant="h6" mr="20px">
                      {totalProductCount > 1 ? "Total Products" : "Product"}:{" "}
                      <span
                        style={{
                          color: colors.secondary[500],
                          fontSize: "1rem",
                        }}
                      >
                        {totalProductCount ? totalProductCount : 0}
                      </span>
                    </Typography>
                  )}
                  <Tooltip
                    title={TooltipTitle("Filter list")}
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
                  {!omitCreateBtn.includes(contentType) && (
                    <Link to={`/create/${contentType}`}>
                      <Tooltip
                        title={TooltipTitle(`Add new ${contentType}`)}
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
              </>
            )}
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
            sx={{ minWidth: 650, position: "relative" }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            {contentType === "customer" ? (
              <CustomerTableHead content={content} contentType={contentType} />
            ) : contentType === "order" ? (
              <OrderTableHead content={content} contentType={contentType} />
            ) : (
              <ProductTableHead content={content} contentType={contentType} />
            )}
            <TableBody
              sx={{
                height: content?.length === 0 && 250,
                width: "100%",
              }}
            >
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
                        textTransform: "capitalize",
                      }}
                    >
                      {contentType === "customer"
                        ? "No Customers!"
                        : contentType === "accessory"
                        ? `no accessories!`
                        : `no ${contentType}s`}
                    </Typography>
                  ) : (
                    <>
                      {contentType === "customer"
                        ? content?.map((data) => (
                            <CustomerContent
                              key={data._id}
                              data={data}
                              contentType={contentType}
                            />
                          ))
                        : contentType === "order"
                        ? content?.map((data) => (
                            <OrderContent
                              key={data._id}
                              data={data}
                              contentType={contentType}
                            />
                          ))
                        : content?.map((data) => (
                            <ProductContent
                              key={data._id}
                              data={data}
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
        {!searchQ && totalProductCount > 4 && (
          <CustomPagination colors={colors} contentType={contentType} />
        )}
        {contentType === "order" && content?.length > 20 ? (
          <ShowMore colors={colors} contentCount={content?.length} />
        ) : null}
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
      {isColorsModalOpen && <ColorsConfig contentType={contentType} />}
      {isGalleryOpen && <Gallery contentType={contentType} />}
      {isDelCustomerModalOpen && <DeleteCustomerModal colors={colors} />}
      {isDelProductModalOpen && (
        <DeleteProductModal colors={colors} contentType={contentType} />
      )}
    </Box>
  );
};

export default DataTable;
