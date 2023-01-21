import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import Dots from "../../../Dots";
import CustomAlert from "../../../CustomAlert";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../../../redux/features/alertSlice";
import { editProductSize } from "../../../../redux/actions/productSizeActions";
import { resetEditProductSize } from "../../../../redux/features/product/size/editSizeSlice";
import { getProducts } from "../../../../redux/actions/productActions";
import { updateStoreSize } from "../../../../redux/features/modals/sizesModalSlice";
import { toggleEditSizeModal } from "../../../../redux/features/modals/editSizeModalSlice";

const EditSize = ({ colors, productId }) => {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState("");

  const { editSizeData, isEditSizeModalOpen } = useSelector(
    (state) => state.editSizeModal
  );
  const { errorAlert, successAlert } = useSelector((state) => state.alert);
  const { isLoading, isSuccess, errorMsg, successMsg } = useSelector(
    (state) => state.editSize
  );

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProductSize({
        route: "tvs",
        size: { productId, size, qty: +qty, price, _id: editSizeData._id },
      })
    );
  };

  useEffect(() => {
    if (editSizeData && editSizeData.size) {
      setSize(editSizeData.size);
      setQty(editSizeData.qty);
      setPrice(editSizeData.price);
    }
  }, [editSizeData]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      dispatch(updateStoreSize({ size, qty, price, _id: editSizeData._id }));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(toggleEditSizeModal(false));
        dispatch(resetEditProductSize());
        dispatch(getProducts({ route: "tvs" }));
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetEditProductSize());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => dispatch(toggleEditSizeModal())}
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
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Zoom in={isEditSizeModalOpen}>
          <Paper
            elevation={12}
            sx={{
              width: 250,
              height: 280,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              p={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5">Edit Size</Typography>
              <Tooltip
                title="Delete this size"
                placement="top"
                TransitionComponent={Zoom}
                arrow
                sx={{
                  transition: "0.2s ease-in-out",
                  "&:hover": { color: colors.secondary[500] },
                }}
                onClick={() => dispatch(toggleEditSizeModal(false))}
              >
                <IconButton>
                  <HighlightOffIcon
                    color="error"
                    sx={{
                      fontSize: "1.7rem",
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider />
            <form onSubmit={submitHandler}>
              <Box
                display="flex"
                flexDirection="column"
                width="90%"
                margin="10px auto"
              >
                <TextField
                  type="number"
                  label="Enter Size"
                  color="secondary"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                />
                <TextField
                  type="number"
                  label="Enter Quantity"
                  color="secondary"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  sx={{
                    mt: 1,
                  }}
                  required
                />
                <TextField
                  type="number"
                  label="Enter Price"
                  color="secondary"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{
                    mt: 1,
                  }}
                  required
                />

                <Button
                  type="submit"
                  variant="outlined"
                  color="secondary"
                  sx={{
                    height: 30,
                    mt: 1,
                    fontSize: "0.8rem",
                    position: "relative",
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? <Dots /> : "Edit"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Zoom>
      </div>
    </Box>
  );
};

export default EditSize;
