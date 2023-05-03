import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const DashboardComputers = ({ computers }) => {
  return (
    <Box className="computers-wrapper">
      <Box className="col1">
        <Typography variant="h3">Total Computers</Typography>
        <Typography variant="h2" color="secondary">
          {computers?.totalComputers}
        </Typography>
      </Box>
      <Divider />
      <Box className="col2">
        <Box className="brands">
          <Typography variant="h4">Brands</Typography>
          <div className="content">
            {computers?.brands?.map((computer) => (
              <Typography key={computer} variant="body1" color="secondary">
                {computer}
              </Typography>
            ))}
          </div>
        </Box>
        <Box className="types">
          <Typography variant="h4">Types</Typography>
          <div className="content">
            {computers?.types?.map((type) => (
              <Typography key={type} variant="body1" color="secondary">
                {type}
              </Typography>
            ))}
          </div>
        </Box>
        <Box className="types">
          <Typography variant="h4">Rams</Typography>
          <div className="content">
            {computers?.rams?.map((ram) => (
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

export default DashboardComputers;
