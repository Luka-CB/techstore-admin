import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const DashboardReviews = ({ reviews }) => {
  return (
    <Box className="reviews-wrapper">
      <Box className="col1">
        <Typography variant="h3">Total Reviews</Typography>
        <Typography variant="h2" color="secondary">
          {reviews?.totalReviews}
        </Typography>
      </Box>
      <Divider />
      <Box className="col2">
        <Typography variant="h4">Total Products Reviewed</Typography>
        <span>.................</span>
        <Typography variant="h2" color="secondary">
          {reviews?.productsReviewed}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardReviews;
