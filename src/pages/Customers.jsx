import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "../components/Head";
import CustomerReviewsModal from "../components/tableContent/customer/CustomerReviewsModal";
import OrderIdsModal from "../components/tableContent/customer/OrderIdsModal";
import DataTable from "../components/tableContent/DataTable";
import { getCustomers } from "../redux/actions/customerActions";

const Customers = () => {
  const { searchQ, perPage } = useSelector((state) => state.filter);
  const { isOrderIdsModalOpen } = useSelector((state) => state.orderIdsModal);
  const { isCustomerReviewsModalOpen } = useSelector(
    (state) => state.customerReviewsModal
  );

  const { customers, paginationData, isLoading } = useSelector(
    (state) => state.allCustomers
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomers({ searchQ, page: 1, perPage }));
  }, [dispatch]);

  return (
    <div>
      <DataTable
        content={customers}
        contentType="customer"
        totalProductCount={paginationData && paginationData.totalDocs}
        contentLoading={isLoading}
      />
      <Head
        title={`Customers | ${paginationData && paginationData.totalDocs}`}
      />

      {isOrderIdsModalOpen ? <OrderIdsModal /> : null}
      {isCustomerReviewsModalOpen ? <CustomerReviewsModal /> : null}
    </div>
  );
};

export default Customers;
