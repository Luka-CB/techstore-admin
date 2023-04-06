import { useLocation } from "react-router-dom";
import UpdateTv from "../components/form/tv/Update";
import ForwardIcon from "@mui/icons-material/Forward";
import UpdateComputer from "../components/form/computer/Update";
import UpdateCellphone from "../components/form/cellphone/Update";
import UpdateAccessory from "../components/form/accessory/Update";

const Update = () => {
  const { pathname } = useLocation();
  const productType = pathname.split("/")[2];

  return (
    <div className="update-container">
      <div className="update-text">
        <h1 style={{ textTransform: "capitalize" }}>Update {productType}</h1>
        <div className="arrow">
          <ForwardIcon fontSize="3.5rem" />
        </div>
      </div>
      {productType === "tv" && <UpdateTv />}
      {productType === "computer" && <UpdateComputer />}
      {productType === "cellphone" && <UpdateCellphone />}
      {productType === "accessory" && <UpdateAccessory />}
    </div>
  );
};

export default Update;
