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
import { useEffect, useState } from "react";
import AddProductLinks from "../AddProductLinks";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleImageColorNameErrorState,
  toggleImageErrorState,
} from "../../../redux/features/stateSlice";
import { useFormik } from "formik";
import Colors from "../Colors";
import CameraInfo from "./CameraInfo";
import { cellFormSchema } from "../../../utils/validations";
import {
  resetCameraInfo,
  toggleMainCamInfoErrState,
  toggleSelfieCamInfoErrState,
} from "../../../redux/features/cameraInfoSlice";
import { addProduct } from "../../../redux/actions/productActions";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../../redux/features/alertSlice";
import { resetAddProduct } from "../../../redux/features/product/addSlice";
import { resetImageData } from "../../../redux/features/imageSlice";
import CustomAlert from "../../CustomAlert";
import Dots from "../../Dots";

const AddCellphone = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const [colorName, setColorName] = useState("");
  const [colorNameErr, setColorNameErr] = useState(false);
  const [colorNameExistsErr, setColorNameExistsErr] = useState(false);
  const [colorCode, setColorCode] = useState("");
  const [colorCodeErr, setColorCodeErr] = useState(false);
  const [qty, setQty] = useState(0);
  const [cellColors, setCellColors] = useState(
    localStorage.getItem("formCellColors")
      ? JSON.parse(localStorage.getItem("formCellColors"))
      : []
  );

  const { isDropImageAdded, dropImageData } = useSelector(
    (state) => state.image
  );
  const { mainCamInfo, selfieCamInfo } = useSelector(
    (state) => state.cameraInfo
  );
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.addProduct
  );

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (mainCamInfo.details.length === 0) {
      dispatch(toggleMainCamInfoErrState(true));
      return;
    }

    if (selfieCamInfo.details.length === 0) {
      dispatch(toggleSelfieCamInfoErrState(true));
      return;
    }

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
        route: "cellphones",
        productData: {
          ...values,
          mainCamInfo,
          selfieCamInfo,
          colors: cellColors,
          imageData: {
            image: dropImageData.image,
            imageName: dropImageData.name,
            imageColorName: dropImageData.colorName.toLowerCase(),
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
      name: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).name
        : "",
      brand: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).brand
        : "",
      year: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).year
        : "",
      network: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).network
        : "",
      dimensions: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).dimensions
        : "",
      weight: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).weight
        : "",
      sim: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).sim
        : "",
      displayType: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).displayType
        : "",
      displaySize: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).displaySize
        : "",
      resolution: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).resolution
        : "",
      protection: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).protection
        : "",
      os: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).os
        : "",
      chipset: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).chipset
        : "",
      cpu: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).cpu
        : "",
      gpu: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).gpu
        : "",
      cardSlot: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).cardSlot
        : "",
      internalMemory: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).internalMemory
        : "",
      ram: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).ram
        : "",
      mainCameraFeatures: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).mainCameraFeatures
        : "",
      mainCameraVideo: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).mainCameraVideo
        : "",
      selfieCameraFeatures: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).selfieCameraFeatures
        : "",
      selfieCameraVideo: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).selfieCameraVideo
        : "",
      battery: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).battery
        : "",
      price: localStorage.getItem("formCellInfo")
        ? JSON.parse(localStorage.getItem("formCellInfo")).price
        : "",
    },
    validationSchema: cellFormSchema,
    onSubmit,
  });

  useEffect(
    () => localStorage.setItem("formCellInfo", JSON.stringify(values)),
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

    if (cellColors.some((color) => color.colorName === colorName)) {
      setColorNameExistsErr(true);
      return;
    }

    setColorNameExistsErr(false);

    setCellColors((prev) => [
      ...prev,
      { name: colorName.toLowerCase(), code: colorCode, qty: +qty },
    ]);

    localStorage.setItem(
      "formCellColors",
      JSON.stringify([
        ...cellColors,
        { name: colorName.toLowerCase(), code: colorCode, qty: +qty },
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
        localStorage.removeItem("formCellInfo");
        localStorage.removeItem("formCellColors");
        localStorage.removeItem("cameraInfo");
        localStorage.removeItem("selfieCameraInfo");
        dispatch(resetImageData());
        dispatch(resetCameraInfo());
        setCellColors([]);
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
    <Box sx={{ margin: "20px auto" }} className="form-container">
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
          <AddProductLinks excludeLink="cellphone" />
          <ImageDrop contentType="cellphone" />
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
              width="100%"
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
                sx={{ width: "20%" }}
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
                sx={{ width: "20%" }}
              />
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
                sx={{ width: "20%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Network *"
                name="network"
                value={values.network}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.network && Boolean(errors.network)}
                helperText={touched.network && errors.network}
                sx={{ width: "20%" }}
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
              body
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
                label="Dimensions *"
                name="dimensions"
                value={values.dimensions}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dimensions && Boolean(errors.dimensions)}
                helperText={touched.dimensions && errors.dimensions}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Weight *"
                name="weight"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.weight && Boolean(errors.weight)}
                helperText={touched.weight && errors.weight}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Sim *"
                name="sim"
                value={values.sim}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.sim && Boolean(errors.sim)}
                helperText={touched.sim && errors.sim}
                sx={{ width: "25%" }}
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
              display
            </Divider>
            <Box
              mt="30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Type *"
                name="displayType"
                value={values.displayType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.displayType && Boolean(errors.displayType)}
                helperText={touched.displayType && errors.displayType}
                sx={{ width: "20%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                type="number"
                label="Size *"
                name="displaySize"
                value={values.displaySize}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.displaySize && Boolean(errors.displaySize)}
                helperText={touched.displaySize && errors.displaySize}
                sx={{ width: "20%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Resolution *"
                name="resolution"
                value={values.resolution}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.resolution && Boolean(errors.resolution)}
                helperText={touched.resolution && errors.resolution}
                sx={{ width: "20%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Protection *"
                name="protection"
                value={values.protection}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.protection && Boolean(errors.protection)}
                helperText={touched.protection && errors.protection}
                sx={{ width: "20%" }}
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
              platform
            </Divider>
            <Box
              mt="30px"
              display="flex"
              justifyContent="space-between"
              width="100%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="OS *"
                name="os"
                value={values.os}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.os && Boolean(errors.os)}
                helperText={touched.os && errors.os}
                sx={{ width: "20%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Chipset *"
                name="chipset"
                value={values.chipset}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.chipset && Boolean(errors.chipset)}
                helperText={touched.chipset && errors.chipset}
                sx={{ width: "20%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="CPU *"
                name="cpu"
                value={values.cpu}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cpu && Boolean(errors.cpu)}
                helperText={touched.cpu && errors.cpu}
                sx={{ width: "20%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="GPU *"
                name="gpu"
                value={values.gpu}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.gpu && Boolean(errors.gpu)}
                helperText={touched.gpu && errors.gpu}
                sx={{ width: "20%" }}
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
              memory
            </Divider>
            <Box
              mt="30px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Card Slot *"
                name="cardSlot"
                value={values.cardSlot}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.cardSlot && Boolean(errors.cardSlot)}
                helperText={touched.cardSlot && errors.cardSlot}
                sx={{ width: "30%" }}
              />
              <TextField
                type="number"
                color="secondary"
                variant="outlined"
                label="Internal *"
                name="internalMemory"
                value={values.internalMemory}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.internalMemory && Boolean(errors.internalMemory)}
                helperText={touched.internalMemory && errors.internalMemory}
                sx={{ width: "30%" }}
              />
              <TextField
                type="number"
                color="secondary"
                variant="outlined"
                label="RAM *"
                name="ram"
                value={values.ram}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.ram && Boolean(errors.ram)}
                helperText={touched.ram && errors.ram}
                sx={{ width: "30%" }}
              />
            </Box>
            <CameraInfo
              values={values}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              handleBlur={handleBlur}
            />
            <Divider flexItem sx={{ mt: "30px" }} />
            <Box
              mt="30px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Battery *"
                name="battery"
                value={values.battery}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.battery && Boolean(errors.battery)}
                helperText={touched.battery && errors.battery}
                sx={{ width: "45%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                type="number"
                label="Price *"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                sx={{ width: "45%" }}
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
              productColors={cellColors}
              setColors={setCellColors}
              storageName="formCellColors"
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
                p: "7px",
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

export default AddCellphone;
