import {
  Box,
  Button,
  FormLabel,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../redux/actions/adminActions";
import { resetAuth } from "../redux/features/admin/authSlice";
import { toggleErrorAlert } from "../redux/features/alertSlice";
import { colorPallets } from "../theme";
import CustomAlert from "./CustomAlert";
import Dots from "./Dots";

const SignIn = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, isSuccess, errorMsg } = useSelector((state) => state.auth);
  const { errorAlert } = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(loginAdmin({ username, password }));
  };

  useEffect(() => {
    if (errorMsg) {
      dispatch(toggleErrorAlert(true));
      setTimeout(() => {
        dispatch(toggleErrorAlert(false));
        dispatch(resetAuth());
      }, 3000);
    }
  }, [errorMsg, dispatch]);

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      sx={{
        backgroundColor: "rgba(245, 245, 245, 0.364)",
        backdropFilter: "blur(8px)",
        zIndex: 10001,
      }}
    >
      <CustomAlert
        severity={"error"}
        transitionState={errorAlert}
        value={errorMsg}
      />
      <Paper
        elevation={12}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "450px",
          padding: "15px",
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Authenticate to Use this App
        </Typography>
        <form onSubmit={submitHandler}>
          <Box display="flex" flexDirection="column" mt="30px">
            <TextField
              id="outlined-basic"
              color="secondary"
              placeholder="admin"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              id="outlined-basic"
              color="secondary"
              placeholder="123456"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mt: "40px" }}
              required
            />

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{ fontSize: "1.3rem", mt: "50px", height: "50px" }}
            >
              {isLoading ? <Dots /> : "Sign In"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SignIn;
