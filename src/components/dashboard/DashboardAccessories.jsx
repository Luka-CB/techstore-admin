import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const DashboardAccessories = ({ accessories }) => {
  return (
    <Box className="accessories-wrapper">
      <Box className="col1">
        <Typography variant="h3">Total Accessories</Typography>
        <Typography variant="h2" color="secondary">
          {accessories?.totalAccessories}
        </Typography>
      </Box>
      <Divider />
      <Box className="col2">
        <Box className="brands">
          <Typography variant="h4">Brands</Typography>
          <div className="content">
            {accessories?.brands?.map((brand) => (
              <Typography key={brand} variant="body1" color="secondary">
                {brand}
              </Typography>
            ))}
          </div>
        </Box>
        <Box className="categories">
          <Typography variant="h4">Categories</Typography>
          <div className="content">
            {accessories?.categories?.map((category) => (
              <Typography key={category} variant="body1" color="secondary">
                {category}
              </Typography>
            ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardAccessories;
