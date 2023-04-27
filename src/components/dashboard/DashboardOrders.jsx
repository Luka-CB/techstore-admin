import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const DashboardOrders = ({ orders }) => {
  return (
    <Box className="orders-wrapper">
      <Box className="col1">
        <Typography variant="h3">Total Orders</Typography>
        <Typography variant="h2" color="secondary">
          {orders?.totalOrders}
        </Typography>
      </Box>
      <Divider />
      <Box className="col2">
        <Typography variant="h4">Paid Orders</Typography>
        <span>.................</span>
        <Typography variant="h2" color="secondary">
          {orders?.paidOrders}
        </Typography>
      </Box>
      <Box className="col3">
        <Typography variant="h4">Unpaid Orders</Typography>
        <span>.................</span>
        <Typography variant="h2" color="secondary">
          {orders?.unpaidOrders}
        </Typography>
      </Box>
      <Box className="col4">
        <Typography variant="h4">Delivered Orders</Typography>
        <span>.................</span>
        <Typography variant="h2" color="secondary">
          {orders?.deliveredOrders}
        </Typography>
      </Box>
      <Box className="col4">
        <Typography variant="h4">undelivered Orders</Typography>
        <span>.................</span>
        <Typography variant="h2" color="secondary">
          {orders?.undeliveredOrders}
        </Typography>
      </Box>
    </Box>
  );
};

export default DashboardOrders;
