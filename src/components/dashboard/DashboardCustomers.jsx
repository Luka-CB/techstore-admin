import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const DashboardCustomers = ({ customers }) => {
  return (
    <Box className="customers-wrapper">
      <Box className="col1">
        <Typography variant="h3">Total Customers</Typography>
        <Typography variant="h2" color="secondary">
          {customers?.totalCustomers}
        </Typography>
      </Box>
      <Divider />
      <Box className="col2">
        <Typography variant="h4">Registerd with Google</Typography>
        <span>.................</span>
        <Typography variant="h2" color="secondary">
          {customers?.withGoogle}
        </Typography>
      </Box>
      <Box className="col3">
        <Typography variant="h4">Registerd with Facebook</Typography>
        <span>.................</span>
        <Typography variant="h2" color="secondary">
          {customers?.withFacebook}
        </Typography>
      </Box>
      <Box className="col4">
        <Typography variant="h4">Registered with Techstore</Typography>
        <span>.................</span>
        <Typography variant="h2" color="secondary">
          {customers?.withLocal}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardCustomers;
