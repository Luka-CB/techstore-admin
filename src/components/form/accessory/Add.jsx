import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Divider,
  Fab,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { colorPallets } from "../../../theme";
import ImageDrop from "../../ImageDrop";
import AddIcon from "@mui/icons-material/Add";
import AddProductLinks from "../AddProductLinks";
import {
  toggleImageColorNameErrorState,
  toggleImageErrorState,
} from "../../../redux/features/stateSlice";
import Colors from "../Colors";
import { accessoryFormSchema } from "../../../utils/validations";
import { addProduct } from "../../../redux/actions/productActions";
import CustomAlert from "../../CustomAlert";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../../redux/features/alertSlice";
import { resetAddProduct } from "../../../redux/features/product/addSlice";
import { resetImageData } from "../../../redux/features/imageSlice";
import Dots from "../../Dots";

const AddAccessory = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const [colorName, setColorName] = useState("");
  const [colorNameErr, setColorNameErr] = useState(false);
  const [colorNameExistsErr, setColorNameExistsErr] = useState(false);
  const [colorCode, setColorCode] = useState("");
  const [colorCodeErr, setColorCodeErr] = useState(false);
  const [qty, setQty] = useState(0);
  const [accessoryColors, setAccessoryColors] = useState(
    localStorage.getItem("formAccessoryColors")
      ? JSON.parse(localStorage.getItem("formAccessoryColors"))
      : []
  );

  const { isDropImageAdded, dropImageData } = useSelector(
    (state) => state.image
  );
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.addProduct
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
        route: "accessories",
        productData: {
          ...values,
          colors: accessoryColors,
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
      name: localStorage.getItem("formAccessoryInfo")
        ? JSON.parse(localStorage.getItem("formAccessoryInfo")).name
        : "",
      brand: localStorage.getItem("formAccessoryInfo")
        ? JSON.parse(localStorage.getItem("formAccessoryInfo")).brand
        : "",
      category: localStorage.getItem("formAccessoryInfo")
        ? JSON.parse(localStorage.getItem("formAccessoryInfo")).category
        : "",
      price: localStorage.getItem("formAccessoryInfo")
        ? JSON.parse(localStorage.getItem("formAccessoryInfo")).price
        : "",
      description: localStorage.getItem("formAccessoryInfo")
        ? JSON.parse(localStorage.getItem("formAccessoryInfo")).description
        : "",
    },
    validationSchema: accessoryFormSchema,
    onSubmit,
  });

  useEffect(
    () => localStorage.setItem("formAccessoryInfo", JSON.stringify(values)),
    [values]
  );

  const addColorHandler = () => {
    if (!colorName) {
      setColorNameErr(true);
      return;
    }
    if (!colorCode) {
      setColorCodeErr(true);
      return;
    }

    if (accessoryColors.some((color) => color.name === colorName)) {
      setColorNameExistsErr(true);
      return;
    }

    setColorNameExistsErr(false);

    const modifiedColorName =
      colorName &&
      colorName
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");

    setAccessoryColors((prev) => [
      ...prev,
      { name: modifiedColorName, code: colorCode, qty: +qty },
    ]);

    localStorage.setItem(
      "formAccessoryColors",
      JSON.stringify([
        ...accessoryColors,
        { name: modifiedColorName, code: colorCode, qty: +qty },
      ])
    );

    setColorName("");
    setColorCode("");
    setQty(0);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetAddProduct());
        handleReset();
        localStorage.removeItem("formAccessoryInfo");
        localStorage.removeItem("formAccessoryColors");
        dispatch(resetImageData());
        setAccessoryColors([]);
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
    <Box sx={{ width: "70%", margin: "20px auto" }}>
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
          <AddProductLinks excludeLink="accessory" />
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
                label="Product Category *"
                name="category"
                value={values.category}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.category && Boolean(errors.category)}
                helperText={touched.category && errors.category}
                sx={{ width: "45%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                type="number"
                label="Product Price *"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                sx={{ width: "45%" }}
              />
            </Box>
            <Box mt="50px" display="flex" justifyContent="center" width="90%">
              <TextField
                color="secondary"
                variant="outlined"
                multiline
                rows={4}
                label="Product Description *"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
                sx={{ width: "90%" }}
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
              colors
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
                label="Color Name"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                onBlur={() => colorName && setColorNameErr(false)}
                error={colorNameErr || colorNameExistsErr}
                helperText={
                  colorNameErr
                    ? "Please provide value!"
                    : colorNameExistsErr
                    ? "Thos color already exists!"
                    : undefined
                }
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Color Code (HEX)"
                value={colorCode}
                onChange={(e) => setColorCode(e.target.value)}
                onBlur={() => colorCode && setColorCodeErr(false)}
                error={colorCodeErr}
                helperText={colorCodeErr && "Please provide value!"}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Quantity"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                sx={{ width: "25%" }}
              />
              <Fab
                color="secondary"
                aria-label="add"
                size="medium"
                onClick={addColorHandler}
              >
                <AddIcon />
              </Fab>
            </Box>
            <Colors
              productColors={accessoryColors}
              setColors={setAccessoryColors}
              storageName="formAccessoryColors"
            />

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{
                mt: "50px",
                alignSelf: "flex-end",
                width: 150,
                height: 40,
                fontSize: "0.8rem",
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

export default AddAccessory;
