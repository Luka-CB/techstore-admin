import React from "react";
import { Box, IconButton, Paper, Slide, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  setPostModalData,
  togglePostModal,
} from "../../redux/features/modals/postModalSlice";
import { toggleIsModalOpen } from "../../redux/features/stateSlice";

const PostModal = () => {
  const { isPostModalOpen, data } = useSelector((state) => state.postModal);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(togglePostModal(false));
    dispatch(toggleIsModalOpen(false));
    dispatch(setPostModalData({}));
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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10001,
      }}
      onClick={handleCloseModal}
    >
      <Slide direction="down" in={isPostModalOpen}>
        <Paper
          elevation={12}
          onClick={(e) => e.stopPropagation()}
          sx={{
            overflowY: "scroll",
            position: "relative",
            width: 850,
            height: "80vh",
            padding: 2,
          }}
        >
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
          <Typography mt={3} variant="body1" sx={{ textIndent: 10 }}>
            {data.post}
          </Typography>
        </Paper>
      </Slide>
    </Box>
  );
};

export default PostModal;
