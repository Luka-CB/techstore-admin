import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  changeImageStatus,
  deleteImage,
  getImageColorCode,
} from "../../redux/actions/galleryActions";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import { resetChangeImageStatus } from "../../redux/features/gallery/changeImageStatusSlice";
import { resetUpdatedImgColor } from "../../redux/features/gallery/editImageColorNameSlice";
import { getProducts } from "../../redux/actions/productActions";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../redux/features/alertSlice";
import {
  removeGalleryImage,
  setPickedImage,
} from "../../redux/features/gallerySlice";
import { resetDeleteImage } from "../../redux/features/gallery/deleteImageSlice";
import ImageColor from "./ImageColor";

const MainImageOverlay = ({ route, colors }) => {
  const { showMainImgOverlay } = useSelector((state) => state.states);
  const { galleryData, pickedImage } = useSelector((state) => state.gallery);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isLoading, isSuccess } = useSelector(
    (state) => state.changeImageStatus
  );
  const {
    isLoading: isDelLoading,
    isSuccess: isDelSuccess,
    errorMsg: delErrorMsg,
  } = useSelector((state) => state.deleteImage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setPickedImage({ ...pickedImage, isMain: true }));
      dispatch(resetChangeImageStatus());
      dispatch(getProducts({ route, searchQ, page, perPage }));
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isDelSuccess) {
      dispatch(toggleSuccessAlert(true));
      dispatch(getProducts({ route, searchQ, page, perPage }));
      dispatch(resetUpdatedImgColor());
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(removeGalleryImage(pickedImage.id));
        dispatch(resetDeleteImage());
        dispatch(
          setPickedImage({
            url: galleryData.images[0].imageUrl,
            id: galleryData.images[0]._id,
            colorName: galleryData.images[0].colorName,
            isMain: galleryData.images[0].isMain,
          })
        );
        dispatch(
          getImageColorCode({
            route,
            query: {
              productId: galleryData.productId,
              colorName: galleryData.images[0].colorName,
            },
          })
        );
      }, 3000);
    }
  }, [isDelSuccess, dispatch]);

  useEffect(() => {
    if (delErrorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
      }, 3000);
    }
  }, [delErrorMsg, dispatch]);

  return (
    <Box className="icons-bg">
      <Box className="icons">
        <Zoom in={showMainImgOverlay}>
          {!pickedImage.url ? (
            <Typography variant="h5" color="secondary">
              No Main Image!
            </Typography>
          ) : (
            <Box
              sx={{
                width: "150px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {pickedImage.isMain ? (
                <IconButton color="success" title="Main Image">
                  <CheckBoxIcon
                    sx={{
                      fontSize: "2rem",
                    }}
                  />
                </IconButton>
              ) : (
                <>
                  <IconButton
                    sx={{ position: "relative" }}
                    color="secondary"
                    title="Click to make it main image"
                    onClick={() =>
                      dispatch(
                        changeImageStatus({
                          route,
                          ids: {
                            productId: galleryData.productId,
                            imageId: pickedImage.id,
                          },
                        })
                      )
                    }
                  >
                    <CheckBoxOutlineBlankIcon
                      sx={{
                        fontSize: "2rem",
                      }}
                    />
                  </IconButton>
                  {isLoading && (
                    <CircularProgress
                      size={45}
                      sx={{
                        color: colors.success[500],
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                      }}
                    />
                  )}
                </>
              )}
              <Box sx={{ position: "relative" }}>
                <IconButton
                  color="error"
                  title="Click to delete image"
                  onClick={() =>
                    dispatch(
                      deleteImage({
                        route,
                        ids: {
                          productId: galleryData.productId,
                          imageId: pickedImage.id,
                        },
                      })
                    )
                  }
                >
                  <DeleteIcon
                    sx={{
                      fontSize: "2rem",
                    }}
                  />
                </IconButton>
                {isDelLoading && (
                  <CircularProgress
                    size={45}
                    sx={{
                      color: colors.danger[500],
                      position: "absolute",
                      top: 0,
                      left: 0,
                      zIndex: 1,
                    }}
                  />
                )}
              </Box>
            </Box>
          )}
        </Zoom>
      </Box>
      {route !== "tvs" && (
        <ImageColor route={route} productId={galleryData.productId} />
      )}
    </Box>
  );
};

export default MainImageOverlay;
