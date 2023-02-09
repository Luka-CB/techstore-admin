import { Box, Button, Paper, Typography, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/actions/productActions";
import {
  toggleSuccessAlert,
  toggleErrorAlert,
} from "../../../redux/features/alertSlice";
import { toggleDelProductModal } from "../../../redux/features/modals/delProductModalSlice";
import { resetDeleteProduct } from "../../../redux/features/product/deleteSlice";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";
import CustomAlert from "../../CustomAlert";
import Dots from "../../Dots";

const DeleteProductModal = ({ colors, contentType }) => {
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isDelProductModalOpen, data } = useSelector(
    (state) => state.delProductModal
  );
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.deleteProduct
  );

  const dispatch = useDispatch();

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  const handleCloseModal = () => {
    dispatch(toggleDelProductModal(false));
    dispatch(toggleIsModalOpen(false));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetDeleteProduct());
        dispatch(getProducts({ route, searchQ, page, perPage }));
        handleCloseModal();
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteProduct());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={handleCloseModal}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {successAlert && (
          <CustomAlert
            severity="success"
            value={successMsg}
            transitionState={successAlert}
          />
        )}
        {errorAlert && (
          <CustomAlert
            severity="error"
            value={errorMsg}
            transitionState={errorAlert}
          />
        )}
        <Zoom in={isDelProductModalOpen}>
          <Paper
            variant="outlined"
            sx={{
              width: 350,
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Are You Sure?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 5,
              }}
            >
              <Button
                variant="outlined"
                type="button"
                color="success"
                disabled={isLoading}
                sx={{
                  width: 120,
                  height: 30,
                  fontSize: "0.8rem",
                }}
                onClick={() =>
                  dispatch(
                    deleteProduct({
                      route,
                      productId: data.productId,
                    })
                  )
                }
              >
                {isLoading ? <Dots color={colors.success[500]} /> : "yes"}
              </Button>
              <Button
                variant="outlined"
                type="button"
                color="warning"
                disabled={isLoading}
                sx={{
                  width: 120,
                  height: 30,
                  fontSize: "0.8rem",
                }}
                onClick={handleCloseModal}
              >
                no
              </Button>
            </Box>
          </Paper>
        </Zoom>
      </div>
    </Box>
  );
};

export default DeleteProductModal;
