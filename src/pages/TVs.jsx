import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "../components/Head";
import DataTable from "../components/tableContent/DataTable";
import { getProducts } from "../redux/actions/productActions";

const TVs = () => {
  const { page, perPage } = useSelector((state) => state.filter);

  const { products, paginationData, isLoading } = useSelector(
    (state) => state.getProducts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ route: "tvs", page, perPage }));
  }, [dispatch]);

  return (
    <div>
      <DataTable
        content={products && products}
        totalProductCount={paginationData && paginationData.totalDocs}
        contentLoading={isLoading}
        contentType="tv"
      />
      <Head title={`TVs | ${paginationData && paginationData.totalDocs}`} />
    </div>
  );
};

export default TVs;
