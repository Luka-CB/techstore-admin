import React from "react";
import {
  Box,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import TooltipTitle from "../TooltipTitle";
import { useDispatch } from "react-redux";
import {
  setPostModalData,
  togglePostModal,
} from "../../redux/features/modals/postModalSlice";
import { toggleIsModalOpen } from "../../redux/features/stateSlice";
import {
  setDelReviewModalData,
  toggleDelReviewModal,
} from "../../redux/features/modals/delReviewModalSlice";

const ReviewCard = ({ data }) => {
  const reviewText =
    data.post?.length > 350 ? `${data.post?.substring(0, 350)}...` : data.post;

  const dispatch = useDispatch();

  const handleOpenPostModal = () => {
    dispatch(setPostModalData({ post: data.post }));
    dispatch(togglePostModal(true));
    dispatch(toggleIsModalOpen(true));
  };

  const handleOpenDeleteModal = (reviewId, userId) => {
    dispatch(setDelReviewModalData({ reviewId, userId }));
    dispatch(toggleDelReviewModal(true));
    dispatch(toggleIsModalOpen(true));
  };

  return (
    <Box className="review-card">
      <Paper variant="outlined" className="paper">
        <Box className="card-header">
          <Typography variant="h4" color="secondary">
            {data?.author?.username}
          </Typography>
          <span id="date">
            <em>{data.createdAt}</em>
          </span>
        </Box>
        <hr />
        <Box className="card-body">
          <p id="text">{reviewText}</p>
        </Box>
        <hr />
        <Box className="card-footer">
          <Tooltip
            title={TooltipTitle("Delete Review")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            <IconButton
              color="error"
              onClick={() => handleOpenDeleteModal(data._id, data?.author?._id)}
            >
              <DeleteIcon sx={{ fontSize: "1.5rem" }} />
            </IconButton>
          </Tooltip>
          <Box className="see-more" onClick={handleOpenPostModal}>
            <h3>See More</h3>
            <DoubleArrowIcon id="arrow" />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ReviewCard;
