import {
  Box,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { getProducts } from "../../redux/actions/productActions";
import { setPage, setPerPage } from "../../redux/features/filterSlice";
import { getCustomers } from "../../redux/actions/customerActions";
import TooltipTitle from "../TooltipTitle";

const perPageOptions = [5, 10, 15, 20, 25];

const CustomPagination = ({ colors, contentType }) => {
  const { paginationData: productPaginationData } = useSelector(
    (state) => state.getProducts
  );
  const { paginationData: customerPaginationData } = useSelector(
    (state) => state.allCustomers
  );
  const { page, perPage, searchQ } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const queryPage = searchParams.get("page");

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  useEffect(() => {
    if (queryPage) {
      dispatch(setPage(queryPage));
    }
  }, [queryPage]);

  useEffect(() => {
    if (page || perPage) {
      if (contentType === "customer") {
        dispatch(getCustomers({ searchQ, page, perPage }));
      } else {
        dispatch(getProducts({ route, searchQ, page, perPage }));
      }
    }
  }, [page, perPage]);

  const paginationData =
    contentType === "customer" ? customerPaginationData : productPaginationData;

  const rowCount = paginationData?.page * paginationData?.limit;
  const counter = `${paginationData?.pagingCounter} - ${
    rowCount > paginationData?.totalDocs ? paginationData?.totalDocs : rowCount
  }`;

  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      sx={{ p: 2 }}
    >
      <Box sx={{ mr: 5, display: "flex", alignItems: "center" }}>
        <Typography mr={1}>Rows per page:</Typography>
        <TextField
          select
          color="secondary"
          variant="outlined"
          value={perPage}
          onChange={(e) => {
            dispatch(setPerPage(e.target.value));
            localStorage.setItem("perPage", JSON.stringify(e.target.value));
            dispatch(setPage(1));
            navigate({
              pathname,
            });
          }}
        >
          {perPageOptions.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-around"
        sx={{ width: 250 }}
      >
        <Tooltip title={TooltipTitle("First Page")}>
          <span>
            <IconButton
              sx={{ "&:hover": { color: colors.secondary[500] } }}
              onClick={() => {
                dispatch(setPage(1));
                navigate({
                  pathname,
                  search: `?page=${1}`,
                });
              }}
              disabled={!paginationData?.prevPage}
            >
              <FirstPageIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={TooltipTitle("Previous Page")}>
          <span>
            <IconButton
              sx={{ "&:hover": { color: colors.secondary[500] } }}
              onClick={() => {
                dispatch(setPage(paginationData.prevPage));
                navigate({
                  pathname,
                  search: `?page=${paginationData.prevPage}`,
                });
              }}
              disabled={!paginationData?.prevPage}
            >
              <KeyboardArrowLeftIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </span>
        </Tooltip>
        <Box display="flex" alignItems="center">
          <Typography variant="h6" color="secondary">
            {counter}
          </Typography>
          <Typography sx={{ margin: "0 5px" }}>of</Typography>
          <Typography variant="h6" color="secondary">
            {paginationData?.totalDocs}
          </Typography>
        </Box>
        <Tooltip title={TooltipTitle("Next Page")}>
          <span>
            <IconButton
              sx={{ "&:hover": { color: colors.secondary[500] } }}
              onClick={() => {
                dispatch(setPage(paginationData.nextPage));
                navigate({
                  pathname,
                  search: `?page=${paginationData.nextPage}`,
                });
              }}
              disabled={!paginationData?.nextPage}
            >
              <KeyboardArrowRightIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title={TooltipTitle("Last Page")}>
          <span>
            <IconButton
              sx={{ "&:hover": { color: colors.secondary[500] } }}
              onClick={() => {
                dispatch(setPage(paginationData.totalPages));
                navigate({
                  pathname,
                  search: `?page=${paginationData.totalPages}`,
                });
              }}
              disabled={!paginationData?.nextPage}
            >
              <LastPageIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </span>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default CustomPagination;
