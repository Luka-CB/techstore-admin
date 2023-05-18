import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "../components/Head";
import DataTable from "../components/tableContent/DataTable";
import { getProducts } from "../redux/actions/productActions";

const CellPhones = () => {
  const { page, perPage } = useSelector((state) => state.filter);

  const { products, paginationData, isLoading } = useSelector(
    (state) => state.getProducts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ route: "cellphones", page: 1, perPage }));
  }, [dispatch]);

  return (
    <div>
      <DataTable
        content={products && products}
        contentType="cellphone"
        totalProductCount={paginationData && paginationData.totalDocs}
        contentLoading={isLoading}
      />
      <Head
        title={`Cell Phones | ${paginationData && paginationData.totalDocs}`}
      />
    </div>
  );
};

export default CellPhones;
