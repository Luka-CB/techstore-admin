import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Paper } from "@mui/material";
import DashboardAccessories from "../components/dashboard/DashboardAccessories";
import DashboardCellphones from "../components/dashboard/DashboardCellphones";
import DashboardComputers from "../components/dashboard/DashboardComputers";
import DashboardCustomers from "../components/dashboard/DashboardCustomers";
import DashboardIncomes from "../components/dashboard/DashboardIncomes";
import DashboardOrders from "../components/dashboard/DashboardOrders";
import DashboardReviews from "../components/dashboard/DashboardReviews";
import DashboardTvs from "../components/dashboard/DashboardTvs";
import { getDashboardInfo } from "../redux/actions/dashboardActions";
import Head from "../components/Head";

const Spinner = () => {
  return (
    <Box className="spinner">
      <CircularProgress size={50} color="secondary" />
    </Box>
  );
};

const Dashboard = () => {
  const { isLoading, info } = useSelector((state) => state.dashboardInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardInfo());
  }, [dispatch]);

  return (
    <Box className="dashboard-container">
      <Head title="Techstore Admin | Welcome" />
      <Paper variant="outlined" className="customers">
        {isLoading ? (
          <Spinner />
        ) : (
          <DashboardCustomers customers={info.customers} />
        )}
      </Paper>
      <Paper variant="outlined" className="tvs">
        {isLoading ? <Spinner /> : <DashboardTvs tvs={info.tvs} />}
      </Paper>
      <Paper variant="outlined" className="computers">
        {isLoading ? (
          <Spinner />
        ) : (
          <DashboardComputers computers={info.computers} />
        )}
      </Paper>
      <Paper variant="outlined" className="cellphones">
        {isLoading ? (
          <Spinner />
        ) : (
          <DashboardCellphones cellphones={info.cellphones} />
        )}
      </Paper>
      <Paper variant="outlined" className="accessories">
        {isLoading ? (
          <Spinner />
        ) : (
          <DashboardAccessories accessories={info.accessories} />
        )}
      </Paper>
      <Paper variant="outlined" className="orders">
        {isLoading ? <Spinner /> : <DashboardOrders orders={info.orders} />}
      </Paper>
      <Paper variant="outlined" className="reviews">
        {isLoading ? <Spinner /> : <DashboardReviews reviews={info.reviews} />}
      </Paper>
      <Paper variant="outlined" className="incomes">
        {isLoading ? <Spinner /> : <DashboardIncomes incomes={info.incomes} />}
      </Paper>
    </Box>
  );
};

export default Dashboard;
