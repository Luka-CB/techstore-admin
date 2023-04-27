import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const DashboardTvs = ({ tvs }) => {
  return (
    <Box className="tvs-wrapper">
      <Box className="col1">
        <Typography variant="h3">Total Tvs</Typography>
        <Typography variant="h2" color="secondary">
          {tvs?.totalTvs}
        </Typography>
      </Box>
      <Divider />
      <Box className="col2">
        <Box className="brands">
          <Typography variant="h4">Brands</Typography>
          <div className="content">
            {tvs?.brands?.map((brand) => (
              <Typography key={brand} variant="body1" color="secondary">
                {brand}
              </Typography>
            ))}
          </div>
        </Box>
        <Box className="types">
          <Typography variant="h4">Types</Typography>
          <div className="content">
            {tvs?.types?.map((type) => (
              <Typography key={type} variant="body1" color="secondary">
                {type}
              </Typography>
            ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardTvs;
