import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  useTheme,
  Zoom,
} from "@mui/material";
import { colorPallets } from "../../../theme";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import CameraInfo from "./CameraInfo";
import { cellFormSchema } from "../../../utils/validations";
import {
  toggleMainCamInfoErrState,
  toggleSelfieCamInfoErrState,
} from "../../../redux/features/cameraInfoSlice";
import {
  getProducts,
  updateProductInfo,
} from "../../../redux/actions/productActions";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../../redux/features/alertSlice";
import CustomAlert from "../../CustomAlert";
import Dots from "../../Dots";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { resetUpdateProductInfo } from "../../../redux/features/product/updateInfoSlice";
import { useNavigate } from "react-router-dom";
import TooltipTitle from "../../TooltipTitle";

const UpdateCellphone = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { mainCamInfo, selfieCamInfo } = useSelector(
    (state) => state.cameraInfo
  );
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { updProductInfo } = useSelector((state) => state.updProductInfo);
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.updateProductInfo
  );

  const navigate = useNavigate();
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

    dispatch(
      updateProductInfo({
        route: "cellphones",
        info: {
          ...values,
          mainCamInfo,
          selfieCamInfo,
          _id: updProductInfo._id,
        },
      })
    );
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: updProductInfo ? updProductInfo.name : "",
        brand: updProductInfo ? updProductInfo.brand : "",
        year: updProductInfo ? updProductInfo.year : "",
        network: updProductInfo ? updProductInfo.network : "",
        dimensions: updProductInfo ? updProductInfo.dimensions : "",
        weight: updProductInfo ? updProductInfo.weight : "",
        sim: updProductInfo ? updProductInfo.sim : "",
        displayType: updProductInfo ? updProductInfo.displayType : "",
        displaySize: updProductInfo ? updProductInfo.displaySize : "",
        resolution: updProductInfo ? updProductInfo.resolution : "",
        protection: updProductInfo ? updProductInfo.protection : "",
        os: updProductInfo ? updProductInfo.os : "",
        chipset: updProductInfo ? updProductInfo.chipset : "",
        cpu: updProductInfo ? updProductInfo.cpu : "",
        gpu: updProductInfo ? updProductInfo.gpu : "",
        cardSlot: updProductInfo ? updProductInfo.cardSlot : "",
        internalMemory: updProductInfo ? updProductInfo.internalMemory : "",
        ram: updProductInfo ? updProductInfo.ram : "",
        mainCameraFeatures: updProductInfo
          ? updProductInfo.mainCameraFeatures
          : "",
        mainCameraVideo: updProductInfo ? updProductInfo.mainCameraVideo : "",
        selfieCameraFeatures: updProductInfo
          ? updProductInfo.selfieCameraFeatures
          : "",
        selfieCameraVideo: updProductInfo
          ? updProductInfo.selfieCameraVideo
          : "",
        battery: updProductInfo ? updProductInfo.battery : "",
        price: updProductInfo ? updProductInfo.price : "",
      },
      validationSchema: cellFormSchema,
      onSubmit,
    });

  useEffect(
    () =>
      localStorage.setItem(
        "updProductInfo",
        JSON.stringify({ ...values, _id: updProductInfo._id })
      ),
    [values, updProductInfo]
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetUpdateProductInfo());
        dispatch(getProducts({ route: "cellphones", searchQ, page, perPage }));
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetUpdateProductInfo());
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
        sx={{
          minHeight: "70vh",
          p: "15px 15px 30px 15px",
          position: "relative",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
          <Tooltip
            onClick={() => navigate(-1)}
            title={TooltipTitle("Go Back")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              fontSize: "2rem",
              transition: "0.2s ease-in-out",
              "&:hover": { color: colors.secondary[500] },
            }}
          >
            <IconButton>
              <ArrowCircleLeftIcon sx={{ fontSize: "2rem" }} />
            </IconButton>
          </Tooltip>
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
              {isLoading ? <Dots /> : "update product"}
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateCellphone;
