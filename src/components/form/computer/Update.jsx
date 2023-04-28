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
import { useFormik } from "formik";
import { colorPallets } from "../../../theme";
import { useEffect } from "react";
import { computerFormSchema } from "../../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import Dots from "../../Dots";
import CustomAlert from "../../CustomAlert";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import {
  getProducts,
  updateProductInfo,
} from "../../../redux/actions/productActions";
import { resetUpdateProductInfo } from "../../../redux/features/product/updateInfoSlice";
import TooltipTitle from "../../TooltipTitle";

const UpdateComputer = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { updProductInfo } = useSelector((state) => state.updProductInfo);
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.updateProductInfo
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    dispatch(
      updateProductInfo({
        route: "computers",
        info: { ...values, _id: updProductInfo._id },
      })
    );
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: updProductInfo ? updProductInfo.name : "",
        brand: updProductInfo ? updProductInfo.brand : "",
        type: updProductInfo ? updProductInfo.type : "",
        processor: updProductInfo ? updProductInfo.processor : "",
        os: updProductInfo ? updProductInfo.os : "",
        graphics: updProductInfo ? updProductInfo.graphics : "",
        screen: updProductInfo ? updProductInfo.screen : "",
        ram: updProductInfo ? updProductInfo.memory : "",
        storagetype: updProductInfo ? updProductInfo.storage?.type : "",
        interface: updProductInfo ? updProductInfo.storage?.interface : "",
        size: updProductInfo ? updProductInfo.storage?.size : "",
        camera: updProductInfo ? updProductInfo.camera : "",
        weight: updProductInfo ? updProductInfo.weight : "",
        price: updProductInfo ? updProductInfo.price : "",
      },
      validationSchema: computerFormSchema,
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
        dispatch(getProducts({ route: "computers", searchQ, page, perPage }));
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
    <Box sx={{ margin: "auto" }} className="form-container">
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
          <Tooltip
            onClick={() => navigate(-1)}
            title={TooltipTitle("Go Back")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
            sx={{
              alignSelf: "flex-end",
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
                label="Product Processor *"
                name="processor"
                value={values.processor}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.processor && Boolean(errors.processor)}
                helperText={touched.processor && errors.processor}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product OS *"
                name="os"
                value={values.os}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.os && Boolean(errors.os)}
                helperText={touched.os && errors.os}
                sx={{ width: "30%" }}
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
                label="Product Graphics *"
                name="graphics"
                value={values.graphics}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.graphics && Boolean(errors.graphics)}
                helperText={touched.graphics && errors.graphics}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Display"
                name="screen"
                value={values.screen}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.screen && Boolean(errors.screen)}
                helperText={touched.screen && errors.screen}
                sx={{ width: "30%" }}
              />
              <TextField
                type="number"
                color="secondary"
                variant="outlined"
                label="Product Ram *"
                name="ram"
                value={values.ram}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.ram && Boolean(errors.ram)}
                helperText={touched.ram && errors.ram}
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
              storage
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
                label="Storage Type *"
                name="storagetype"
                value={values.storagetype}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.storagetype && Boolean(errors.storagetype)}
                helperText={touched.storagetype && errors.storagetype}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="SSD Interface"
                name="interface"
                value={values.interface}
                onChange={handleChange}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Storage Size *"
                type="number"
                name="size"
                value={values.size}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.size && Boolean(errors.size)}
                helperText={touched.size && errors.size}
                sx={{ width: "25%" }}
              />
            </Box>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                mt: "30px",
              }}
            />
            <Box
              mt="50px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Camera *"
                name="camera"
                value={values.camera}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.camera && Boolean(errors.camera)}
                helperText={touched.camera && errors.camera}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Weight *"
                name="weight"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.weight && Boolean(errors.weight)}
                helperText={touched.weight && errors.weight}
                sx={{ width: "30%" }}
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
                sx={{ width: "30%" }}
              />
            </Box>

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{
                mt: "50px",
                alignSelf: "flex-end",
                width: "150px",
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

export default UpdateComputer;
