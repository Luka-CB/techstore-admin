import { useLocation } from "react-router-dom";
import AddTv from "../components/form/tv/Add";
import ForwardIcon from "@mui/icons-material/Forward";
import AddComputer from "../components/form/computer/Add";
import AddCellphone from "../components/form/cellphone/Add";

const Create = () => {
  const { pathname } = useLocation();
  const productType = pathname.split("/")[2];

  return (
    <div className="create-container">
      <div className="create-text">
        <h1 style={{ textTransform: "capitalize" }}>add new {productType}</h1>
        <div className="arrow">
          <ForwardIcon fontSize="3.5rem" />
        </div>
      </div>
      {productType === "tv" && <AddTv />}
      {productType === "computer" && <AddComputer />}
      {productType === "cellphone" && <AddCellphone />}
    </div>
  );
};

export default Create;
