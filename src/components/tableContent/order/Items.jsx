import React from "react";
import { Box, IconButton, Paper, Slide, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import {
  setItems,
  toggleItemsModal,
} from "../../../redux/features/orders/orderItemsSlice";
import { toggleIsModalOpen } from "../../../redux/features/stateSlice";

const Items = () => {
  const { isItemsModalOpen, items } = useSelector((state) => state.orderItems);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleItemsModal(false));
    dispatch(toggleIsModalOpen(false));
    dispatch(setItems([]));
  };

  return (
    <Box className="order-items-bg" onClick={handleCloseModal}>
      <Slide direction="down" in={isItemsModalOpen}>
        <Paper
          elevation={12}
          onClick={(e) => e.stopPropagation()}
          className="gallery"
        >
          <Box className="order-items-header">
            <Typography variant="h4">Order Items - {items.length}</Typography>
            <IconButton
              color="error"
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
              }}
              onClick={handleCloseModal}
            >
              <CancelIcon sx={{ fontSize: "1.6rem" }} />
            </IconButton>
          </Box>
          <Box className="order-items">
            {items.map((item) => (
              <Paper key={item._id} className="item">
                <Box className="header">
                  <Typography color="secondary" variant="h6">
                    ID:{" "}
                    <span
                      style={{
                        fontSize: "smaller",
                        color: "aliceblue",
                        fontWeight: 100,
                      }}
                    >
                      {item.itemId}
                    </span>
                  </Typography>
                  {item.itemType === "tvs" ? (
                    <>
                      <div className="size-wrapper">
                        <Typography color="secondary" variant="h6">
                          size:
                        </Typography>
                        <div id="size">
                          <span>{item.size}"</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="color-wrapper">
                        <Typography color="secondary" variant="h6">
                          color:
                        </Typography>
                        <div
                          title={item?.color?.name}
                          id="color"
                          style={{ backgroundColor: item?.color?.code }}
                        ></div>
                      </div>
                    </>
                  )}
                  <Typography color="secondary" variant="h6">
                    qty:{" "}
                    <b
                      style={{
                        color: "aliceblue",
                        fontWeight: 100,
                      }}
                    >
                      {item.qty}
                    </b>
                  </Typography>
                </Box>
                <hr />
                <Box className="body">
                  <div className="col1">
                    <div className="image">
                      <img src={item.imageUrl} alt="Item Image" />
                    </div>
                  </div>
                  <div className="col2">
                    <h2 id="name">{item.name}</h2>
                    <div className="price">
                      <h3>Price: </h3>
                      <span>
                        {item.qty > 1
                          ? `$${item.price} x ${item.qty} = $${
                              item.price * item.qty
                            }`
                          : "$" + item.price}
                      </span>
                    </div>
                    <div className="type">
                      <h3>Item Type:</h3>
                      <span>{item.itemType}</span>
                    </div>
                  </div>
                </Box>
              </Paper>
            ))}
          </Box>
        </Paper>
      </Slide>
    </Box>
  );
};

export default Items;
