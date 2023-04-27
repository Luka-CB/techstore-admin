import { Box, Tooltip, Typography, useTheme, Zoom } from "@mui/material";
import { colorPallets } from "../../theme";
import TooltipTitle from "../TooltipTitle";

const Colors = ({ productColors, setColors, storageName }) => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const removeColorHandler = (name) => {
    const newColors = productColors.filter((c) => c.name !== name);
    setColors(newColors);
    localStorage.setItem(storageName, JSON.stringify(newColors));
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        p: "10px",
        mt: "20px",
        width: "100%",
        minHeight: "20px",
        backgroundColor:
          theme.palette.mode === "dark" ? colors.light[900] : colors.light[300],
        borderRadius: "15px",
      }}
    >
      <Typography width={130} variant="h6" color={colors.light[600]}>
        Chosen Colors:
      </Typography>
      <Box className="colors-wrapper">
        {productColors.map((color) => (
          <Tooltip
            title={TooltipTitle("Double Click to Remove Color")}
            arrow
            TransitionComponent={Zoom}
            key={color.name}
          >
            <Box
              onDoubleClick={() => removeColorHandler(color.name)}
              sx={{
                minWidth: 60,
                maxWidth: 120,
                backgroundColor: colors.light[100],
                ml: "10px",
                p: "5px",
                color: colors.light[900],
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(224, 14, 243, 0.233)",
                transition: "0.2s ease-in-out",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "rgb(190, 179, 179)"
                      : "rgb(85, 85, 85)",
                },
              }}
            >
              <Typography variant="body2" textTransform="capitalize">
                Name: {color.name}
              </Typography>
              <Box
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Typography variant="body2">Color:</Typography>
                <div
                  style={{
                    marginLeft: "5px",
                    display: "inline-block",
                    width: "15px",
                    height: "15px",
                    backgroundColor: color.code,
                    boxShadow: "0 0 1px black",
                  }}
                ></div>
              </Box>
              <Typography variant="body2">Quantity: {color.qty}</Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default Colors;
