import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/tableContent/DataTable";
import { getProducts } from "../redux/actions/productActions";

const Accessories = () => {
  const { page, perPage } = useSelector((state) => state.filter);

  const { products, paginationData, isLoading } = useSelector(
    (state) => state.getProducts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ route: "accessories", page: 1, perPage }));
  }, [dispatch]);

  return (
    <div>
      <DataTable
        content={products && products}
        contentType="accessory"
        totalProductCount={paginationData && paginationData.totalDocs}
        contentLoading={isLoading}
      />
    </div>
  );
};

export default Accessories;
