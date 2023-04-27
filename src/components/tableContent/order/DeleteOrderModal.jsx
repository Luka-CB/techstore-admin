import { Box, Button, Paper, Typography, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getOrders } from "../../../redux/actions/orderActions";
import {
  toggleSuccessAlert,
  toggleErrorAlert,
} from "../../../redux/features/alertSlice";
import {
  setDelOrderModalData,
  toggleDelOrderModal,
} from "../../../redux/features/modals/delOrderModalSlice";
import { resetDeleteOrder } from "../../../redux/features/orders/deleteOrderSlice";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";
import CustomAlert from "../../CustomAlert";
import Dots from "../../Dots";

const DeleteOrderModal = () => {
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isDelOrderModalOpen, data } = useSelector(
    (state) => state.delOrderModal
  );
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.deleteOrder
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleDelOrderModal(false));
    dispatch(toggleIsModalOpen(false));
    dispatch(setDelOrderModalData({}));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetDeleteOrder());
        dispatch(getOrders({ rppn: 0, orderId: "", userId: "", sortBy: "" }));
        handleCloseModal();
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteOrder());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  const handleDeleteOrder = () => {
    dispatch(deleteOrder({ orderId: data.orderId, userId: data.userId }));
  };

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
        {successAlert && isDelOrderModalOpen ? (
          <CustomAlert
            severity="success"
            value={successMsg}
            transitionState={successAlert}
          />
        ) : null}
        {errorAlert && isDelOrderModalOpen ? (
          <CustomAlert
            severity="error"
            value={errorMsg}
            transitionState={errorAlert}
          />
        ) : null}
        <Zoom in={isDelOrderModalOpen}>
          <Paper
            variant="outlined"
            sx={{
              width: 350,
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Are You Sure? customer
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
                onClick={handleDeleteOrder}
              >
                {isLoading ? <Dots color="#20e01d" /> : "yes"}
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

export default DeleteOrderModal;
