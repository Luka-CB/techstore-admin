import { Box, Button, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { colorPallets } from "../theme";
import { partial } from "filesize";
import { useDispatch, useSelector } from "react-redux";
import {
  addDropImageData,
  setDropImageColorName,
} from "../redux/features/imageSlice";
import {
  toggleImageColorNameErrorState,
  toggleImageErrorState,
} from "../redux/features/stateSlice";

const size = partial({ base: 2, standard: "jedec" });

const ImageDrop = ({ contentType }) => {
  const dispatch = useDispatch();

  const { dropImageData, isDropImageAdded } = useSelector(
    (state) => state.image
  );
  const { imgError, imgColorNameError } = useSelector((state) => state.states);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          dispatch(
            addDropImageData({
              // imageFile: file,
              name: file.name,
              size: size(file.size),
              type: file.type,
              image: reader.result,
            })
          );
        };
        reader.readAsDataURL(file);
      });
    },
    [dispatch]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  useEffect(() => {
    if (isDropImageAdded) {
      dispatch(toggleImageErrorState(false));
    }
  }, [dispatch, isDropImageAdded]);

  return (
    <div
      className={
        contentType === "cellphone" ? "cell-drop-container" : "drop-container"
      }
    >
      <div
        {...getRootProps()}
        className="dropzone"
        style={
          imgError
            ? {
                backgroundColor:
                  isDragActive && theme.palette.mode === "dark"
                    ? "transparent"
                    : isDragActive && theme.palette.mode === "light"
                    ? "#f8bad760"
                    : "rgba(255, 0, 0, 0.151)",
                border: isDragActive
                  ? `1px dashed ${colors.primary[400]}`
                  : `1px dashed ${colors.danger[500]}`,
              }
            : {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "transparent"
                    : isDragActive
                    ? "#f8bad760"
                    : "#f8bad72a",
                border: isDragActive
                  ? `1px dashed ${colors.primary[400]}`
                  : `1px dashed ${colors.secondary[500]}`,
              }
        }
      >
        <input {...getInputProps()} />
        {dropImageData.image ? (
          <div className="drop-image-wrapper">
            <img
              src={dropImageData.image}
              alt=""
              id={isDragActive ? "dropzone-image-active" : "dropzone-image"}
            />
            {contentType !== "tv" ? (
              <div className="color-name" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  id={imgColorNameError ? "name-input-error" : "name-input"}
                  placeholder="Image Color Name"
                  onChange={(e) => {
                    dispatch(setDropImageColorName(e.target.value));
                    dispatch(toggleImageColorNameErrorState(false));
                  }}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {isDragActive ? (
              <p style={{ color: colors.secondary[500] }} id="active-text">
                Drop Image Here
              </p>
            ) : (
              <div className="dropzone-content">
                <Typography
                  variant="h3"
                  color={imgError ? "red" : colors.secondary[500]}
                >
                  Drag and Drop Image
                </Typography>
                <Typography
                  variant="h5"
                  mt="5px"
                  color={imgError ? "red" : colors.secondary[600]}
                  fontWeight="700"
                  textTransform="uppercase"
                >
                  or
                </Typography>
                <Button
                  variant="outlined"
                  color={imgError ? "error" : "secondary"}
                  sx={{ mt: "20px" }}
                >
                  Choose Image
                </Button>
                {imgError && (
                  <Typography variant="h5" color="error" mt="20px">
                    Please Provide Product Image!
                  </Typography>
                )}
              </div>
            )}
          </>
        )}
      </div>
      {dropImageData.name && (
        <Box display="flex" justifyContent="space-between" p="5px">
          <Typography
            color={colors.light[200]}
            sx={{ fontSize: "0.8rem", mr: 1 }}
          >
            {dropImageData.name}
          </Typography>
          <Box>
            <Typography color={colors.light[400]} sx={{ fontSize: "0.7rem" }}>
              {dropImageData.type}
            </Typography>
            <Typography color={colors.light[400]} sx={{ fontSize: "0.6rem" }}>
              {dropImageData.size}
            </Typography>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default ImageDrop;
