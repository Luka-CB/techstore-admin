import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Slide,
  CircularProgress,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { colorPallets } from "../theme";
import {
  removeGalleryImage,
  toggleGallery,
} from "../redux/features/gallerySlice";
import { toggleIsModalOpen } from "../redux/features/stateSlice";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import UploadModal from "./UploadModal";
import {
  setImageData,
  toggleUploadImageModal,
} from "../redux/features/modals/uploadModalSlice";
import { useEffect, useState } from "react";
import { resetChangeImageStatus } from "../redux/features/gallery/changeImageStatusSlice";
import {
  changeImageStatus,
  deleteImage,
} from "../redux/actions/galleryActions";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../redux/features/alertSlice";
import CustomAlert from "./CustomAlert";
import { resetDeleteImage } from "../redux/features/gallery/deleteImageSlice";
import placeholder from "../assets/images/placeholder.jpg";
import { getProducts } from "../redux/actions/productActions";

const Gallery = ({ contentType }) => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const [pickedImage, setPickedImage] = useState({});
  const [showIcons, setShowIcons] = useState(false);

  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isGalleryOpen, galleryData } = useSelector((state) => state.gallery);
  const { isUploadImageModalOpen } = useSelector((state) => state.uploadModal);
  const { isLoading, isSuccess } = useSelector(
    (state) => state.changeImageStatus
  );
  const {
    isLoading: isDelLoading,
    isSuccess: isDelSuccess,
    successMsg: delSuccessMsg,
    errorMsg: delErrorMsg,
  } = useSelector((state) => state.deleteImage);

  const dispatch = useDispatch();

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  useEffect(() => {
    const mainImage = galleryData?.images?.find((image) => image.isMain);
    mainImage &&
      setPickedImage({
        url: mainImage.imageUrl,
        id: mainImage._id,
        isMain: mainImage.isMain,
      });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setPickedImage({ ...pickedImage, isMain: true });
      dispatch(resetChangeImageStatus());
      dispatch(getProducts({ route }));
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isDelSuccess) {
      dispatch(toggleSuccessAlert(true));
      dispatch(getProducts({ route }));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(removeGalleryImage(pickedImage.id));
        dispatch(resetDeleteImage());
        setPickedImage({
          url: galleryData.images[0].imageUrl,
          id: galleryData.images[0]._id,
          isMain: galleryData.images[0].isMain,
        });
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
    <Box
      sx={{
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10001,
      }}
      onClick={() => {
        dispatch(toggleGallery(false));
        dispatch(toggleIsModalOpen(false));
        dispatch(toggleUploadImageModal(false));
        dispatch(setImageData({}));
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          minWidth: 250,
          minHeight: 400,
        }}
      >
        {successAlert && (
          <CustomAlert
            severity="success"
            value={delSuccessMsg}
            transitionState={successAlert}
          />
        )}
        {errorAlert && (
          <CustomAlert
            severity="error"
            value={delErrorMsg}
            transitionState={errorAlert}
          />
        )}
        <Slide direction="down" in={isGalleryOpen}>
          <Paper
            elevation={12}
            onClick={(e) => e.stopPropagation()}
            sx={{
              minWidth: 250,
              minHeight: 400,
            }}
          >
            <Box p={2} textAlign="center">
              <Typography variant="h5">
                Add, Update or Remove Image for{" "}
                <b
                  style={{
                    color: colors.secondary[500],
                    letterSpacing: 3,
                    textDecoration: "underline",
                  }}
                >
                  {galleryData.contentType.toUpperCase()}
                </b>
              </Typography>
            </Box>
            <Divider />
            <Box className="gallery-wrapper">
              <Box className="main-image">
                <Box
                  className="image-wrapper"
                  onMouseEnter={() => setShowIcons(true)}
                  onMouseLeave={() => setShowIcons(false)}
                >
                  <img
                    src={!pickedImage.url ? placeholder : pickedImage.url}
                    alt="tv main image"
                    id="main-img"
                  />
                  {showIcons && (
                    <Box className="icons-bg">
                      <Box className="icons">
                        <Zoom in={showIcons}>
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
                                          route: "tvs",
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
                                        route: "tvs",
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
                    </Box>
                  )}
                </Box>
              </Box>
              <Box className="other-images">
                {galleryData.images.map((image, i) => (
                  <Box key={image?._id}>
                    {image?.name === "add-more" ? (
                      <Box className="add-wrapper">
                        <Button
                          title="Add Image"
                          color="secondary"
                          className="add"
                          sx={{
                            color: colors.light[200],
                            transition: "0.2s ease-in-out",
                            "&:hover": { color: colors.secondary[500] },
                          }}
                          onClick={() => dispatch(toggleUploadImageModal(true))}
                        >
                          <AddAPhotoIcon
                            id="add-icon"
                            sx={{
                              fontSize: "4rem",
                              width: "100%",
                            }}
                          />
                        </Button>
                      </Box>
                    ) : (
                      <Box
                        className={
                          pickedImage.id === image?._id
                            ? "other-image-wrapper-active"
                            : "other-image-wrapper"
                        }
                      >
                        {image?._id ? (
                          <Box
                            className="other-image"
                            onClick={() =>
                              setPickedImage({
                                url: image.imageUrl,
                                id: image._id,
                                isMain: image.isMain,
                              })
                            }
                          >
                            <img
                              src={image?.imageUrl}
                              alt={`image ${i + 1}`}
                              id="img"
                            />
                          </Box>
                        ) : (
                          <Box className="other-image">
                            <Skeleton
                              variant="rounded"
                              width={170}
                              height={100}
                            />
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            </Box>

            {isUploadImageModalOpen && (
              <UploadModal
                colors={colors}
                contentType={galleryData.contentType}
                productId={galleryData.productId}
              />
            )}
          </Paper>
        </Slide>
      </div>
    </Box>
  );
};

export default Gallery;
