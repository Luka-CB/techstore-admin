import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/tableContent/DataTable";
import { getProducts } from "../redux/actions/productActions";

const Computers = () => {
  const { perPage } = useSelector((state) => state.filter);

  const { products, paginationData, isLoading } = useSelector(
    (state) => state.getProducts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ route: "computers", page: 1, perPage }));
  }, [dispatch]);

  return (
    <div>
      <DataTable
        content={products && products}
        contentType="computer"
        totalProductCount={paginationData && paginationData.totalDocs}
        contentLoading={isLoading}
      />
    </div>
  );
};

export default Computers;
