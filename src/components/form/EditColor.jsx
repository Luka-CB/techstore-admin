import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import Dots from "../Dots";
import CustomAlert from "../CustomAlert";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../redux/features/alertSlice";
import { getProducts } from "../../redux/actions/productActions";
import { editProductColor } from "../../redux/actions/productColorActions";
import { updateStoreColor } from "../../redux/features/modals/colorsModalSlice";
import { toggleEditColorModal } from "../../redux/features/modals/editColorModalSlice";
import { resetEditProductColor } from "../../redux/features/product/color/editColorSlice";

const EditColor = ({ colors, productId, contentType }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [qty, setQty] = useState(0);

  const { editColorData, isEditColorModalOpen } = useSelector(
    (state) => state.editColorModal
  );
  const { errorAlert, successAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isLoading, isSuccess, errorMsg, successMsg } = useSelector(
    (state) => state.editColor
  );

  const dispatch = useDispatch();

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  const submitHandler = (e) => {
    e.preventDefault();

    const modifiedColorName =
      name &&
      name
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");

    dispatch(
      editProductColor({
        route,
        color: {
          productId,
          name: modifiedColorName,
          code,
          qty: +qty,
          _id: editColorData._id,
        },
      })
    );
  };

  useEffect(() => {
    if (editColorData && editColorData.name) {
      setName(editColorData.name);
      setCode(editColorData.code);
      setQty(editColorData.qty);
    }
  }, [editColorData]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      dispatch(updateStoreColor({ name, code, qty, _id: editColorData._id }));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(toggleEditColorModal(false));
        dispatch(resetEditProductColor());
        dispatch(getProducts({ route, searchQ, page, perPage }));
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetEditProductColor());
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
      onClick={() => dispatch(toggleEditColorModal(false))}
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
        <Zoom in={isEditColorModalOpen}>
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
              <Typography variant="h5">Edit Color</Typography>

              <IconButton
                sx={{
                  transition: "0.2s ease-in-out",
                  "&:hover": { color: colors.secondary[500] },
                }}
                onClick={() => dispatch(toggleEditColorModal(false))}
              >
                <HighlightOffIcon
                  color="error"
                  sx={{
                    fontSize: "1.7rem",
                  }}
                />
              </IconButton>
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
                  label="Enter Color"
                  color="secondary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  label="Enter Color Code"
                  color="secondary"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  sx={{
                    mt: 1,
                  }}
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

export default EditColor;
