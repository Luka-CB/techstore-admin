import {
  Box,
  Button,
  Divider,
  Fab,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { colorPallets } from "../../../theme";
import ImageDrop from "../../ImageDrop";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { tvFormSchema } from "../../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleImageColorNameErrorState,
  toggleImageErrorState,
} from "../../../redux/features/stateSlice";
import AddProductLinks from "../AddProductLinks";
import Sizes from "../Sizes";
import { resetAddProduct } from "../../../redux/features/product/addSlice";
import Dots from "../../Dots";
import CustomAlert from "../../CustomAlert";
import { resetImageData } from "../../../redux/features/imageSlice";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../../redux/features/alertSlice";
import { addProduct } from "../../../redux/actions/productActions";

const AddTv = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { isDropImageAdded, dropImageData } = useSelector(
    (state) => state.image
  );
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.addProduct
  );

  const [size, setSize] = useState("");
  const [sizeErr, setSizeErr] = useState(false);
  const [sizeExistsErr, setSizeExistsErr] = useState(false);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState("");
  const [priceErr, setPriceErr] = useState(false);
  const [sizes, setSizes] = useState(
    localStorage.getItem("formTvSizes")
      ? JSON.parse(localStorage.getItem("formTvSizes"))
      : []
  );

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!isDropImageAdded) {
      dispatch(toggleImageErrorState(true));
      return;
    }

    if (!dropImageData?.colorName) {
      dispatch(toggleImageColorNameErrorState(true));
      return;
    }

    dispatch(
      addProduct({
        route: "tvs",
        productData: {
          ...values,
          sizes,
          imageData: {
            image: dropImageData.image,
            imageName: dropImageData.name,
            imageColorName: dropImageData.colorName,
          },
        },
      })
    );
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: localStorage.getItem("formTvInfo")
        ? JSON.parse(localStorage.getItem("formTvInfo")).name
        : "",
      brand: localStorage.getItem("formTvInfo")
        ? JSON.parse(localStorage.getItem("formTvInfo")).brand
        : "",
      year: localStorage.getItem("formTvInfo")
        ? JSON.parse(localStorage.getItem("formTvInfo")).year
        : "",
      type: localStorage.getItem("formTvInfo")
        ? JSON.parse(localStorage.getItem("formTvInfo")).type
        : "",
      resolution: localStorage.getItem("formTvInfo")
        ? JSON.parse(localStorage.getItem("formTvInfo")).resolution
        : "",
    },
    validationSchema: tvFormSchema,
    onSubmit,
  });

  useEffect(
    () => localStorage.setItem("formTvInfo", JSON.stringify(values)),
    [values]
  );

  const addSizeHandler = () => {
    if (!size) {
      setSizeErr(true);
      return;
    }
    if (!price) {
      setPriceErr(true);
      return;
    }

    if (sizes.some((s) => s.size === size)) {
      setSizeExistsErr(true);
      return;
    }

    setSizeExistsErr(false);

    setSizes((prev) => [...prev, { size: +size, qty: +qty, price: +price }]);

    localStorage.setItem(
      "formTvSizes",
      JSON.stringify([...sizes, { size: +size, qty: +qty, price: +price }])
    );

    setSize("");
    setQty(0);
    setPrice("");
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetAddProduct());
        handleReset();
        localStorage.removeItem("formTvInfo");
        localStorage.removeItem("formTvSizes");
        dispatch(resetImageData());
        setSizes([]);
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetAddProduct());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  return (
    <Box sx={{ width: "70%", margin: "auto" }}>
      {successAlert && (
        <CustomAlert
          severity="success"
          transitionState={successAlert}
          value={successMsg}
        />
      )}
      {errorAlert && (
        <CustomAlert
          severity="error"
          transitionState={errorAlert}
          value={errorMsg}
        />
      )}
      <Paper
        variant="outlined"
        sx={{ minHeight: "70vh", p: "15px 15px 30px 15px" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <AddProductLinks excludeLink="tv" />
          <ImageDrop />
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              mt="50px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Name *"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ width: "45%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Brand *"
                name="brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.brand && Boolean(errors.brand)}
                helperText={touched.brand && errors.brand}
                sx={{ width: "45%" }}
              />
            </Box>
            <Box
              mt="50px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                type="number"
                label="Product Year *"
                name="year"
                value={values.year}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.year && Boolean(errors.year)}
                helperText={touched.year && errors.year}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Type *"
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.type && Boolean(errors.type)}
                helperText={touched.type && errors.type}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Resolution *"
                name="resolution"
                value={values.resolution}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.resolution && Boolean(errors.resolution)}
                helperText={touched.resolution && errors.resolution}
                sx={{ width: "30%" }}
              />
            </Box>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                mt: "30px",
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "5px",
                color:
                  theme.palette.mode === "dark"
                    ? colors.light[800]
                    : colors.light[400],
              }}
            >
              Sizes
            </Divider>
            <Box
              mt="30px"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Size"
                type="number"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                onBlur={() => size && setSizeErr(false)}
                error={sizeErr || sizeExistsErr}
                helperText={
                  sizeErr
                    ? "Please provide value!"
                    : sizeExistsErr
                    ? "This size already exists!"
                    : undefined
                }
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Quantity"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                onBlur={() => price && setPriceErr(false)}
                error={priceErr}
                helperText={priceErr && "Please provide value!"}
                sx={{ width: "25%" }}
              />
              <Fab
                color="secondary"
                aria-label="add"
                size="medium"
                onClick={addSizeHandler}
              >
                <AddIcon />
              </Fab>
            </Box>
            <Sizes sizes={sizes} setSizes={setSizes} />
            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{
                mt: "50px",
                alignSelf: "flex-end",
                width: "150px",
                height: "40px",
                fontSize: "0.8rem",
                position: "relative",
              }}
              disabled={isLoading}
            >
              {isLoading ? <Dots /> : "add product"}
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddTv;
