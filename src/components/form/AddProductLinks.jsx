import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { colorPallets } from "../../theme";
import { addDropImageData } from "../../redux/features/imageSlice";
import { toggleImageErrorState } from "../../redux/features/stateSlice";
import { useDispatch } from "react-redux";

const links = ["tv", "computer", "cellphone", "accessory"];

const AddProductLinks = ({ excludeLink }) => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigationHandler = (route) => {
    navigate(`/create/${route}`);
    dispatch(addDropImageData({}));
    dispatch(toggleImageErrorState(false));
  };

  const linksFiltered = links.filter((link) => link !== excludeLink);

  return (
    <Box
      mb="20px"
      display="flex"
      justifyContent="space-between"
      alignSelf="flex-end"
      sx={{ width: "30%", color: colors.light[400] }}
    >
      {linksFiltered.map((link) => (
        <Typography
          key={link}
          variant="body1"
          color={colors.light[200]}
          sx={{
            cursor: "pointer",
            textTransform: "capitalize",
            transition: "0.2s ease-in-out",
            "&:hover": {
              textDecoration: "underline",
              color: colors.secondary[500],
            },
          }}
          onClick={() => navigationHandler(link)}
        >
          {link !== excludeLink && `Add ${link}`}
        </Typography>
      ))}
    </Box>
  );
};

export default AddProductLinks;
