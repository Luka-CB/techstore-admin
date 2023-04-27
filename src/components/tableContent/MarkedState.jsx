import {
  Box,
  Button,
  IconButton,
  Popover,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch, useSelector } from "react-redux";
import { removeAllCheckItems } from "../../redux/features/checkboxSlice";
import CustomAlert from "../CustomAlert";
import Dots from "../Dots";
import {
  toggleErrorAlert,
  toggleSuccessAlert,
} from "../../redux/features/alertSlice";
import { resetDeleteManyProduct } from "../../redux/features/product/deleteManySlice";
import {
  deleteManyProduct,
  getProducts,
} from "../../redux/actions/productActions";
import { resetDeleteCustomers } from "../../redux/features/customers/deleteCustomersSlice";
import {
  deleteCustomers,
  getCustomers,
} from "../../redux/actions/customerActions";
import TooltipTitle from "../TooltipTitle";
import { resetDeleteOrders } from "../../redux/features/orders/deleteOrdersSlice";
import { deleteOrders, getOrders } from "../../redux/actions/orderActions";

const MarkedState = ({ colors, markedItemCount, contentType, markedIds }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { successAlert, errorAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const {
    isLoading: isDeleteProductsLoading,
    isSuccess: isDeleteProductsSuccess,
    successMsg: deleteProductsSuccessMsg,
    errorMsg: deleteProductsErrorMsg,
  } = useSelector((state) => state.deleteManyProduct);
  const {
    isLoading: isDeleteCustomersLoading,
    isSuccess: isDeleteCustomersSuccess,
    successMsg: deleteCustomersSuccessMsg,
    errorMsg: deleteCustomersErrorMsg,
  } = useSelector((state) => state.deleteCustomers);
  const {
    isLoading: isDeleteOrdersLoading,
    isSuccess: isDeleteOrdersSuccess,
    successMsg: deleteOrdersSuccessMsg,
    errorMsg: deleteOrdersErrorMsg,
  } = useSelector((state) => state.deleteOrders);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  useEffect(() => {
    if (isDeleteProductsSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(removeAllCheckItems());
        dispatch(resetDeleteManyProduct());
        dispatch(getProducts({ route, searchQ, page, perPage }));
      }, 3000);
    }
  }, [isDeleteProductsSuccess, dispatch]);

  useEffect(() => {
    if (isDeleteCustomersSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(removeAllCheckItems());
        dispatch(resetDeleteCustomers());
        dispatch(getCustomers({ searchQ, page, perPage }));
      }, 3000);
    }
  }, [isDeleteCustomersSuccess, dispatch]);

  useEffect(() => {
    if (isDeleteOrdersSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(removeAllCheckItems());
        dispatch(resetDeleteOrders());
        dispatch(getOrders({ rppn: 0, orderId: "", userId: "", sortBy: "" }));
      }, 3000);
    }
  }, [isDeleteOrdersSuccess, dispatch]);

  useEffect(() => {
    if (deleteProductsErrorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteManyProduct());
      }, 3000);
    }
  }, [deleteProductsErrorMsg, dispatch]);

  useEffect(() => {
    if (deleteCustomersErrorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteCustomers());
      }, 3000);
    }
  }, [deleteCustomersErrorMsg, dispatch]);

  useEffect(() => {
    if (deleteOrdersErrorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetDeleteOrders());
      }, 3000);
    }
  }, [deleteOrdersErrorMsg, dispatch]);

  const isLoading =
    contentType === "customer"
      ? isDeleteCustomersLoading
      : contentType === "order"
      ? isDeleteOrdersLoading
      : isDeleteProductsLoading;

  const successMsg =
    contentType === "customer"
      ? deleteCustomersSuccessMsg
      : contentType === "order"
      ? deleteOrdersSuccessMsg
      : deleteProductsSuccessMsg;

  const errorMsg =
    contentType === "customer"
      ? deleteCustomersErrorMsg
      : contentType === "order"
      ? deleteOrdersErrorMsg
      : deleteProductsErrorMsg;

  const handleDelete = () => {
    if (contentType === "customer") {
      dispatch(deleteCustomers({ userIds: markedIds }));
    } else if (contentType === "order") {
      dispatch(deleteOrders(markedIds));
    } else {
      dispatch(deleteManyProduct({ route, productIds: markedIds }));
    }

    handleClose();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width={350}
    >
      {successAlert && successMsg ? (
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
      <Typography variant="h6">
        Marked Items:{" "}
        <span style={{ color: colors.secondary[500], fontSize: "1.2rem" }}>
          {markedItemCount}
        </span>
      </Typography>
      <Button
        aria-describedby={id}
        color="error"
        variant="outlined"
        sx={{ width: 120, height: 40, fontSize: "0.8rem" }}
        onClick={handleClick}
        disabled={isLoading}
      >
        {!isLoading && <DeleteIcon sx={{ mr: 1, fontSize: "1.5rem" }} />}
        {isLoading ? <Dots color={colors.danger[500]} /> : "Delete"}
      </Button>
      <Tooltip
        title={TooltipTitle("Cancel")}
        placement="top"
        TransitionComponent={Zoom}
        arrow
      >
        <IconButton
          color="warning"
          onClick={() => dispatch(removeAllCheckItems())}
          disabled={isLoading}
        >
          <CancelIcon sx={{ fontSize: "1.5rem" }} />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box>
          <Typography sx={{ p: 2, fontSize: "0.9rem" }}>
            Are You Sure?
          </Typography>
          <Box display="flex" justifyContent="space-around">
            <Tooltip
              title={TooltipTitle("YES")}
              placement="top"
              TransitionComponent={Zoom}
              arrow
            >
              <IconButton color="success" onClick={handleDelete}>
                <CheckCircleOutlineIcon sx={{ fontSize: "1.9rem" }} />
              </IconButton>
            </Tooltip>
            <Tooltip
              title={TooltipTitle("NO")}
              placement="top"
              TransitionComponent={Zoom}
              arrow
            >
              <IconButton color="warning" onClick={handleClose}>
                <CancelIcon sx={{ fontSize: "1.9rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default MarkedState;
