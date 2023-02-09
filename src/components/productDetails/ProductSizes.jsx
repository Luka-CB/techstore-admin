import { Paper } from "@mui/material";
import TvIcon from "@mui/icons-material/Tv";

const ProductSizes = ({ colors, sizes }) => {
  const textColor = { color: colors.secondary[500] };

  return (
    <div className="product-sizes-container">
      {sizes?.map((size) => (
        <Paper variant="outlined" sx={{ width: 200, borderRadius: 3 }}>
          <div className="product-size-wrapper" key={size._id}>
            <div className="product-size">
              <TvIcon id="icon" />
              <span id="icon-size" style={textColor}>
                {size.size}"
              </span>
            </div>
            <div className="size-info">
              <h4>
                Size: <span style={textColor}>{size.size}"</span>
              </h4>
              <h4>
                Qty: <span style={textColor}>{size.qty}</span>
              </h4>
              <h4>
                Price: <span style={textColor}>${size.price}</span>
              </h4>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default ProductSizes;
