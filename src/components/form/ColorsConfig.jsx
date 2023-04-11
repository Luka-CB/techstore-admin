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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  toggleAddColorModal,
  toggleColorsModal,
} from "../../redux/features/modals/colorsModalSlice";
import {
  setDelColorModalData,
  toggleDelColorModal,
} from "../../redux/features/modals/delColorModalSlice";
import {
  setEditColorData,
  toggleEditColorModal,
} from "../../redux/features/modals/editColorModalSlice";
import AddColor from "./AddColor";
import EditColor from "./EditColor";
import DeleteColorModal from "./DeleteColorModal";
import TooltipTitle from "../TooltipTitle";

const ColorsConfig = ({ contentType }) => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { colorsData, isColorsModalOpen, isAddColorModalOpen } = useSelector(
    (state) => state.colorsModal
  );
  const { isEditColorModalOpen } = useSelector((state) => state.editColorModal);
  const { isDelColorModalOpen } = useSelector((state) => state.delColorModal);

  const dispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        dispatch(toggleColorsModal(false));
        dispatch(toggleIsModalOpen(false));
        dispatch(toggleAddColorModal(false));
        dispatch(toggleDelColorModal(false));
        dispatch(toggleEditColorModal(false));
      }}
      sx={{
        position: "fixed",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10001,
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
          minHeight: 350,
        }}
      >
        <Slide direction="down" in={isColorsModalOpen}>
          <Paper
            elevation={12}
            onClick={(e) => e.stopPropagation()}
            sx={{
              minWidth: 250,
              minHeight: 350,
            }}
          >
            <Box
              p={2}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5">Add, Update or Remove Color</Typography>
              <Tooltip
                title={TooltipTitle("Add New Color")}
                placement="top"
                TransitionComponent={Zoom}
                arrow
                sx={{
                  transition: "0.2s ease-in-out",
                  "&:hover": { color: colors.secondary[500] },
                }}
                onClick={() => dispatch(toggleAddColorModal(true))}
              >
                <IconButton>
                  <AddCircleOutlineIcon sx={{ fontSize: "1.7rem" }} />
                </IconButton>
              </Tooltip>
            </Box>
            <Divider />
            {colorsData.colors.length === 0 && (
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
                No Colors!
              </Typography>
            )}
            <Grid container rowSpacing={2} columnSpacing={2} p={2}>
              {colorsData.colors.map((color) => (
                <Grid item xs={3} key={color._id}>
                  <Paper
                    variant="outlined"
                    sx={{
                      minWidth: 220,
                      height: 140,
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
                      <Box
                        sx={{
                          width: 80,
                          height: 80,
                          borderRadius: "50%",
                          boxShadow: `0 0 8px ${color.code}`,
                          backgroundColor: color.code,
                        }}
                      ></Box>
                    </Box>
                    <Box display="flex" flex={1} flexDirection="column">
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        Name:{" "}
                        <span
                          style={{
                            color: colors.secondary[500],
                            textTransform: "capitalize",
                          }}
                        >
                          {color.name}
                        </span>
                      </Typography>
                      <Typography variant="h6">
                        Code:{" "}
                        <span style={{ color: colors.secondary[500] }}>
                          {color.code}
                        </span>
                      </Typography>
                      <Typography variant="h6">
                        Qty:{" "}
                        <span style={{ color: colors.secondary[500] }}>
                          {color.qty}
                        </span>
                      </Typography>
                      <Box
                        alignSelf="flex-end"
                        display="flex"
                        justifyContent="space-around"
                        sx={{ mt: 1, width: "100%" }}
                      >
                        <IconButton
                          title={`Click to Edit "${color.name}"`}
                          sx={{
                            transition: "0.2s ease-in-out",
                            "&:hover": { color: colors.secondary[500] },
                          }}
                          onClick={() => {
                            dispatch(toggleEditColorModal(true));
                            dispatch(setEditColorData(color));
                          }}
                        >
                          <EditIcon sx={{ fontSize: "1.6rem" }} />
                        </IconButton>
                        <IconButton
                          title={`Click to delete "${color.name}"`}
                          sx={{
                            transition: "0.2s ease-in-out",
                            "&:hover": { color: colors.secondary[500] },
                          }}
                          onClick={() => {
                            dispatch(toggleDelColorModal(true));
                            dispatch(
                              setDelColorModalData({
                                productId: colorsData.productId,
                                colorId: color._id,
                              })
                            );
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: "1.6rem" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
            {isAddColorModalOpen && (
              <AddColor
                colors={colors}
                id={colorsData.productId}
                contentType={contentType}
              />
            )}
            {isEditColorModalOpen && (
              <EditColor
                colors={colors}
                productId={colorsData.productId}
                contentType={contentType}
              />
            )}
            {isDelColorModalOpen && (
              <DeleteColorModal
                colors={colors}
                route={
                  contentType === "accessory"
                    ? "accessories"
                    : `${contentType}s`
                }
              />
            )}
          </Paper>
        </Slide>
      </div>
    </Box>
  );
};

export default ColorsConfig;
