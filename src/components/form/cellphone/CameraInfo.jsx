import {
  Box,
  Divider,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { colorPallets } from "../../../theme";
import {
  setMainCamInfo,
  setSelfieCamInfo,
  toggleMainCamInfoErrState,
  toggleSelfieCamInfoErrState,
} from "../../../redux/features/cameraInfoSlice";

const types = ["single", "double", "triple", "quad"];

const CameraInfo = ({ values, handleChange, touched, handleBlur, errors }) => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { mainCamInfoErr, selfieCamInfoErr } = useSelector(
    (state) => state.cameraInfo
  );

  const dispatch = useDispatch();

  const [cameraType, setCameraType] = useState(
    localStorage.getItem("cameraInfo")
      ? JSON.parse(localStorage.getItem("cameraInfo")).type
      : ""
  );
  const [selfieCameraType, setSelfieCameraType] = useState(
    localStorage.getItem("selfieCameraInfo")
      ? JSON.parse(localStorage.getItem("selfieCameraInfo")).type
      : ""
  );

  const [mainCamDetail1, setMainCamDetail1] = useState(
    localStorage.getItem("cameraInfo")
      ? JSON.parse(localStorage.getItem("cameraInfo")).details[0]
      : ""
  );
  const [mainCamDetail2, setMainCamDetail2] = useState(
    localStorage.getItem("cameraInfo")
      ? JSON.parse(localStorage.getItem("cameraInfo")).details[1]
      : ""
  );
  const [mainCamDetail3, setMainCamDetail3] = useState(
    localStorage.getItem("cameraInfo")
      ? JSON.parse(localStorage.getItem("cameraInfo")).details[2]
      : ""
  );
  const [mainCamDetail4, setMainCamDetail4] = useState(
    localStorage.getItem("cameraInfo")
      ? JSON.parse(localStorage.getItem("cameraInfo")).details[3]
      : ""
  );

  const [selfieCamDetail1, setSelfieCamDetail1] = useState(
    localStorage.getItem("selfieCameraInfo")
      ? JSON.parse(localStorage.getItem("selfieCameraInfo")).details[0]
      : ""
  );
  const [selfieCamDetail2, setSelfieCamDetail2] = useState(
    localStorage.getItem("selfieCameraInfo")
      ? JSON.parse(localStorage.getItem("selfieCameraInfo")).details[1]
      : ""
  );

  const mainCamDetailNum =
    cameraType === "single"
      ? 1
      : cameraType === "double"
      ? 2
      : cameraType === "triple"
      ? 3
      : cameraType === "quad"
      ? 4
      : 0;

  const selfieCamDetailNum =
    selfieCameraType === "single" ? 1 : selfieCameraType === "double" ? 2 : 0;

  useEffect(() => {
    if (cameraType) {
      dispatch(
        setMainCamInfo({
          type: cameraType,
          details:
            cameraType === "single"
              ? [mainCamDetail1]
              : cameraType === "double"
              ? [mainCamDetail1, mainCamDetail2]
              : cameraType === "triple"
              ? [mainCamDetail1, mainCamDetail2, mainCamDetail3]
              : cameraType === "quad"
              ? [mainCamDetail1, mainCamDetail2, mainCamDetail3, mainCamDetail4]
              : [],
        })
      );
      localStorage.setItem(
        "cameraInfo",
        JSON.stringify({
          type: cameraType,
          details:
            cameraType === "single"
              ? [mainCamDetail1]
              : cameraType === "double"
              ? [mainCamDetail1, mainCamDetail2]
              : cameraType === "triple"
              ? [mainCamDetail1, mainCamDetail2, mainCamDetail3]
              : cameraType === "quad"
              ? [mainCamDetail1, mainCamDetail2, mainCamDetail3, mainCamDetail4]
              : [],
        })
      );
    }

    if (selfieCameraType) {
      dispatch(
        setSelfieCamInfo({
          type: selfieCameraType,
          details:
            selfieCameraType === "single"
              ? [selfieCamDetail1]
              : selfieCameraType === "double"
              ? [selfieCamDetail1, selfieCamDetail2]
              : [],
        })
      );
      localStorage.setItem(
        "selfieCameraInfo",
        JSON.stringify({
          type: selfieCameraType,
          details:
            selfieCameraType === "single"
              ? [selfieCamDetail1]
              : selfieCameraType === "double"
              ? [selfieCamDetail1, selfieCamDetail2]
              : [],
        })
      );
    }
  }, [
    dispatch,
    cameraType,
    mainCamDetail1,
    mainCamDetail2,
    mainCamDetail3,
    mainCamDetail4,
    selfieCameraType,
    selfieCamDetail1,
    selfieCamDetail2,
  ]);

  useEffect(() => {
    if (cameraType === "single") {
      setMainCamDetail2("");
      setMainCamDetail3("");
    }

    if (cameraType === "double") {
      setMainCamDetail3("");
      setMainCamDetail4("");
    }

    if (cameraType === "triple") {
      setMainCamDetail4("");
    }
  }, [cameraType]);

  useEffect(() => {
    if (selfieCameraType === "single") {
      setSelfieCamDetail2("");
    }
  }, [selfieCameraType]);

  useEffect(() => {
    if (cameraType) {
      dispatch(toggleMainCamInfoErrState(false));
    }

    if (selfieCameraType) {
      dispatch(toggleSelfieCamInfoErrState(false));
    }
  }, [dispatch, cameraType, selfieCameraType]);

  return (
    <>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{
          mt: "30px",
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: "5px",
          color:
            theme.palette.mode === "dark"
              ? colors.light[800]
              : colors.light[400],
        }}
      >
        main camera
      </Divider>
      <Box mt="30px" display="flex" justifyContent="space-between" width="90%">
        <Paper
          variant="outlined"
          sx={{
            borderColor: mainCamInfoErr && colors.danger[500],
            width: "100%",
            p: "5px 5px 15px 5px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "5px",
            }}
            color={
              mainCamInfoErr
                ? "error"
                : theme.palette.mode === "dark"
                ? colors.light[800]
                : colors.light[400]
            }
          >
            Picture
          </Typography>
          <Box
            mt="30px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
          >
            <TextField
              select
              color="secondary"
              variant="outlined"
              label="Select Type *"
              sx={{ width: "20%" }}
              value={cameraType}
              error={mainCamInfoErr}
              onChange={(e) => setCameraType(e.target.value)}
            >
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            {mainCamInfoErr ? (
              <Typography variant="h4" color="error">
                Please Choose Camera Type!
              </Typography>
            ) : (
              <Box display="flex" flexDirection="column" width="60%">
                {[...Array(mainCamDetailNum)].map((num, i) => (
                  <TextField
                    key={i}
                    required
                    color="secondary"
                    variant="outlined"
                    label={`Detail ${i + 1}`}
                    sx={{ width: "100%", mt: "10px" }}
                    value={
                      i === 0
                        ? mainCamDetail1
                        : i === 1
                        ? mainCamDetail2
                        : i === 2
                        ? mainCamDetail3
                        : i === 3
                        ? mainCamDetail4
                        : ""
                    }
                    onChange={(e) =>
                      i === 0
                        ? setMainCamDetail1(e.target.value)
                        : i === 1
                        ? setMainCamDetail2(e.target.value)
                        : i === 2
                        ? setMainCamDetail3(e.target.value)
                        : i === 3
                        ? setMainCamDetail4(e.target.value)
                        : {}
                    }
                  />
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
      <Box mt="30px" display="flex" justifyContent="space-between" width="90%">
        <TextField
          color="secondary"
          variant="outlined"
          label="Features *"
          name="mainCameraFeatures"
          value={values.mainCameraFeatures}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.mainCameraFeatures && Boolean(errors.mainCameraFeatures)
          }
          helperText={touched.mainCameraFeatures && errors.mainCameraFeatures}
          sx={{ width: "45%" }}
        />
        <TextField
          color="secondary"
          variant="outlined"
          label="Video *"
          name="mainCameraVideo"
          value={values.mainCameraVideo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.mainCameraVideo && Boolean(errors.mainCameraVideo)}
          helperText={touched.mainCameraVideo && errors.mainCameraVideo}
          sx={{ width: "45%" }}
        />
      </Box>
      <Divider
        orientation="horizontal"
        flexItem
        sx={{
          mt: "30px",
          fontSize: "1rem",
          textTransform: "uppercase",
          letterSpacing: "5px",
          color:
            theme.palette.mode === "dark"
              ? colors.light[800]
              : colors.light[400],
        }}
      >
        selfie camera
      </Divider>
      <Box mt="30px" display="flex" justifyContent="space-between" width="90%">
        <Paper
          variant="outlined"
          sx={{
            borderColor: selfieCamInfoErr && colors.danger[500],
            width: "100%",
            p: "5px 5px 15px 5px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              textTransform: "uppercase",
              letterSpacing: "5px",
            }}
            color={
              selfieCamInfoErr
                ? "error"
                : theme.palette.mode === "dark"
                ? colors.light[800]
                : colors.light[400]
            }
          >
            Picture
          </Typography>
          <Box
            mt="30px"
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            width="100%"
          >
            <TextField
              select
              color="secondary"
              variant="outlined"
              label="Select Type *"
              sx={{ width: "20%" }}
              value={selfieCameraType}
              error={selfieCamInfoErr}
              onChange={(e) => setSelfieCameraType(e.target.value)}
            >
              {types.slice(0, 2).map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </TextField>
            {selfieCamInfoErr ? (
              <Typography variant="h4" color="error">
                Please Choose Camera Type!
              </Typography>
            ) : (
              <Box display="flex" flexDirection="column" width="60%">
                {[...Array(selfieCamDetailNum)].map((num, i) => (
                  <TextField
                    key={i}
                    required
                    color="secondary"
                    variant="outlined"
                    label={`Detail ${i + 1}`}
                    sx={{ width: "100%", mt: "10px" }}
                    value={
                      i === 0
                        ? selfieCamDetail1
                        : i === 1
                        ? selfieCamDetail2
                        : ""
                    }
                    onChange={(e) =>
                      i === 0
                        ? setSelfieCamDetail1(e.target.value)
                        : i === 1
                        ? setSelfieCamDetail2(e.target.value)
                        : {}
                    }
                  />
                ))}
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
      <Box mt="30px" display="flex" justifyContent="space-between" width="90%">
        <TextField
          color="secondary"
          variant="outlined"
          label="Features *"
          name="selfieCameraFeatures"
          value={values.selfieCameraFeatures}
          onChange={handleChange}
          onBlur={handleBlur}
          error={
            touched.selfieCameraFeatures && Boolean(errors.selfieCameraFeatures)
          }
          helperText={
            touched.selfieCameraFeatures && errors.selfieCameraFeatures
          }
          sx={{ width: "45%" }}
        />
        <TextField
          color="secondary"
          variant="outlined"
          label="Video *"
          name="selfieCameraVideo"
          value={values.selfieCameraVideo}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.selfieCameraVideo && Boolean(errors.selfieCameraVideo)}
          helperText={touched.selfieCameraVideo && errors.selfieCameraVideo}
          sx={{ width: "45%" }}
        />
      </Box>
    </>
  );
};

export default CameraInfo;
