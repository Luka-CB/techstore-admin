import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Checkbox,
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

const OrderContent = ({ data, contentType }) => {
  const [isItemChecked, setIsItemChecked] = useState(false);
  const [showLaunchIcon, setShowLaunchIcon] = useState(false);

  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { checkedData } = useSelector((state) => state.checkbox);

  const dispatch = useDispatch();

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
    <>
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
        <TableCell align="center">
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
              <CloseIcon color="error" sx={{ fontSize: "1.3rem" }} />
            )}
          </Tooltip>
        </TableCell>
        <TableCell align="right">
          <Tooltip
            title={TooltipTitle("Delete Order")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            <IconButton>
              <DeleteIcon color="error" sx={{ fontSize: "1.7rem" }} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderContent;
