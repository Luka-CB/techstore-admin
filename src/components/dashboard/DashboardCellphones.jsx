import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const DashboardCellphones = ({ cellphones }) => {
  return (
    <Box className="cellphones-wrapper">
      <Box className="col1">
        <Typography variant="h3">Total Cellphones</Typography>
        <Typography variant="h2" color="secondary">
          {cellphones?.totalCellphones}
        </Typography>
      </Box>
      <Divider />
      <Box className="col2">
        <Box className="brands">
          <Typography variant="h4">Brands</Typography>
          <div className="content">
            {cellphones?.brands?.map((brand) => (
              <Typography key={brand} variant="body1" color="secondary">
                {brand}
              </Typography>
            ))}
          </div>
        </Box>
        <Box className="years">
          <Typography variant="h4">Years</Typography>
          <div className="content">
            {cellphones?.years?.map((year) => (
              <Typography key={year} variant="body1" color="secondary">
                {year}
              </Typography>
            ))}
          </div>
        </Box>
        <Box className="types">
          <Typography variant="h4">Sizes</Typography>
          <div className="content">
            {cellphones?.sizes?.map((size) => (
              <Typography key={size} variant="body1" color="secondary">
                {size}
              </Typography>
            ))}
          </div>
        </Box>
        <Box className="storages">
          <Typography variant="h4">Storages</Typography>
          <div className="content">
            {cellphones?.storages?.map((storage) => (
              <Typography key={storage} variant="body1" color="secondary">
                {storage}
              </Typography>
            ))}
          </div>
        </Box>
        <Box className="storages">
          <Typography variant="h4">Rams</Typography>
          <div className="content">
            {cellphones?.rams?.map((ram) => (
              <Typography key={ram} variant="body1" color="secondary">
                {ram}
              </Typography>
            ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardCellphones;
