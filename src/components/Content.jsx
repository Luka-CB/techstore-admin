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
import { colorPallets } from "../theme";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LaunchIcon from "@mui/icons-material/Launch";
import CollectionsIcon from "@mui/icons-material/Collections";
import { toggleIsModalOpen } from "../redux/features/stateSlice";
import { setGalleryData, toggleGallery } from "../redux/features/gallerySlice";
import placeholder from "../assets/images/placeholder.jpg";
import { setProductInfo } from "../redux/features/updProductInfoSlice";
import {
  setSizesdata,
  toggleSizesModal,
} from "../redux/features/modals/sizesModalSlice";
import {
  setDelProductModalData,
  toggleDelProductModal,
} from "../redux/features/modals/delProductModalSlice";
import { addCheckItem, removeCheckItem } from "../redux/features/checkboxSlice";

const dummyColors = [
  {
    _id: 1,
    name: "Graphite",
    code: "#1a2129",
    qty: 7,
  },
  {
    _id: 2,
    name: "Silver",
    code: "#f9f4f0",
    qty: 0,
  },
  {
    _id: 3,
    name: "Gold",
    code: "#fee2de",
    qty: 4,
  },
  {
    _id: 4,
    name: "Sierra Blue",
    code: "#256080",
    qty: 8,
  },
  {
    _id: 5,
    name: "Alpine Green",
    code: "#586958",
    qty: 3,
  },
];

const Content = ({ data, loading, contentType }) => {
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

  const navigationHandler = () => {
    const name = data.name.split(" ").join("_");
    navigate(`/update/${contentType}/${name}`);

    const updInfo =
      contentType === "tv"
        ? { ...data, images: null, sizes: null }
        : { ...data, images: null, colors: null };
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

  // useEffect(() => {
  //   if (isItemChecked) {
  //     dispatch(addCheckItem(data._id));
  //   } else {
  //     dispatch(removeCheckItem(data._id));
  //   }
  // }, [isItemChecked, dispatch]);

  const checkboxClickHandler = () => {
    if (isItemChecked) {
      setIsItemChecked(false);
      dispatch(removeCheckItem(data._id));
    } else {
      setIsItemChecked(true);
      dispatch(addCheckItem(data._id));
    }
  };

  return (
    <TableRow
      hover
      className="table-row"
      role="checkbox"
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell padding="checkbox" onClick={checkboxClickHandler}>
        <Checkbox color="secondary" checked={isItemChecked} />
      </TableCell>
      <TableCell component="th" scope="row">
        {data.name}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tooltip
          title="See full gallery"
          placement="top"
          TransitionComponent={Zoom}
          arrow
          onClick={() => {
            dispatch(toggleGallery(true));
            dispatch(
              setGalleryData({
                contentType,
                productId: data._id,
                images: data.images,
              })
            );
            dispatch(toggleIsModalOpen(true));
          }}
        >
          <Box className="image">
            {mainImage?.imageUrl ? (
              <img src={mainImage.imageUrl} alt={data.name} id="table-image" />
            ) : (
              <img src={placeholder} alt="placeholder image" id="table-image" />
            )}
            <CollectionsIcon id="icon" color="info" />
          </Box>
        </Tooltip>
      </TableCell>
      <TableCell align="center">{data.brand}</TableCell>
      {contentType === "computer" ? (
        <TableCell align="center">All-In-One</TableCell>
      ) : (
        <TableCell align="center">{data.year}</TableCell>
      )}
      {contentType === "tv" ? (
        <TableCell align="center">{data.resolution}</TableCell>
      ) : (
        <TableCell align="center">256 GB / 8 GB</TableCell>
      )}
      <TableCell
        align="center"
        sx={{
          cursor: "pointer",
        }}
      >
        {contentType === "tv" ? (
          <Tooltip
            title={
              data.sizes.length === 0
                ? "Click to add size"
                : "Click to see more"
            }
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
                    productId: data._id,
                    sizes: data.sizes,
                  })
                );
                dispatch(toggleIsModalOpen(true));
              }}
            >
              {data.sizes.length === 0 && (
                <Typography variant="h6" color="error">
                  No Sizes!
                </Typography>
              )}
              {data.sizes.slice(0, 4).map((size) => (
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
            flexWrap="wrap"
            sx={{
              width: "170px",
              height: "100%",
              margin: "auto",
            }}
          >
            {dummyColors.map((color) => (
              <Tooltip
                key={color._id}
                title={color.name}
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
          </Box>
        )}
      </TableCell>
      <TableCell align="center">{data.totalQty}</TableCell>
      {contentType !== "tv" && <TableCell align="center">$859.99</TableCell>}
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
          <MenuItem onClick={() => navigationHandler()}>
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

export default Content;
