import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  TextField,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import {
  editImageColorName,
  getImageColorCode,
} from "../../redux/actions/galleryActions";
import CustomAlert from "../CustomAlert";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../redux/features/alertSlice";
import {
  resetEditImageColorName,
  resetUpdatedImgColor,
} from "../../redux/features/gallery/editImageColorNameSlice";
import { getProducts } from "../../redux/actions/productActions";
import { resetImageColorCode } from "../../redux/features/gallery/imageColorCodeSlice";
import {
  setPickedImage,
  setPickedImageColorName,
  updateGalleryImageColor,
} from "../../redux/features/gallerySlice";

const ImageColor = ({ route, productId }) => {
  const [editState, setEditState] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { showMainImgColorInfo } = useSelector((state) => state.states);
  const { pickedImage } = useSelector((state) => state.gallery);
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isLoading, colorCode } = useSelector((state) => state.imageColorCode);
  const {
    isLoading: isEditLoading,
    isSuccess: isEditSuccess,
    successMsg,
    errorMsg,
    updatedImgColor,
  } = useSelector((state) => state.editImageColorName);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pickedImage.colorName && pickedImage.colorName !== "no") {
      dispatch(
        getImageColorCode({
          route,
          query: { productId, colorName: pickedImage.colorName },
        })
      );
    }
  }, [pickedImage, dispatch]);

  useEffect(() => {
    if (updatedImgColor?.name) {
      setInputValue(updatedImgColor?.name);
    } else {
      setInputValue(pickedImage.colorName);
    }
  }, [updatedImgColor, pickedImage]);

  useEffect(() => {
    if (isEditSuccess) {
      dispatch(toggleSuccessAlert(true));
      dispatch(
        updateGalleryImageColor({
          imageId: pickedImage.id,
          colorName: updatedImgColor?.name,
        })
      );
      dispatch(setPickedImageColorName(updatedImgColor?.name));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetEditImageColorName());
        setEditState(false);
        dispatch(getProducts({ route, searchQ, page, perPage }));
      }, 3000);
    }
  }, [isEditSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetEditImageColorName());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        right: 0,
        minWidth: 250,
        margin: 1,
      }}
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
      <Zoom
        in={showMainImgColorInfo}
        style={{ transitionDelay: showMainImgColorInfo ? "500ms" : "0ms" }}
      >
        <Paper
          variant="outlined"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            borderRadius: 4,
          }}
        >
          {!editState ? (
            <>
              <Box
                position="relative"
                sx={{
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    boxShadow: `0 0 12px ${
                      updatedImgColor?.code ? updatedImgColor?.code : colorCode
                    }`,
                    backgroundColor: updatedImgColor?.code
                      ? updatedImgColor?.code
                      : colorCode,
                  }}
                ></Box>
                {isLoading && (
                  <CircularProgress
                    size={55}
                    color="secondary"
                    sx={{
                      position: "absolute",
                    }}
                  />
                )}
              </Box>
              <Divider orientation="vertical" flexItem sx={{ m: "0 10px" }} />
              <Typography variant="h5">
                {updatedImgColor?.name
                  ? updatedImgColor?.name
                  : pickedImage.colorName && pickedImage.colorName !== "no"
                  ? pickedImage.colorName
                  : "Add Color Name"}
              </Typography>
              <Divider orientation="vertical" flexItem sx={{ m: "0 10px" }} />
              <IconButton color="warning" onClick={() => setEditState(true)}>
                <EditIcon sx={{ fontSize: "1.7rem" }} />
              </IconButton>
            </>
          ) : (
            <>
              <Box display="flex" alignItems="flex-end">
                <EditIcon color="warning" sx={{ fontSize: "1.3rem", m: 1 }} />
                <TextField
                  color="warning"
                  variant="standard"
                  placeholder="Add Name"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Box ml={2} display="flex">
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="success"
                      disabled={
                        inputValue === pickedImage.colorName || isEditLoading
                      }
                      onClick={() =>
                        dispatch(
                          editImageColorName({
                            route,
                            updData: {
                              productId,
                              imageId: pickedImage.id,
                              colorName: inputValue,
                            },
                          })
                        )
                      }
                    >
                      <CheckCircleOutlineIcon sx={{ fontSize: "1.7rem" }} />
                    </IconButton>
                    {isEditLoading && (
                      <CircularProgress
                        size={25}
                        color="success"
                        sx={{
                          position: "absolute",
                        }}
                      />
                    )}
                  </Box>
                  <IconButton
                    color="error"
                    onClick={() => setEditState(false)}
                    disabled={isEditLoading}
                  >
                    <HighlightOffIcon sx={{ fontSize: "1.7rem" }} />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
        </Paper>
      </Zoom>
    </Box>
  );
};

export default ImageColor;
