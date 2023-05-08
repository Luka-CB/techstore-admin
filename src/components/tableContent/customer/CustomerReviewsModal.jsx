import React, { useEffect } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Paper,
  Slide,
  Typography,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";
import { toggleCustomerReviewsModal } from "../../../redux/features/modals/customerReviewsModalSlice";
import { getReviewsByUserId } from "../../../redux/actions/reviewActions";
import { resetGetReviewsByUserId } from "../../../redux/features/reviews/getReviewsByUserIdSlice";
import ReviewCard from "../../reviews/ReviewCard";

const CustomerReviewsModal = () => {
  const { isCustomerReviewsModalOpen, userId } = useSelector(
    (state) => state.customerReviewsModal
  );

  const { isLoading, reviews } = useSelector(
    (state) => state.getReviewsByUserId
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleCustomerReviewsModal(false));
    dispatch(toggleIsModalOpen(false));
    dispatch(resetGetReviewsByUserId());
  };

  useEffect(() => {
    if (userId) {
      dispatch(getReviewsByUserId(userId));
    }
  }, [dispatch, userId]);

  return (
    <Box className="customer-reviews-bg" onClick={handleCloseModal}>
      <Slide direction="down" in={isCustomerReviewsModalOpen}>
        <Paper
          elevation={12}
          onClick={(e) => e.stopPropagation()}
          className="customer-reviews-container"
        >
          <Box className="customer-reviews-header">
            <Typography variant="h4">Reviews - {reviews.length}</Typography>
            <IconButton
              color="error"
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
              onClick={handleCloseModal}
            >
              <CancelIcon sx={{ fontSize: "1.6rem" }} />
            </IconButton>
          </Box>
          <Box className="customer-reviews">
            {isLoading ? (
              <Box className="spinner">
                <CircularProgress size={60} color="secondary" />
              </Box>
            ) : (
              <>
                {reviews?.map((review) => (
                  <ReviewCard key={review._id} data={review} />
                ))}
              </>
            )}
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
};

export default CustomerReviewsModal;
