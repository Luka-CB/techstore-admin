import { Box, TextField } from "@mui/material";
import PageviewOutlinedIcon from "@mui/icons-material/PageviewOutlined";

const Search = ({ contentType }) => {
  return (
    <Box width={300} sx={{ display: "flex", alignItems: "flex-end" }}>
      <PageviewOutlinedIcon
        color="secondary"
        sx={{ mr: 1, my: 0.5, fontSize: "1.3rem" }}
      />
      <TextField
        id="input-with-sx"
        label={`Search ${contentType}s`}
        variant="standard"
        color="secondary"
        fullWidth
      />
    </Box>
  );
};

export default Search;
