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
import { tvFormSchema } from "../../../utils/validations";
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

const UpdateTv = () => {
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
        route: "tvs",
        info: { ...values, _id: updProductInfo._id },
      })
    );
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: updProductInfo ? updProductInfo.name : "",
        brand: updProductInfo ? updProductInfo.brand : "",
        year: updProductInfo ? updProductInfo.year : "",
        type: updProductInfo ? updProductInfo.type : "",
        resolution: updProductInfo ? updProductInfo.resolution : "",
      },
      validationSchema: tvFormSchema,
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
        dispatch(getProducts({ route: "tvs", searchQ, page, perPage }));
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

export default UpdateTv;
