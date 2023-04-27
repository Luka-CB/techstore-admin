import React from "react";
import { Box, IconButton, Paper, Slide, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  setOrderIdsModalData,
  toggleOrderIdsModal,
} from "../../../redux/features/modals/orderIdsModalSlice";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";

const OrderIdsModal = () => {
  const { isOrderIdsModalOpen, data } = useSelector(
    (state) => state.orderIdsModal
  );

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleOrderIdsModal(false));
    dispatch(toggleIsModalOpen(false));
    dispatch(setOrderIdsModalData([]));
  };

  return (
    <Box className="order-ids-bg" onClick={handleCloseModal}>
      <Slide direction="down" in={isOrderIdsModalOpen}>
        <Paper
          elevation={12}
          onClick={(e) => e.stopPropagation()}
          className="paper"
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
          <Box className="order-ids">
            {data.map((orderId) => (
              <Typography variant="h4" sx={{ mt: 3 }} key={orderId}>
                {orderId}
              </Typography>
            ))}
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
};

export default OrderIdsModal;
