import { Box, Tooltip, Typography, useTheme, Zoom } from "@mui/material";
import { colorPallets } from "../../theme";
import TooltipTitle from "../TooltipTitle";

const Sizes = ({ sizes, setSizes }) => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const removeSizeHandler = (size) => {
    const newSizes = sizes.filter((s) => s.size !== size);
    setSizes(newSizes);
    localStorage.setItem("formTvSizes", JSON.stringify(newSizes));
  };

  return (
    <Box
      className="input-sizes"
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
      <Typography width={100} variant="h6" color={colors.light[600]}>
        Chosen Sizes:
      </Typography>
      <Box className="sizes-wrapper">
        {sizes.map((size) => (
          <Tooltip
            title={TooltipTitle("Double Click to Remove Size")}
            arrow
            TransitionComponent={Zoom}
            key={size.size}
          >
            <Box
              onDoubleClick={() => removeSizeHandler(size.size)}
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
              <Typography variant="body2">S: {size.size}"</Typography>
              <Typography variant="body2">Q: {size.qty}</Typography>
              <Typography variant="body2">P: ${size.price}</Typography>
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default Sizes;
