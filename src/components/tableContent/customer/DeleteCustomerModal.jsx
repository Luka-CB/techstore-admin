import { Box, Button, Paper, Typography, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCustomer,
  getCustomers,
} from "../../../redux/actions/customerActions";
import {
  toggleSuccessAlert,
  toggleErrorAlert,
} from "../../../redux/features/alertSlice";
import { resetDeleteCustomer } from "../../../redux/features/customers/deleteCustomerSlice";
import { toggleDelCustomerModal } from "../../../redux/features/modals/delCustomerModalSlice";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";
import CustomAlert from "../../CustomAlert";
import Dots from "../../Dots";

const DeleteCustomerModal = ({ colors }) => {
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isDelCustomerModalOpen, data } = useSelector(
    (state) => state.delCustomerModal
  );
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.deleteCustomer
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleDelCustomerModal(false));
    dispatch(toggleIsModalOpen(false));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetDeleteCustomer());
        dispatch(getCustomers({ searchQ, page, perPage }));
        handleCloseModal();
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteCustomer());
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
        <Zoom in={isDelCustomerModalOpen}>
          <Paper
            variant="outlined"
            sx={{
              width: 350,
              p: 2,
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Are You Sure? customer{" "}
              <span style={{ color: colors.danger[400], fontSize: "1.3rem" }}>
                "{data.username}"
              </span>{" "}
              will be deleted
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
                onClick={() => dispatch(deleteCustomer(data.customerId))}
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

export default DeleteCustomerModal;
