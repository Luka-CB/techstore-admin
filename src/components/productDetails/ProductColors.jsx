import { Paper } from "@mui/material";

const ProductColors = ({ themeColors, colors }) => {
  const textColor = { color: themeColors.secondary[500] };

  return (
    <div className="product-colors-container">
      {colors?.map((color) => (
        <Paper variant="outlined" sx={{ minWidth: 200, borderRadius: 3 }}>
          <div className="product-color-wrapper" key={color._id}>
            <div className="product-color">
              <span
                id="display-color"
                style={{
                  backgroundColor: color.code,
                  boxShadow: `0 0 8px ${color.code}`,
                }}
              ></span>
            </div>
            <div className="color-info">
              <h4>
                Name: <span style={textColor}>{color.name}</span>
              </h4>
              <h4>
                Code: <span style={textColor}>{color.code}</span>
              </h4>
              <h4>
                Qty: <span style={textColor}>${color.qty}</span>
              </h4>
            </div>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default ProductColors;
