import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  Box,
  Button,
  Divider,
  Fab,
  Paper,
  TextField,
  useTheme,
} from "@mui/material";
import { colorPallets } from "../../../theme";
import ImageDrop from "../../ImageDrop";
import AddIcon from "@mui/icons-material/Add";
import AddProductLinks from "../AddProductLinks";
import { toggleImageErrorState } from "../../../redux/features/stateSlice";
import Colors from "../Colors";
import { computerFormSchema } from "../../../utils/validations";

const AddComputer = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const [colorName, setColorName] = useState("");
  const [colorNameErr, setColorNameErr] = useState(false);
  const [colorNameExistsErr, setColorNameExistsErr] = useState(false);
  const [colorCode, setColorCode] = useState("");
  const [colorCodeErr, setColorCodeErr] = useState(false);
  const [qty, setQty] = useState(0);
  const [computerColors, setComputerColors] = useState(
    localStorage.getItem("formComputerColors")
      ? JSON.parse(localStorage.getItem("formComputerColors"))
      : []
  );

  const { isDropImageAdded } = useSelector((state) => state.image);

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (!isDropImageAdded) {
      dispatch(toggleImageErrorState(true));
      return;
    }
    console.log(values);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        name: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).name
          : "",
        brand: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).brand
          : "",
        type: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).type
          : "",
        processor: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).processor
          : "",
        os: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).os
          : "",
        graphics: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).graphics
          : "",
        display: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).display
          : "",
        memory: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).memory
          : "",
        storagetype: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).storagetype
          : "",
        interface: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).interface
          : "",
        size: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).size
          : "",
        camera: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).camera
          : "",
        weight: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).weight
          : "",
        price: localStorage.getItem("formCompInfo")
          ? JSON.parse(localStorage.getItem("formCompInfo")).price
          : "",
      },
      validationSchema: computerFormSchema,
      onSubmit,
    });

  useEffect(
    () => localStorage.setItem("formCompInfo", JSON.stringify(values)),
    [values]
  );

  const addColorHandler = () => {
    if (!colorName) {
      setColorNameErr(true);
      return;
    }
    if (!colorCode) {
      setColorCodeErr(true);
      return;
    }

    if (computerColors.some((color) => color.colorName === colorName)) {
      setColorNameExistsErr(true);
      return;
    }

    setColorNameExistsErr(false);

    setComputerColors((prev) => [...prev, { colorName, colorCode, qty }]);

    localStorage.setItem(
      "formComputerColors",
      JSON.stringify([...computerColors, { colorName, colorCode, qty }])
    );

    setColorName("");
    setColorCode("");
    setQty(0);
  };

  return (
    <Box sx={{ width: "70%", margin: "20px auto" }}>
      <Paper
        variant={theme.palette.mode === "dark" ? "outlined" : undefined}
        elevation={12}
        sx={{ minHeight: "70vh", p: "15px 15px 30px 15px" }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <AddProductLinks excludeLink="computer" />
          <ImageDrop />
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              mt="50px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Name *"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                sx={{ width: "45%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Brand *"
                name="brand"
                value={values.brand}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.brand && Boolean(errors.brand)}
                helperText={touched.brand && errors.brand}
                sx={{ width: "45%" }}
              />
            </Box>
            <Box
              mt="50px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Type *"
                name="type"
                value={values.type}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.type && Boolean(errors.type)}
                helperText={touched.type && errors.type}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Processor *"
                name="processor"
                value={values.processor}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.processor && Boolean(errors.processor)}
                helperText={touched.processor && errors.processor}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product OS *"
                name="os"
                value={values.os}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.os && Boolean(errors.os)}
                helperText={touched.os && errors.os}
                sx={{ width: "30%" }}
              />
            </Box>
            <Box
              mt="50px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Graphics *"
                name="graphics"
                value={values.graphics}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.graphics && Boolean(errors.graphics)}
                helperText={touched.graphics && errors.graphics}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Display *"
                name="display"
                value={values.display}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.display && Boolean(errors.display)}
                helperText={touched.display && errors.display}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Memory *"
                name="memory"
                value={values.memory}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.memory && Boolean(errors.memory)}
                helperText={touched.memory && errors.memory}
                sx={{ width: "30%" }}
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
              storage
            </Divider>
            <Box
              mt="30px"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Storage Type *"
                name="storagetype"
                value={values.storagetype}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.storagetype && Boolean(errors.storagetype)}
                helperText={touched.storagetype && errors.storagetype}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="SSD Interface *"
                name="interface"
                value={values.interface}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.interface && Boolean(errors.interface)}
                helperText={touched.interface && errors.interface}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Storage Size *"
                type="number"
                name="size"
                value={values.size}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.size && Boolean(errors.size)}
                helperText={touched.size && errors.size}
                sx={{ width: "25%" }}
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
              colors
            </Divider>
            <Box
              mt="30px"
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              width="100%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Color Name"
                value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                onBlur={() => colorName && setColorNameErr(false)}
                error={colorNameErr || colorNameExistsErr}
                helperText={
                  colorNameErr
                    ? "Please provide value!"
                    : colorNameExistsErr
                    ? "Thos color already exists!"
                    : undefined
                }
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Color Code (HEX)"
                value={colorCode}
                onChange={(e) => setColorCode(e.target.value)}
                onBlur={() => colorCode && setColorCodeErr(false)}
                error={colorCodeErr}
                helperText={colorCodeErr && "Please provide value!"}
                sx={{ width: "25%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Quantity"
                type="number"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                sx={{ width: "25%" }}
              />
              <Fab
                color="secondary"
                aria-label="add"
                size="medium"
                onClick={addColorHandler}
              >
                <AddIcon />
              </Fab>
            </Box>
            <Colors
              productColors={computerColors}
              setColors={setComputerColors}
              storageName="formComputerColors"
            />
            <Divider
              flexItem
              sx={{
                mt: "30px",
              }}
            ></Divider>
            <Box
              mt="50px"
              display="flex"
              justifyContent="space-between"
              width="90%"
            >
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Camera *"
                name="camera"
                value={values.camera}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.camera && Boolean(errors.camera)}
                helperText={touched.camera && errors.camera}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                label="Product Weight *"
                name="weight"
                value={values.weight}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.weight && Boolean(errors.weight)}
                helperText={touched.weight && errors.weight}
                sx={{ width: "30%" }}
              />
              <TextField
                color="secondary"
                variant="outlined"
                type="number"
                label="Product Price *"
                name="price"
                value={values.price}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.price && Boolean(errors.price)}
                helperText={touched.price && errors.price}
                sx={{ width: "30%" }}
              />
            </Box>

            <Button
              type="submit"
              variant="outlined"
              color="secondary"
              sx={{
                mt: "50px",
                alignSelf: "flex-end",
                width: "150px",
                p: "7px",
                fontSize: "0.8rem",
              }}
            >
              add product
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddComputer;
