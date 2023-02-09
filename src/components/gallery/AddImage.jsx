import { Box, Button, TextField, Typography } from "@mui/material";
import placeholder from "../../assets/images/placeholder.jpg";
import placeholderCell from "../../assets/images/placeholder-cell.png";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { partial } from "filesize";
import {
  setImageColorName,
  setImageData,
  toggleUploadImageModal,
} from "../../redux/features/modals/uploadModalSlice";
import { useDispatch, useSelector } from "react-redux";
import Dots from "../Dots";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../redux/features/alertSlice";
import { useEffect } from "react";
import { resetAddImage } from "../../redux/features/gallery/addImageSlice";
import { addImage } from "../../redux/actions/galleryActions";
import { updateGalleryData } from "../../redux/features/gallerySlice";
import { getProducts } from "../../redux/actions/productActions";

const size = partial({ base: 2, standard: "jedec" });

const AddImage = ({ colors, productId, route }) => {
  const { imageData } = useSelector((state) => state.uploadModal);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const { isLoading, isSuccess, errorMsg, addedImage } = useSelector(
    (state) => state.addImage
  );

  const dispatch = useDispatch();

  const inputFileHandler = (file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      dispatch(
        setImageData({
          image: reader.result,
          name: file.name,
          size: size(file.size),
        })
      );
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(toggleUploadImageModal(false));
        dispatch(setImageData({}));
        dispatch(resetAddImage());
        dispatch(getProducts({ route, searchQ, page, perPage }));
        dispatch(updateGalleryData(addedImage));
      }, 3000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetAddImage());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  return (
    <Box>
      <Box
        sx={{
          height: route === "cellphones" ? 500 : 240,
        }}
      >
        <Box
          sx={{
            width: 300,
            height: route === "cellphones" ? "auto" : 170,
          }}
        >
          {imageData.image ? (
            <img
              src={imageData.image}
              alt={imageData.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <img
              src={route === "cellphones" ? placeholderCell : placeholder}
              alt="placeholder image"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </Box>
        {imageData?.image && (
          <Box
            p={0.5}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box width={180}>
              <Typography sx={{ opacity: 0.9 }}>{imageData.name}</Typography>
              <Typography sx={{ opacity: 0.6 }}>{imageData.size}</Typography>
            </Box>
            {route !== "tvs" && (
              <TextField
                label="add color name"
                variant="standard"
                color="secondary"
                onChange={(e) => dispatch(setImageColorName(e.target.value))}
              />
            )}
          </Box>
        )}
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
        {!imageData.image ? (
          <>
            <input
              type="file"
              id="input-file"
              accept="image/*"
              onChange={(e) => inputFileHandler(e.target.files[0])}
            />
            <label
              htmlFor="input-file"
              id="input-label"
              style={{
                borderColor: colors.secondary[500],
                color: colors.secondary[500],
              }}
            >
              <ImageSearchIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
              <Typography sx={{ fontSize: "0.8rem" }}>Choose Image</Typography>
            </label>
          </>
        ) : (
          <Button
            variant="outlined"
            color="success"
            sx={{ width: "70%", height: 40, fontSize: "0.8rem" }}
            onClick={() => dispatch(addImage({ route, productId, imageData }))}
            disabled={isLoading}
          >
            {!isLoading && (
              <FileUploadIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
            )}
            {isLoading ? <Dots color={colors.success[500]} /> : "Upload"}
          </Button>
        )}
        <Button
          variant="outlined"
          color="warning"
          disabled={isLoading}
          sx={{ width: "70%", height: 40, mt: 2, fontSize: "0.8rem" }}
          onClick={() => {
            dispatch(toggleUploadImageModal(false));
            dispatch(setImageData({}));
          }}
        >
          <CancelIcon sx={{ fontSize: "1.5rem", mr: 2 }} />
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddImage;
