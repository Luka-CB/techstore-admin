import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/tableContent/DataTable";
import { getCustomers } from "../redux/actions/customerActions";

const Customers = () => {
  const { searchQ, perPage } = useSelector((state) => state.filter);

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
    </div>
  );
};

export default Customers;
