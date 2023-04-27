import {
  Box,
  Divider,
  Grid,
  IconButton,
  Paper,
  Slide,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleIsModalOpen } from "../../redux/features/stateSlice";
import { colorPallets } from "../../theme";
import TvIcon from "@mui/icons-material/Tv";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddSize from "./tv/size/AddSize";
import EditSize from "./tv/size/EditSize";
import {
  setDelSizeModalData,
  toggleDelSizeModal,
} from "../../redux/features/modals/delSizeModalSlice";
import DeleteSizeModal from "./DeleteSizeModal";
import {
  toggleAddSizeModal,
  toggleSizesModal,
} from "../../redux/features/modals/sizesModalSlice";
import {
  setEditSizedata,
  toggleEditSizeModal,
} from "../../redux/features/modals/editSizeModalSlice";
import TooltipTitle from "../TooltipTitle";

const SizesConfig = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { sizesData, isSizesModalOpen, isAddSizeModalOpen } = useSelector(
    (state) => state.sizesModal
  );
  const { isEditSizeModalOpen } = useSelector((state) => state.editSizeModal);
  const { isDelSizeModalOpen } = useSelector((state) => state.delSizeModal);

  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        dispatch(toggleSizesModal(false));
        dispatch(toggleIsModalOpen(false));
        dispatch(toggleAddSizeModal(false));
        dispatch(toggleDelSizeModal(false));
        dispatch(toggleEditSizeModal(false));
      }}
      sx={{
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10001,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Slide direction="down" in={isSizesModalOpen}>
        <Paper
          elevation={12}
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: "80%",
            minHeight: 350,
          }}
        >
          <Box
            p={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Add, Update or Remove Size</Typography>
            <Tooltip
              title={TooltipTitle("Add New Size")}
              placement="top"
              TransitionComponent={Zoom}
              arrow
              sx={{
                transition: "0.2s ease-in-out",
                "&:hover": { color: colors.secondary[500] },
              }}
              onClick={() => dispatch(toggleAddSizeModal(true))}
            >
              <IconButton>
                <AddCircleOutlineIcon sx={{ fontSize: "1.7rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Divider />
          {sizesData.sizes.length === 0 && (
            <Typography
              variant="h4"
              color="error"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              No Sizes!
            </Typography>
          )}
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              justifyItems: "center",
              gap: "2em",
              margin: "10px 5px",
            }}
          >
            {sizesData.sizes.map((size) => (
              <Paper
                variant="outlined"
                sx={{
                  width: 220,
                  height: 105,
                  display: "flex",
                  borderRadius: 2,
                }}
              >
                <Box
                  width={100}
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <TvIcon sx={{ fontSize: "5rem" }} />
                  <Typography sx={{ position: "absolute", fontSize: "1.5rem" }}>
                    {size.size}"
                  </Typography>
                </Box>
                <Box display="flex" flex={1} flexDirection="column">
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    qty:{" "}
                    <span style={{ color: colors.secondary[500] }}>
                      {size.qty}
                    </span>
                  </Typography>
                  <Typography variant="h6">
                    price:{" "}
                    <span style={{ color: colors.secondary[500] }}>
                      ${size.price}
                    </span>
                  </Typography>
                  <Box
                    alignSelf="flex-end"
                    display="flex"
                    justifyContent="space-around"
                    sx={{ mt: 1, mr: 1, width: "100%" }}
                  >
                    <Tooltip
                      title={TooltipTitle("Edit this size")}
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      sx={{
                        transition: "0.2s ease-in-out",
                        "&:hover": { color: colors.secondary[500] },
                      }}
                      onClick={() => {
                        dispatch(toggleEditSizeModal(true));
                        dispatch(setEditSizedata(size));
                      }}
                    >
                      <IconButton>
                        <EditIcon sx={{ fontSize: "1.3rem" }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title={TooltipTitle("Delete this size")}
                      placement="top"
                      TransitionComponent={Zoom}
                      arrow
                      sx={{
                        transition: "0.2s ease-in-out",
                        "&:hover": { color: colors.secondary[500] },
                      }}
                      onClick={() => {
                        dispatch(toggleDelSizeModal(true));
                        dispatch(
                          setDelSizeModalData({
                            productId: sizesData.productId,
                            sizeId: size._id,
                          })
                        );
                      }}
                    >
                      <IconButton>
                        <DeleteIcon sx={{ fontSize: "1.3rem" }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
          {isAddSizeModalOpen && (
            <AddSize colors={colors} id={sizesData.productId} />
          )}
          {isEditSizeModalOpen && (
            <EditSize colors={colors} productId={sizesData.productId} />
          )}
          {isDelSizeModalOpen && (
            <DeleteSizeModal colors={colors} route="tvs" />
          )}
        </Paper>
      </Slide>
    </Box>
  );
};

export default SizesConfig;
