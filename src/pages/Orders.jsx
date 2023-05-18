import React, { useEffect } from "react";
import DataTable from "../components/tableContent/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/actions/orderActions";
import Items from "../components/tableContent/order/Items";
import { useSearchParams } from "react-router-dom";
import DeleteOrderModal from "../components/tableContent/order/DeleteOrderModal";
import Head from "../components/Head";

const Orders = () => {
  const { isLoading, orders, count } = useSelector((state) => state.getOrders);
  const { isItemsModalOpen } = useSelector((state) => state.orderItems);
  const { isDelOrderModalOpen } = useSelector((state) => state.delOrderModal);

  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  useEffect(() => {
    if (sortBy) {
      dispatch(getOrders({ rppn: 0, orderId: "", userId: "", sortBy: sortBy }));
    } else {
      dispatch(getOrders({}));
    }
  }, [sortBy, dispatch]);

  return (
    <div>
      <DataTable
        content={orders}
        count={count}
        contentType="order"
        contentLoading={isLoading}
      />
      <Head title={`Orders | ${count}`} />

      {isItemsModalOpen ? <Items /> : null}
      {isDelOrderModalOpen ? <DeleteOrderModal /> : null}
    </div>
  );
};

export default Orders;
