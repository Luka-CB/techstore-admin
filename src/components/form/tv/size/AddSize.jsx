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
import { addProductSize } from "../../../../redux/actions/productSizeActions";
import { resetAddProductSize } from "../../../../redux/features/product/size/addSizeSlice";
import { getProducts } from "../../../../redux/actions/productActions";
import {
  addStoreSize,
  toggleAddSizeModal,
} from "../../../../redux/features/modals/sizesModalSlice";
import TooltipTitle from "../../../TooltipTitle";

const AddSize = ({ colors, id }) => {
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState("");

  const { sizesData, isAddSizeModalOpen } = useSelector(
    (state) => state.sizesModal
  );
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isLoading, isSuccess, successMsg, errorMsg, addedSize } = useSelector(
    (state) => state.addSize
  );
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      addProductSize({
        route: "tvs",
        size: { id, size: +size, qty: +qty, price: +price },
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      dispatch(addStoreSize({ ...addedSize }));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(toggleAddSizeModal(false));
        dispatch(resetAddProductSize());
        dispatch(getProducts({ route: "tvs", searchQ, page, perPage }));
        setSize("");
        setQty(0);
        setPrice("");
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetAddProductSize());
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
      onClick={() => dispatch(toggleAddSizeModal(false))}
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
        <Zoom in={isAddSizeModalOpen}>
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
              <Typography variant="h5">Add New Size</Typography>
              <Tooltip
                title={TooltipTitle("Delete this size")}
                placement="top"
                TransitionComponent={Zoom}
                arrow
                sx={{
                  transition: "0.2s ease-in-out",
                  "&:hover": { color: colors.secondary[500] },
                }}
                onClick={() => dispatch(toggleAddSizeModal(false))}
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
                  {isLoading ? <Dots /> : "Add Size"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Zoom>
      </div>
    </Box>
  );
};

export default AddSize;
