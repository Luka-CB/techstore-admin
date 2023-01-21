import { Box, Button, Paper, Typography, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { deleteProductSize } from "../../redux/actions/productSizeActions";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../redux/features/alertSlice";
import { toggleDelSizeModal } from "../../redux/features/modals/delSizeModalSlice";
import { removeStoreSize } from "../../redux/features/modals/sizesModalSlice";
import { resetDeleteProductSize } from "../../redux/features/product/size/deleteSizeSlice";
import CustomAlert from "../CustomAlert";
import Dots from "../Dots";

const DeleteSizeModal = ({ colors, route }) => {
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isDelSizeModalOpen, data } = useSelector(
    (state) => state.delSizeModal
  );
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.deleteSize
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      dispatch(removeStoreSize(data.sizeId));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(toggleDelSizeModal(false));
        dispatch(resetDeleteProductSize());
        dispatch(getProducts({ route }));
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteProductSize());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      onClick={() => dispatch(toggleDelSizeModal(false))}
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
        <Zoom in={isDelSizeModalOpen}>
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
                    deleteProductSize({
                      route,
                      ids: { productId: data.productId, sizeId: data.sizeId },
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
                sx={{
                  width: 120,
                  height: 30,
                  fontSize: "0.8rem",
                }}
                onClick={() => dispatch(toggleDelSizeModal(false))}
                disabled={isLoading}
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

export default DeleteSizeModal;
