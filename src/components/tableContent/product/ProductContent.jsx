import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { colorPallets } from "../../../theme";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import CollectionsIcon from "@mui/icons-material/Collections";
import InfoIcon from "@mui/icons-material/Info";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";
import {
  setGalleryData,
  toggleGallery,
} from "../../../redux/features/gallerySlice";
import placeholder from "../../../assets/images/placeholder.jpg";
import placeholderCell from "../../../assets/images/placeholder-cell.png";
import { setProductInfo } from "../../../redux/features/updProductInfoSlice";
import {
  setSizesdata,
  toggleSizesModal,
} from "../../../redux/features/modals/sizesModalSlice";
import {
  setDelProductModalData,
  toggleDelProductModal,
} from "../../../redux/features/modals/delProductModalSlice";
import {
  addCheckItem,
  removeCheckItem,
} from "../../../redux/features/checkboxSlice";
import {
  setColorsData,
  toggleColorsModal,
} from "../../../redux/features/modals/colorsModalSlice";
import {
  setMainCamInfo,
  setSelfieCamInfo,
} from "../../../redux/features/cameraInfoSlice";
import TooltipTitle from "../../TooltipTitle";

const ProductContent = ({ data, contentType }) => {
  const [showLaunchIcon, setShowLaunchIcon] = useState(false);
  const [isItemChecked, setIsItemChecked] = useState(false);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { checkedData } = useSelector((state) => state.checkbox);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const detailsNavigationHandler = () => {
    navigate(`/details/${contentType}/${data._id}`);
    handleClose();
  };

  const updNavigationHandler = () => {
    const productName = data.name.split(" ").join("_");
    navigate(`/update/${contentType}/${productName}`);

    const updInfo =
      contentType === "cellphone"
        ? {
            _id: data._id,
            name: data.name,
            brand: data.brand,
            year: data.year,
            network: data.network,
            dimensions: data.body?.dimensions,
            weight: data.body?.weight,
            sim: data.body?.sim,
            displayType: data.display?.type,
            displaySize: data.display?.size,
            resolution: data.display?.resolution,
            protection: data.display?.protection,
            os: data.platform?.os,
            chipset: data.platform?.chipset,
            cpu: data.platform?.cpu,
            gpu: data.platform?.gpu,
            cardSlot: data.memory?.cardSlot,
            internalMemory: data.memory?.internal,
            ram: data.memory?.ram,
            mainCameraFeatures: data.mainCamera?.features,
            mainCameraVideo: data.mainCamera?.video,
            selfieCameraFeatures: data.selfieCamera?.features,
            selfieCameraVideo: data.selfieCamera?.video,
            battery: data.battery,
            price: data.price,
            mainCamInfo: data.mainCamera?.picture,
            selfieCamInfo: data.selfieCamera?.picture,
            images: null,
            colors: null,
            sizes: null,
          }
        : { ...data, images: null, colors: null, sizes: null };

    dispatch(setMainCamInfo(updInfo?.mainCamInfo));
    localStorage.setItem("cameraInfo", JSON.stringify(updInfo?.mainCamInfo));
    dispatch(setSelfieCamInfo(updInfo?.selfieCamInfo));
    localStorage.setItem(
      "selfieCameraInfo",
      JSON.stringify(updInfo?.selfieCamInfo)
    );
    dispatch(setProductInfo(updInfo));
    localStorage.setItem("updProductInfo", JSON.stringify(updInfo));
    handleClose();
  };

  const deletehandler = () => {
    handleClose();
    dispatch(toggleDelProductModal(true));
    dispatch(setDelProductModalData({ productId: data._id }));
    dispatch(toggleIsModalOpen(true));
  };

  const mainImage = data.images?.find((image) => image.isMain);

  useEffect(() => {
    if (checkedData.checkedItemIds?.some((itemId) => itemId === data._id)) {
      setIsItemChecked(true);
    } else {
      setIsItemChecked(false);
    }
  }, [checkedData]);

  const checkboxClickHandler = () => {
    if (isItemChecked) {
      setIsItemChecked(false);
      dispatch(removeCheckItem(data._id));
    } else {
      setIsItemChecked(true);
      dispatch(addCheckItem({ contentType, itemId: data._id }));
    }
  };

  return (
    <TableRow
      hover
      className={isItemChecked ? "table-row" : undefined}
      role="checkbox"
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
      }}
    >
      <TableCell padding="checkbox" onClick={checkboxClickHandler}>
        <Checkbox color="secondary" checked={isItemChecked} />
      </TableCell>
      <TableCell component="th" scope="row">
        {data?.name}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Tooltip
          title={TooltipTitle("See full gallery")}
          placement="top"
          TransitionComponent={Zoom}
          arrow
          onClick={() => {
            dispatch(toggleGallery(true));
            dispatch(
              setGalleryData({
                contentType,
                productId: data?._id,
                productName: data?.name,
                images: data?.images,
              })
            );
            dispatch(toggleIsModalOpen(true));
          }}
        >
          <Box
            className={
              contentType === "cellphone" ? "cellphone-image" : "image"
            }
          >
            {mainImage?.imageUrl ? (
              <img
                src={mainImage?.imageUrl}
                alt={data?.name}
                id="table-image"
              />
            ) : (
              <img
                src={
                  contentType === "cellphone" ? placeholderCell : placeholder
                }
                alt="placeholder image"
                id="table-image"
              />
            )}
            <CollectionsIcon id="icon" color="info" />
          </Box>
        </Tooltip>
      </TableCell>
      <TableCell align="center" id="toggle-brand">
        {data?.brand}
      </TableCell>
      {contentType === "accessory" && (
        <TableCell align="center" id="toggle-category">
          {data?.category}
        </TableCell>
      )}
      {contentType === "computer" && (
        <TableCell align="center" id="toggle-type">
          {data?.type}
        </TableCell>
      )}
      {contentType === "cellphone" && (
        <TableCell align="center" id="toggle-year">
          {data?.year}
        </TableCell>
      )}
      {contentType === "tv" && (
        <TableCell align="center" id="toggle-year">
          {data?.year}
        </TableCell>
      )}
      {contentType === "tv" && (
        <TableCell align="center" id="toggle-res">
          {data?.resolution}
        </TableCell>
      )}
      {contentType === "computer" && (
        <TableCell align="center" id="toggle-storage-ram">
          {data?.storage?.size > 2
            ? `${data?.storage?.size} GB`
            : `${data?.storage?.size} TB`}{" "}
          / {data?.ram} GB
        </TableCell>
      )}
      {contentType === "cellphone" && (
        <TableCell align="center" id="toggle-storage-ram">
          {data?.memory?.internal > 2
            ? `${data?.memory?.internal} GB`
            : `${data?.memory?.internal} TB`}{" "}
          / {data?.memory?.ram} GB
        </TableCell>
      )}
      <TableCell
        align="center"
        sx={{
          cursor: "pointer",
        }}
      >
        {contentType === "tv" ? (
          <Tooltip
            title={TooltipTitle(
              data?.sizes?.length === 0
                ? "Click to add size"
                : "Click to see more"
            )}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                width: "170px",
                height: "60px",
                margin: "auto",
                position: "relative",
                transition: "0.2s ease-in-out",
                "&:hover": { color: colors.secondary[500] },
              }}
              onMouseEnter={() => setShowLaunchIcon(true)}
              onMouseLeave={() => setShowLaunchIcon(false)}
              onClick={() => {
                dispatch(toggleSizesModal(true));
                dispatch(
                  setSizesdata({
                    productId: data?._id,
                    sizes: data?.sizes,
                  })
                );
                dispatch(toggleIsModalOpen(true));
              }}
            >
              {data?.sizes?.length === 0 && (
                <Typography variant="h6" color="error">
                  No Sizes!
                </Typography>
              )}
              {data?.sizes?.slice(0, 4).map((size) => (
                <Box
                  key={size._id}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: "25px",
                    height: "25px",
                    border: `1px solid ${colors.light[200]}`,
                    ml: "10px",
                    mt: "5px",
                  }}
                >
                  {size.size}"
                </Box>
              ))}
              {showLaunchIcon && (
                <LaunchIcon
                  sx={{ position: "absolute", right: 0, bottom: "100%" }}
                />
              )}
            </Box>
          </Tooltip>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "170px",
              height: "80px",
              margin: "auto",
              position: "relative",
              transition: "0.2s ease-in-out",
              "&:hover": { color: colors.secondary[500] },
            }}
            onMouseEnter={() => setShowLaunchIcon(true)}
            onMouseLeave={() => setShowLaunchIcon(false)}
            onClick={() => {
              dispatch(toggleColorsModal(true));
              dispatch(
                setColorsData({
                  productId: data._id,
                  colors: data.colors,
                })
              );
              dispatch(toggleIsModalOpen(true));
            }}
          >
            {data?.colors?.length === 0 && (
              <Typography variant="h6" color="error">
                No Colors!
              </Typography>
            )}
            {data?.colors?.slice(0, 4).map((color) => (
              <Tooltip
                key={color._id}
                title={TooltipTitle(color.name)}
                placement="top"
                TransitionComponent={Zoom}
                arrow
              >
                <Box
                  sx={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: color.code,
                    border: `1px solid ${colors.light[200]}`,
                    ml: "10px",
                    mt: "5px",
                  }}
                ></Box>
              </Tooltip>
            ))}
            {showLaunchIcon && (
              <LaunchIcon
                sx={{ position: "absolute", right: 0, bottom: "100%" }}
              />
            )}
          </Box>
        )}
      </TableCell>
      <TableCell align="center" id="toggle-qty">
        {data?.totalQty}
      </TableCell>
      {contentType !== "tv" && (
        <TableCell align="center" id="toggle-price">
          ${data?.price}
        </TableCell>
      )}
      <TableCell align="right">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            position: "relative",
            transition: "0.2s ease-in-out",
            "&:hover": { color: colors.secondary[500] },
          }}
        >
          <SettingsOutlinedIcon sx={{ fontSize: "1.3rem" }} />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          elevation={6}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => detailsNavigationHandler()}>
            <InfoIcon
              color="info"
              sx={{
                mr: "10px",
              }}
            />
            Details
          </MenuItem>
          <MenuItem onClick={() => updNavigationHandler()}>
            <EditIcon
              color="warning"
              sx={{
                mr: "10px",
              }}
            />
            Update
          </MenuItem>
          <MenuItem onClick={deletehandler}>
            <DeleteIcon
              color="error"
              sx={{
                mr: "10px",
              }}
            />
            Delete
          </MenuItem>
        </Menu>
      </TableCell>
    </TableRow>
  );
};

export default ProductContent;
