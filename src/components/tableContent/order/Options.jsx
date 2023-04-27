import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from "@mui/material";
import { getOrders } from "../../../redux/actions/orderActions";
import { toggleOrderOptions } from "../../../redux/features/stateSlice";

const optionValues = ["all", "paid", "unpaid", "delivered", "undelivered"];

const Options = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  const handleOptionValue = (value) => {
    navigate({
      pathname: "/orders",
      search: `?sortBy=${value}`,
    });
    if (value === "all") {
      dispatch(getOrders({ rppn: 0, orderId: "", userId: "", sortBy: "" }));
      navigate("/orders");
    } else {
      dispatch(getOrders({ rppn: 0, orderId: "", userId: "", sortBy: value }));
    }
    dispatch(toggleOrderOptions(false));
  };

  return (
    <Box
      sx={{ position: "absolute", top: 0, right: 0, zIndex: 10 }}
      onClick={(e) => e.stopPropagation()}
    >
      <Paper variant="outlined" sx={{ width: 150 }}>
        <List>
          {optionValues.map((value) => (
            <ListItem key={value} disablePadding>
              <ListItemButton
                selected={sortBy === value}
                onClick={() => handleOptionValue(value)}
              >
                <ListItemText primary={value} sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Options;
