import { Box, Button, Paper, Typography, Zoom } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";
import { deleteProductColor } from "../../redux/actions/productColorActions";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../redux/features/alertSlice";
import { removeStoreColor } from "../../redux/features/modals/colorsModalSlice";
import { toggleDelColorModal } from "../../redux/features/modals/delColorModalSlice";
import { resetDeleteProductColor } from "../../redux/features/product/color/deleteColorSlice";
import CustomAlert from "../CustomAlert";
import Dots from "../Dots";

const DeleteColorModal = ({ colors, route }) => {
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isDelColorModalOpen, data } = useSelector(
    (state) => state.delColorModal
  );
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.deleteColor
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(toggleDelColorModal(false));
        dispatch(resetDeleteProductColor());
        dispatch(getProducts({ route, searchQ, page, perPage }));
        dispatch(removeStoreColor(data.colorId));
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteProductColor());
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
      onClick={() => dispatch(toggleDelColorModal(false))}
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
        <Zoom in={isDelColorModalOpen}>
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
                    deleteProductColor({
                      route,
                      ids: { productId: data.productId, colorId: data.colorId },
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
                onClick={() => dispatch(toggleDelColorModal(false))}
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

export default DeleteColorModal;
