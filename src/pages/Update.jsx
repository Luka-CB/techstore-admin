import { useLocation } from "react-router-dom";
import UpdateTv from "../components/form/tv/Update";
import ForwardIcon from "@mui/icons-material/Forward";
import AddComputer from "../components/form/computer/Add";
import AddCellphone from "../components/form/cellphone/Add";
import AddAccessory from "../components/form/accessory/Add";

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
      {/* {productType === "computer" && <AddComputer />}
      {productType === "cellphone" && <AddCellphone />}
      {productType === "accessory" && <AddAccessory />} */}
    </div>
  );
};

export default Update;
