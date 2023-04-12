import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Skeleton,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { colorPallets } from "../../theme";
import {
  setPickedImage,
  toggleGallery,
} from "../../redux/features/gallerySlice";
import {
  toggleIsModalOpen,
  toggleMainImgColorInfo,
  toggleMainImgOverlay,
} from "../../redux/features/stateSlice";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import UploadModal from "./UploadModal";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  setImageData,
  toggleUploadImageModal,
} from "../../redux/features/modals/uploadModalSlice";
import { useEffect, useState } from "react";
import CustomAlert from "../CustomAlert";
import placeholder from "../../assets/images/placeholder.jpg";
import placeholderCell from "../../assets/images/placeholder-cell.png";
import MainImageOverlay from "./MainImageOverlay";
import { resetImageColorCode } from "../../redux/features/gallery/imageColorCodeSlice";
import { resetUpdatedImgColor } from "../../redux/features/gallery/editImageColorNameSlice";

const Gallery = ({ contentType }) => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { showMainImgOverlay } = useSelector((state) => state.states);
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isGalleryOpen, galleryData, pickedImage } = useSelector(
    (state) => state.gallery
  );
  const { isUploadImageModalOpen } = useSelector((state) => state.uploadModal);
  const { successMsg: delSuccessMsg, errorMsg: delErrorMsg } = useSelector(
    (state) => state.deleteImage
  );

  const dispatch = useDispatch();

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  useEffect(() => {
    const mainImage = galleryData?.images?.find((image) => image.isMain);
    mainImage &&
      dispatch(
        setPickedImage({
          id: mainImage._id,
          colorName: mainImage.colorName,
          url: mainImage.imageUrl,
          isMain: mainImage.isMain,
        })
      );
  }, []);

  const handleCloseModal = () => {
    dispatch(toggleGallery(false));
    dispatch(toggleIsModalOpen(false));
    dispatch(toggleUploadImageModal(false));
    dispatch(setImageData({}));
    dispatch(resetUpdatedImgColor());
  };

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
      onClick={handleCloseModal}
    >
      <div
        className="gallery"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: 250,
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
            className="paper"
            sx={{
              minWidth: 250,
              minHeight: 400,
              height: "90vh",
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
                - {galleryData.productName}
              </Typography>
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
            </Box>
            <Divider />
            <Box className="gallery-wrapper">
              <Box
                className={
                  contentType === "cellphone"
                    ? "cellphone-image-wrapper"
                    : "main-image"
                }
              >
                <Box
                  className="image-wrapper"
                  onMouseEnter={() => {
                    dispatch(toggleMainImgOverlay(true));
                    dispatch(toggleMainImgColorInfo(true));
                  }}
                  onMouseLeave={() => {
                    dispatch(toggleMainImgOverlay(false));
                    dispatch(toggleMainImgColorInfo(false));
                    dispatch(resetImageColorCode());
                    dispatch(resetUpdatedImgColor());
                  }}
                >
                  <img
                    src={
                      pickedImage.url
                        ? pickedImage.url
                        : contentType === "cellphone"
                        ? placeholderCell
                        : placeholder
                    }
                    alt="tv main image"
                    id="main-img"
                  />
                  {showMainImgOverlay && (
                    <MainImageOverlay route={route} colors={colors} />
                  )}
                </Box>
              </Box>
              <Box
                className={
                  route === "cellphones"
                    ? "cellphone-other-images"
                    : "other-images"
                }
              >
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
                              dispatch(
                                setPickedImage({
                                  url: image.imageUrl,
                                  id: image._id,
                                  colorName: image.colorName,
                                  isMain: image.isMain,
                                })
                              )
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
