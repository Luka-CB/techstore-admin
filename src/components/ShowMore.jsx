import React from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import TooltipTitle from "./TooltipTitle";
import { useDispatch } from "react-redux";
import { getOrders } from "../redux/actions/orderActions";

const ShowMore = ({ colors, contentCount, isLoading, orderCount }) => {
  const dispatch = useDispatch();

  const handleShowMore = () => {
    dispatch(getOrders({ rppn: contentCount + 20, orderId: "", userId: "" }));
  };

  return (
    <Tooltip
      title={TooltipTitle("Show More")}
      sx={{
        transition: "0.2s ease-in-out",
        "&:hover": { color: colors.secondary[500] },
      }}
      placement="top"
      TransitionComponent={Zoom}
      arrow
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 60,
          backgroundColor: colors.light[900],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          cursor: "pointer",
          "&:hover": { backgroundColor: colors.light[800] },
        }}
        onClick={handleShowMore}
      >
        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            left: 0,
            pl: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          Showing:{" "}
          <span style={{ fontWeight: 200, fontSize: 20, marginLeft: 5 }}>
            {contentCount}{" "}
            <em style={{ fontSize: 15, marginRight: "3px" }}>of</em>{" "}
            <b>{orderCount}</b>
          </span>
        </Typography>
        <IconButton sx={{ position: "relative" }}>
          <ExpandCircleDownIcon color="info" sx={{ fontSize: "2.5rem" }} />
          {isLoading ? (
            <CircularProgress color="info" sx={{ position: "absolute" }} />
          ) : null}
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export default ShowMore;
