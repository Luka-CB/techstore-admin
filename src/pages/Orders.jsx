import React, { useEffect } from "react";
import DataTable from "../components/tableContent/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/actions/orderActions";

const Orders = () => {
  const { isLoading, orders } = useSelector((state) => state.getOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <div>
      <DataTable
        content={orders}
        contentType="order"
        contentLoading={isLoading}
      />
    </div>
  );
};

export default Orders;
