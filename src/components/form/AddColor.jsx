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
import Dots from "../Dots";
import CustomAlert from "../CustomAlert";
import {
  toggleSuccessAlert,
  toggleErrorAlert,
} from "../../redux/features/alertSlice";
import { getProducts } from "../../redux/actions/productActions";
import { addProductColor } from "../../redux/actions/productColorActions";
import {
  addStoreColor,
  toggleAddColorModal,
} from "../../redux/features/modals/colorsModalSlice";
import { resetAddProductColor } from "../../redux/features/product/color/addColorSlice";

const AddColor = ({ colors, id, contentType }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [qty, setQty] = useState(0);

  const { colorsData, isAddColorModalOpen } = useSelector(
    (state) => state.colorsModal
  );
  const { errorAlert, successAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isLoading, isSuccess, successMsg, errorMsg, addedColor } =
    useSelector((state) => state.addColor);

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
      addProductColor({
        route,
        color: { productId: id, name: modifiedColorName, code, qty: +qty },
      })
    );
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(addStoreColor(addedColor));
        dispatch(toggleAddColorModal(false));
        dispatch(resetAddProductColor());
        dispatch(getProducts({ route, searchQ, page, perPage }));
        setName("");
        setCode("");
        setQty(0);
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetAddProductColor());
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
      onClick={() => dispatch(toggleAddColorModal(false))}
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
        <Zoom in={isAddColorModalOpen}>
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
              <Typography variant="h5">Add New Color</Typography>
              <Tooltip
                title="Delete this color"
                placement="top"
                TransitionComponent={Zoom}
                arrow
                sx={{
                  transition: "0.2s ease-in-out",
                  "&:hover": { color: colors.secondary[500] },
                }}
                onClick={() => dispatch(toggleAddColorModal(false))}
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
                  label="Enter Name"
                  color="secondary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <TextField
                  label="Enter Color Code"
                  color="secondary"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  sx={{
                    mt: 1,
                  }}
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
                  {isLoading ? <Dots /> : "Add Color"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Zoom>
      </div>
    </Box>
  );
};

export default AddColor;
