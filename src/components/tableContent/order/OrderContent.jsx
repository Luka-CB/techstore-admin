import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { colorPallets } from "../../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import LaunchIcon from "@mui/icons-material/Launch";
import {
  addCheckItem,
  removeCheckItem,
} from "../../../redux/features/checkboxSlice";
import TooltipTitle from "../../TooltipTitle";
import {
  setItems,
  toggleItemsModal,
} from "../../../redux/features/orders/orderItemsSlice";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";
import CustomAlert from "../../CustomAlert";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../../redux/features/alertSlice";
import { resetUpdateDeliveredState } from "../../../redux/features/orders/updateDeliveredStateSlice";
import {
  getOrders,
  updateDeliveredState,
} from "../../../redux/actions/orderActions";
import {
  setDelOrderModalData,
  toggleDelOrderModal,
} from "../../../redux/features/modals/delOrderModalSlice";

const OrderContent = ({ data, contentType, index }) => {
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [showLaunchIcon, setShowLaunchIcon] = useState(false);
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [orderIndex, setOrderIndex] = useState(null);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { checkedData } = useSelector((state) => state.checkbox);
  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { isLoading, isSuccess, successMsg, errorMsg } = useSelector(
    (state) => state.updateDeliveredState
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (checkedData.checkedItemIds?.some((itemId) => itemId === data.orderId)) {
      setIsItemChecked(true);
    } else {
      setIsItemChecked(false);
    }
  }, [checkedData]);

  const checkboxClickHandler = () => {
    if (isItemChecked) {
      setIsItemChecked(false);
      dispatch(removeCheckItem(data.orderId));
    } else {
      setIsItemChecked(true);
      dispatch(addCheckItem({ contentType, itemId: data.orderId }));
    }
  };

  const handleOpenOrderItemsModal = () => {
    dispatch(toggleItemsModal(true));
    dispatch(toggleIsModalOpen(true));
    dispatch(setItems(data.items));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetUpdateDeliveredState());
        dispatch(getOrders({ rppn: 0, orderId: "", userId: "", sortBy: "" }));
      }, 2000);
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetUpdateDeliveredState());
      }, 2000);
    }
  }, [errorMsg, dispatch]);

  const handleOpenDeleteModal = () => {
    dispatch(
      setDelOrderModalData({
        orderId: data.orderId,
        userId: data?.author?._id,
      })
    );
    dispatch(toggleDelOrderModal(true));
    dispatch(toggleIsModalOpen(true));
  };

  return (
    <>
      {successAlert && isSuccess ? (
        <CustomAlert
          severity="success"
          value={successMsg}
          transitionState={successAlert}
        />
      ) : null}
      {errorAlert && errorMsg ? (
        <CustomAlert
          severity="error"
          value={errorMsg}
          transitionState={errorAlert}
        />
      ) : null}
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
        <TableCell align="left">{data?.orderId}</TableCell>
        <TableCell align="center">{data?.author?.username}</TableCell>
        <Tooltip
          title={TooltipTitle(
            data?.items?.length <= 1 ? `See Item` : `See Items`
          )}
          placement="top-start"
          TransitionComponent={Zoom}
          arrow
        >
          <TableCell
            align="center"
            sx={{
              position: "relative",
              cursor: "pointer",
              transition: "0.2s ease-in-out",
              "&:hover": {
                color: colors.secondary[500],
                boxShadow: "0 0 3px rgba(0, 0, 0, 0.5)",
              },
            }}
            onMouseEnter={() => setShowLaunchIcon(true)}
            onMouseLeave={() => setShowLaunchIcon(false)}
            onClick={handleOpenOrderItemsModal}
          >
            <Typography>
              {data?.items?.length <= 1
                ? `${data?.items?.length} Item`
                : `${data?.items?.length} Items`}
            </Typography>
            {showLaunchIcon ? (
              <LaunchIcon
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              />
            ) : null}
          </TableCell>
        </Tooltip>
        <TableCell align="center">${data?.totalPrice?.toFixed(2)}</TableCell>
        <TableCell align="center">{data?.createdAt}</TableCell>
        <TableCell align="center">
          <Tooltip
            title={TooltipTitle(
              data?.isPaid ? `Paid - ${data?.payDate}` : "Not Paid"
            )}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            {data?.isPaid ? (
              <CheckIcon color="success" sx={{ fontSize: "1.3rem" }} />
            ) : (
              <CloseIcon color="error" sx={{ fontSize: "1.3rem" }} />
            )}
          </Tooltip>
        </TableCell>
        <TableCell
          align="center"
          sx={{ position: "relative", cursor: "pointer" }}
          onMouseEnter={() => setShowCheckIcon(true)}
          onMouseLeave={() => setShowCheckIcon(false)}
        >
          <Tooltip
            title={TooltipTitle(
              data?.isDelivered
                ? `Delivered - ${data?.deliverDate}`
                : "Not Delivered"
            )}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            {data?.isDelivered ? (
              <CheckIcon color="success" sx={{ fontSize: "1.3rem" }} />
            ) : (
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CloseIcon color="error" sx={{ fontSize: "1.3rem" }} />

                {isLoading && orderIndex === index ? (
                  <CircularProgress
                    color="error"
                    sx={{
                      position: "absolute",
                    }}
                  />
                ) : null}
              </Box>
            )}
          </Tooltip>
          {showCheckIcon && !data.isDelivered ? (
            <Tooltip
              title={TooltipTitle("Change Status to Delivered")}
              placement="top"
              TransitionComponent={Zoom}
              arrow
            >
              <IconButton
                color="success"
                sx={{ position: "absolute", top: 0, right: 0 }}
                onClick={() => {
                  dispatch(updateDeliveredState(data.orderId));
                  setOrderIndex(index);
                }}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </TableCell>
        <TableCell align="right">
          <Tooltip
            title={TooltipTitle("Delete Order")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            <IconButton onClick={handleOpenDeleteModal}>
              <DeleteIcon color="error" sx={{ fontSize: "1.7rem" }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderContent;
