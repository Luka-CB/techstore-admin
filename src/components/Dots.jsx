import { useTheme } from "@mui/material";
import { colorPallets } from "../theme";

const Dots = ({ color }) => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  return (
    <div className="dots-cont">
      <span
        className="dot dot-1"
        style={{ backgroundColor: !color ? colors.secondary[300] : color }}
      ></span>
      <span
        className="dot dot-2"
        style={{ backgroundColor: !color ? colors.secondary[300] : color }}
      ></span>
      <span
        className="dot dot-3"
        style={{ backgroundColor: !color ? colors.secondary[300] : color }}
      ></span>
    </div>
  );
};

export default Dots;
