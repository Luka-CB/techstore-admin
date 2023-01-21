import { Alert, AlertTitle, Typography, Zoom } from "@mui/material";

const CustomAlert = ({
  variant = "filled",
  severity,
  value,
  transitionState,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "550px",
        zIndex: "10005",
      }}
    >
      <Zoom in={transitionState}>
        <Alert severity={severity} variant={variant}>
          <AlertTitle color="white" sx={{ textTransform: "uppercase" }}>
            {severity}
          </AlertTitle>
          <Typography variant="h6" color="whitesmoke">
            {value}
          </Typography>
        </Alert>
      </Zoom>
    </div>
  );
};

export default CustomAlert;
