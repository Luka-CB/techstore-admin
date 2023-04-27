import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";
import { getProducts } from "../../redux/actions/productActions";
import { setSearchQ } from "../../redux/features/filterSlice";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { getCustomers } from "../../redux/actions/customerActions";

const Search = ({ contentType }) => {
  const { page, perPage, searchQ } = useSelector((state) => state.filter);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  useEffect(() => {
    let timeOut;
    if (searchQ) {
      timeOut = setTimeout(() => {
        if (contentType === "customer") {
          dispatch(getCustomers({ searchQ, page: 1, perPage }));
        } else {
          dispatch(getProducts({ route, searchQ, page: 1, perPage }));
        }
        navigate({ pathname });
      }, 500);
    }

    return () => clearTimeout(timeOut);
  }, [searchQ, dispatch]);

  return (
    <Box
      width={300}
      position="relative"
      sx={{ display: "flex", alignItems: "flex-end" }}
      className="search"
    >
      <PageviewOutlinedIcon
        color="secondary"
        sx={{ mr: 1, my: 0.5, fontSize: "1.3rem" }}
      />
      <TextField
        id="input-with-sx"
        label={`Search ${contentType}s`}
        variant="standard"
        color="secondary"
        fullWidth
        value={searchQ}
        onChange={(e) => dispatch(setSearchQ(e.target.value))}
        onBlur={() => {
          if (!searchQ) {
            if (contentType === "customer") {
              dispatch(getCustomers({ searchQ: "", page, perPage }));
            } else {
              dispatch(getProducts({ route, searchQ: "", page, perPage }));
            }
            navigate({ pathname, search: `?page=${page}` });
          }
        }}
      />
      {searchQ && (
        <Tooltip>
          <IconButton
            color="secondary"
            sx={{ position: "absolute", right: 0 }}
            onClick={() => {
              dispatch(setSearchQ(""));
              if (contentType === "customer") {
                dispatch(getCustomers({ searchQ: "", page, perPage }));
              } else {
                dispatch(getProducts({ route, searchQ: "", page, perPage }));
              }
              navigate({ pathname, search: `?page=${page}` });
            }}
          >
            <CloseIcon sx={{ fontSize: "0.8rem" }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default Search;
