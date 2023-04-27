import {
  Box,
  Button,
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
import { accessoryFormSchema } from "../../../utils/validations";
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

const UpdateAccessory = () => {
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
        route: "accessories",
        info: { ...values, _id: updProductInfo._id },
      })
    );
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: updProductInfo ? updProductInfo.name : "",
        brand: updProductInfo ? updProductInfo.brand : "",
        category: updProductInfo ? updProductInfo.category : "",
        price: updProductInfo ? updProductInfo.price : "",
        description: updProductInfo ? updProductInfo.description : "",
      },
      validationSchema: accessoryFormSchema,
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
        dispatch(getProducts({ route: "accessories", searchQ, page, perPage }));
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
        sx={{
          minHeight: "70vh",
          p: "15px 15px 30px 15px",
          position: "relative",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mt={6}>
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
              {isLoading ? <Dots /> : "update product"}
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default UpdateAccessory;
