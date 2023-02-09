import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addAllCheckItems,
  removeAllCheckItems,
} from "../../../redux/features/checkboxSlice";

const ProductTableHead = ({ content, contentType }) => {
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
        <TableCell sx={{ fontSize: "0.7rem" }}>Product Name</TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          Image
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          Brand
        </TableCell>
        {contentType === "accessory" && (
          <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
            Category
          </TableCell>
        )}
        {contentType === "computer" && (
          <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
            Type
          </TableCell>
        )}
        {contentType === "cellphone" && (
          <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
            Year
          </TableCell>
        )}
        {contentType === "tv" && (
          <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
            Year
          </TableCell>
        )}
        {contentType === "tv" && (
          <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
            Resolution
          </TableCell>
        )}
        {contentType === "computer" && (
          <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
            Storage/Ram
          </TableCell>
        )}
        {contentType === "cellphone" && (
          <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
            Storage/Ram
          </TableCell>
        )}
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          {contentType === "tv" ? "Sizes" : "Colors"}
        </TableCell>
        <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
          Quantity
        </TableCell>
        {contentType !== "tv" && (
          <TableCell align="center" sx={{ fontSize: "0.7rem" }}>
            Price
          </TableCell>
        )}
        <TableCell align="right" sx={{ fontSize: "0.7rem" }}>
          Settings
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default ProductTableHead;
