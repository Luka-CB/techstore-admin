import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllCheckItems,
  removeAllCheckItems,
} from "../../../redux/features/checkboxSlice";

const OrderTableHead = ({ content, contentType }) => {
  const { checkedData } = useSelector((state) => state.checkbox);

  const dispatch = useDispatch();

  const checkAllItemHandler = (checkState) => {
    const itemIds = content.map((item) => item._id);

    if (checkState) {
      dispatch(addAllCheckItems({ contentType, itemIds }));
    } else {
      dispatch(removeAllCheckItems());
    }
  };

  const checkedItemCount = checkedData?.checkedItemIds?.length;
  const rowCount = content?.length;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="secondary"
            indeterminate={checkedItemCount > 0 && checkedItemCount < rowCount}
            checked={rowCount > 0 && checkedItemCount === rowCount}
            onChange={(e) => checkAllItemHandler(e.target.checked)}
          />
        </TableCell>
        <TableCell sx={{ fontSize: "0.7rem" }}>Order ID</TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          Username
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          Ordered Items
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          Total Price
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          Creation date
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          is Paid
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          Is Delivered
        </TableCell>
        <TableCell align="right" sx={{ fontSize: "0.7rem" }}>
          Delete
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default OrderTableHead;
