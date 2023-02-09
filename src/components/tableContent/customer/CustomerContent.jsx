import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Popover,
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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  addCheckItem,
  removeCheckItem,
} from "../../../redux/features/checkboxSlice";
import CustomAlert from "../../CustomAlert";
import { toggleSuccessAlert } from "../../../redux/features/alertSlice";
import { resetChangeAdminStatus } from "../../../redux/features/customers/changeAdminStatusSlice";
import {
  changeAdminStatus,
  getCustomers,
} from "../../../redux/actions/customerActions";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";
import {
  setDelCustomerModalData,
  toggleDelCustomerModal,
} from "../../../redux/features/modals/delCustomerModalSlice";

const CustomerContent = ({ data, contentType }) => {
  const [isItemChecked, setIsItemChecked] = useState(false);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { checkedData } = useSelector((state) => state.checkbox);
  const { successAlert } = useSelector((state) => state.alert);
  const { page, perPage, searchQ } = useSelector((state) => state.filter);
  const {
    isLoading: isChangeStatusLoading,
    isSuccess: isChangeStatusSuccess,
    successMsg: changeStatusSuccessMsg,
  } = useSelector((state) => state.changeAdminStatus);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [configAnchorEl, setConfigAnchorEl] = useState(null);
  const openConfig = Boolean(configAnchorEl);
  const handleConfigClick = (event) => {
    setConfigAnchorEl(event.currentTarget);
  };
  const handleConfigClose = () => {
    setConfigAnchorEl(null);
  };

  const [statusAnchorEl, setStatusAnchorEl] = useState(null);
  const handleStatusClick = (event) => {
    setStatusAnchorEl(event.currentTarget);
  };
  const handleStatusClose = () => {
    setStatusAnchorEl(null);
  };
  const openStatus = Boolean(statusAnchorEl);
  const id = openStatus ? "status-popover" : undefined;

  const updNavigationHandler = () => {};

  const deletehandler = () => {
    handleConfigClose();
    dispatch(toggleDelCustomerModal(true));
    dispatch(
      setDelCustomerModalData({
        customerId: data._id,
        username: data?.username,
      })
    );
    dispatch(toggleIsModalOpen(true));
  };

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

  useEffect(() => {
    if (isChangeStatusSuccess) {
      dispatch(toggleSuccessAlert(true));
      setTimeout(() => {
        dispatch(toggleSuccessAlert(false));
        dispatch(resetChangeAdminStatus());
        dispatch(getCustomers({ searchQ, page, perPage }));
      }, 3000);
    }
  }, [isChangeStatusSuccess, dispatch]);

  return (
    <>
      {successAlert && isChangeStatusSuccess && (
        <CustomAlert
          severity="success"
          value={changeStatusSuccessMsg}
          transitionState={successAlert}
        />
      )}
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
        <TableCell align="left">{data?._id}</TableCell>
        <TableCell align="center">{data?.username}</TableCell>
        <TableCell align="center">
          {data?.email ? (
            data.email
          ) : (
            <CloseIcon color="error" sx={{ fontSize: "1.3rem" }} />
          )}
        </TableCell>
        <TableCell align="center">{data?.provider}</TableCell>
        <TableCell align="center">
          {data?.providerId ? (
            data.providerId
          ) : (
            <CloseIcon color="error" sx={{ fontSize: "1.3rem" }} />
          )}
        </TableCell>
        <TableCell align="center">{data?.createdAt}</TableCell>
        <Tooltip
          title={data?.username !== "admin" ? "Change Status" : undefined}
          placement="top"
          TransitionComponent={Zoom}
          arrow
        >
          <TableCell
            align="center"
            sx={{ cursor: "pointer" }}
            id={id}
            onClick={handleStatusClick}
          >
            {data?.isAdmin ? (
              <CheckIcon color="success" sx={{ fontSize: "1.3rem" }} />
            ) : (
              <CloseIcon color="error" sx={{ fontSize: "1.3rem" }} />
            )}
          </TableCell>
        </Tooltip>
        <Popover
          id={id}
          open={openStatus}
          anchorEl={statusAnchorEl}
          onClose={handleStatusClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Box
            width={120}
            height={60}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            {data?.username === "admin" ? (
              <CheckIcon color="success" sx={{ fontSize: "3rem" }} />
            ) : (
              <>
                <Tooltip
                  title="Remove Admin Status"
                  placement="top"
                  TransitionComponent={Zoom}
                  arrow
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="error"
                      disabled={!data?.isAdmin}
                      onClick={() => dispatch(changeAdminStatus(data?._id))}
                    >
                      <CloseIcon sx={{ fontSize: "1.9rem" }} />
                    </IconButton>
                    {isChangeStatusLoading && data?.isAdmin && (
                      <CircularProgress
                        color="error"
                        sx={{ position: "absolute" }}
                      />
                    )}
                  </Box>
                </Tooltip>
                <Tooltip
                  title="Make Admin"
                  placement="top"
                  TransitionComponent={Zoom}
                  arrow
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      color="success"
                      disabled={data?.isAdmin}
                      onClick={() => dispatch(changeAdminStatus(data?._id))}
                    >
                      <CheckIcon sx={{ fontSize: "1.9rem" }} />
                    </IconButton>
                    {isChangeStatusLoading && !data?.isAdmin && (
                      <CircularProgress
                        color="success"
                        sx={{ position: "absolute" }}
                      />
                    )}
                  </Box>
                </Tooltip>
              </>
            )}
          </Box>
        </Popover>

        <TableCell align="right">
          <IconButton
            id="config-button"
            aria-controls={openConfig ? "config-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openConfig ? "true" : undefined}
            onClick={handleConfigClick}
            sx={{
              position: "relative",
              transition: "0.2s ease-in-out",
              "&:hover": { color: colors.secondary[500] },
            }}
          >
            <SettingsOutlinedIcon sx={{ fontSize: "1.3rem" }} />
          </IconButton>
          <Menu
            id="config-menu"
            anchorEl={configAnchorEl}
            open={openConfig}
            onClose={handleConfigClose}
            MenuListProps={{
              "aria-labelledby": "config-button",
            }}
            elevation={6}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
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
    </>
  );
};

export default CustomerContent;
