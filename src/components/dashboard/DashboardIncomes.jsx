import React from "react";
import { Box, Divider, Typography } from "@mui/material";

const DashboardIncomes = ({ incomes }) => {
  return (
    <Box className="incomes-wrapper">
      <Box className="col1">
        <Typography variant="h3">Total Income</Typography>
        <Typography variant="h5" color="secondary">
          ${incomes?.totalIncome?.toFixed(2)}
        </Typography>
      </Box>
      <Divider />
      <Box className="col2">
        <div className="last">
          <Typography variant="h4">Last Payment</Typography>
          <Typography variant="h6" color="secondary">
            <em>{incomes?.lastPayment}</em>
          </Typography>
        </div>
        <div className="info">
          <div className="payer">
            <Typography variant="h5">Payer</Typography>
            <span>.................</span>
            <Typography variant="h6" color="secondary">
              {incomes?.payer}
            </Typography>
          </div>
          <div className="amount">
            <Typography variant="h5">Amount</Typography>
            <span>.................</span>
            <Typography variant="h6" color="secondary">
              ${incomes?.amount?.toFixed(2)}
            </Typography>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default DashboardIncomes;
