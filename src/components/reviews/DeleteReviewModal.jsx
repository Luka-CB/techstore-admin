import { Box, Button, Paper, Typography, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSuccessAlert,
  toggleErrorAlert,
} from "../../redux/features/alertSlice";
import { toggleIsModalOpen } from "../../redux/features/stateSlice";
import CustomAlert from "../CustomAlert";
import Dots from "../Dots";
import { deleteReview, getReviews } from "../../redux/actions/reviewActions";
import {
  setDelReviewModalData,
  toggleDelReviewModal,
} from "../../redux/features/modals/delReviewModalSlice";
import { resetDeleteReview } from "../../redux/features/reviews/deleteReviewSlice";

const DeleteReviewModal = () => {
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isDelReviewModalOpen, data } = useSelector(
    (state) => state.delReviewModal
  );
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.deleteReview
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleDelReviewModal(false));
    dispatch(toggleIsModalOpen(false));
    dispatch(setDelReviewModalData({}));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetDeleteReview());
        dispatch(getReviews({}));
        handleCloseModal();
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteReview());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  const handleDeleteOrder = () => {
    dispatch(deleteReview({ reviewId: data.reviewId, userId: data.userId }));
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
        zIndex: 10002,
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
        {successAlert && isDelReviewModalOpen ? (
          <CustomAlert
            severity="success"
            value={successMsg}
            transitionState={successAlert}
          />
        ) : null}
        {errorAlert && isDelReviewModalOpen ? (
          <CustomAlert
            severity="error"
            value={errorMsg}
            transitionState={errorAlert}
          />
        ) : null}
        <Zoom in={isDelReviewModalOpen}>
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

export default DeleteReviewModal;
