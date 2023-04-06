import React from "react";
import { Box, IconButton, Tooltip, Zoom } from "@mui/material";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import TooltipTitle from "./TooltipTitle";
import { useDispatch } from "react-redux";
import { getOrders } from "../redux/actions/orderActions";

const ShowMore = ({ colors, contentCount }) => {
  const dispatch = useDispatch();

  const handleShowMore = () => {
    dispatch(getOrders(contentCount + 2));
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
        <IconButton>
          <ExpandCircleDownIcon color="info" sx={{ fontSize: "2.5rem" }} />
        </IconButton>
      </Box>
    </Tooltip>
  );
};

export default ShowMore;
