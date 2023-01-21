import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import { getProducts } from "../redux/actions/productActions";

const TVs = () => {
  const { products, isLoading } = useSelector((state) => state.getProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts({ route: "tvs" }));
  }, [dispatch]);

  return (
    <div>
      <DataTable
        content={products}
        contentLoading={isLoading}
        contentType="tv"
      />
    </div>
  );
};

export default TVs;
