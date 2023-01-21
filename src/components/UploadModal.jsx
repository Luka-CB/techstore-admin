import { Box, Divider, Paper, Typography, Zoom } from "@mui/material";
import {
  setImageData,
  toggleUploadImageModal,
} from "../redux/features/modals/uploadModalSlice";
import { useDispatch, useSelector } from "react-redux";
import AddImage from "./form/AddImage";
import CustomAlert from "./CustomAlert";

const UploadModal = ({ colors, contentType, productId }) => {
  const { isUploadImageModalOpen } = useSelector((state) => state.uploadModal);
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { successMsg, errorMsg } = useSelector((state) => state.addImage);

  const dispatch = useDispatch();

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={() => {
        dispatch(toggleUploadImageModal(false));
        dispatch(setImageData({}));
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
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Zoom in={isUploadImageModalOpen}>
          <Paper
            elevation={12}
            sx={{
              width: 300,
              height: 400,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={1}
            >
              <Typography variant="h5">Add New Image</Typography>
            </Box>
            <Divider />
            <AddImage colors={colors} productId={productId} route={route} />
          </Paper>
        </Zoom>
      </div>
    </Box>
  );
};

export default UploadModal;
