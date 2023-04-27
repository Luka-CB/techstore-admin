import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { getOrders } from "../../../redux/actions/orderActions";

const SearchOrder = () => {
  const [isInputActive, setIsInputActive] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [userId, setUserId] = useState("");
  const [searchBy, setSearchBy] = useState("order id");

  const dispatch = useDispatch();

  const handleCleanInput = () => {
    setIsInputActive(false);
    setOrderId("");
    setUserId("");
  };

  useEffect(() => {
    if (orderId || userId) {
      setIsInputActive(true);
    } else {
      setIsInputActive(false);
    }

    if (searchBy === "order id") {
      setUserId("");
    } else {
      setOrderId("");
    }
  }, [orderId, userId, searchBy]);

  const handleSearch = () => {
    dispatch(getOrders({ rppn: 0, orderId, userId }));
    setOrderId("");
    setUserId("");
    setIsInputActive(false);
  };

  return (
    <Box
      width={450}
      position="relative"
      sx={{ display: "flex", alignItems: "flex-end" }}
      className="search-order"
    >
      <Select
        color="secondary"
        variant="standard"
        value={searchBy}
        sx={{ mr: 2, width: 100 }}
        onChange={(e) => setSearchBy(e.target.value)}
      >
        <MenuItem value="order id">Order Id</MenuItem>
        <MenuItem value="user id">User Id</MenuItem>
      </Select>
      {searchBy === "user id" ? (
        <TextField
          id="input-with-sx"
          label="search by user id"
          variant="standard"
          color="secondary"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          fullWidth
        />
      ) : (
        <TextField
          id="input-with-sx"
          label="search by order id"
          variant="standard"
          color="secondary"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          fullWidth
        />
      )}
      <Button
        variant="outlined"
        color="secondary"
        sx={{ ml: 1, width: 120 }}
        disabled={!isInputActive}
        onClick={handleSearch}
      >
        <SearchIcon
          color={!isInputActive ? "disabled" : "secondary"}
          sx={{ fontSize: "1.5rem", mr: 0.3 }}
        />
        <span
          style={{
            color: !isInputActive ? "rgba(240, 248, 255, 0.352)" : "aliceblue",
          }}
        >
          Search
        </span>
      </Button>
      {isInputActive ? (
        <Tooltip>
          <IconButton
            onClick={handleCleanInput}
            color="secondary"
            sx={{ position: "absolute", right: 90 }}
          >
            <CloseIcon sx={{ fontSize: "0.8rem" }} />
          </IconButton>
        </Tooltip>
      ) : null}
    </Box>
  );
};

export default SearchOrder;
