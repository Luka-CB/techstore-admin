import { Divider } from "@mui/material";

const ProductInfo = ({ colors, data, contentType }) => {
  const textColor = { color: colors.secondary[500] };
  const productName =
    data?.name?.length > 48 ? data?.name?.substring(0, 48) + "..." : data?.name;

  return (
    <div className="details-container">
      {contentType === "tv" && (
        <div className="tv-info">
          <div className="col">
            <h3 title={data?.name?.length > 48 ? data?.name : undefined}>
              Name: <span style={textColor}>{productName}</span>
            </h3>
            <h3>
              Brand: <span style={textColor}>{data.brand}</span>
            </h3>
          </div>
          <div className="col">
            <h3>
              Year: <span style={textColor}>{data.year}</span>
            </h3>
            <h3>
              Type: <span style={textColor}>{data.type}</span>
            </h3>
          </div>
          <div className="col">
            <h3>
              Resolution: <span style={textColor}>{data.resolution}</span>
            </h3>
            <h3>
              Total Quantity: <span style={textColor}>{data.totalQty}</span>
            </h3>
          </div>
          <div className="col">
            <h3>
              Created At: <span style={textColor}>{data.createdAt}</span>
            </h3>
          </div>
        </div>
      )}

      {contentType === "computer" && (
        <div className="computer-info">
          <div className="col">
            <h3 title={data?.name?.length > 48 ? data?.name : undefined}>
              Name: <span style={textColor}>{productName}</span>
            </h3>
            <h3>
              Brand: <span style={textColor}>{data.brand}</span>
            </h3>
            <h3>
              Type: <span style={textColor}>{data.type}</span>
            </h3>
            <h3>
              Processor: <span style={textColor}>{data.processor}</span>
            </h3>
          </div>
          <div className="col">
            <h3>
              OS: <span style={textColor}>{data.os}</span>
            </h3>
            <h3>
              Graphics: <span style={textColor}>{data.graphics}</span>
            </h3>
            <h3>
              Display: <span style={textColor}>{data.display}</span>
            </h3>
            <h3>
              Camera: <span style={textColor}>{data.camera}</span>
            </h3>
          </div>
          <div className="col">
            <h3>
              Storage Type: <span style={textColor}>{data.storage?.type}</span>
            </h3>
            <h3>
              Storage Interface:{" "}
              <span style={textColor}>
                {data.storage?.interface ? (
                  data.storage.interface
                ) : (
                  <span id="not-specified">Not Specified</span>
                )}
              </span>
            </h3>
            <h3>
              Storage Size:{" "}
              <span style={textColor}>{data.storage?.size} GB</span>
            </h3>
            <h3>
              RAM: <span style={textColor}>{data.ram}</span>
            </h3>
          </div>
          <div className="col">
            <h3>
              Weight: <span style={textColor}>{data.weight}</span>
            </h3>
            <h3>
              Price: <span style={textColor}>${data.price}</span>
            </h3>
            <h3>
              Total Quantity: <span style={textColor}>{data.totalQty}</span>
            </h3>
            <h3>
              Created At: <span style={textColor}>{data.createdAt}</span>
            </h3>
          </div>
        </div>
      )}

      {contentType === "cellphone" && (
        <div className="cellphone-info">
          <div className="col">
            <h3 title={data?.name?.length > 48 ? data?.name : undefined}>
              Name: <span style={textColor}>{productName}</span>
            </h3>
            <h3>
              Brand: <span style={textColor}>{data.brand}</span>
            </h3>
            <h3>
              Year: <span style={textColor}>{data.year}</span>
            </h3>
            <h3>
              Network: <span style={textColor}>{data.network}</span>
            </h3>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                margin: "10px 0",
                color: "rgba(157,157,157,0.5)",
                textTransform: "uppercase",
                letterSpacing: "5px",
              }}
            >
              body
            </Divider>
            <h3>
              Dimensions: <span style={textColor}>{data.body?.dimensions}</span>
            </h3>
            <h3>
              Weight: <span style={textColor}>{data.body?.weight}</span>
            </h3>
            <h3>
              Sim: <span style={textColor}>{data.body?.sim}</span>
            </h3>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                margin: "10px 0",
                color: "rgba(157,157,157,0.5)",
                textTransform: "uppercase",
                letterSpacing: "5px",
              }}
            >
              Display
            </Divider>
            <h3>
              Type: <span style={textColor}>{data.display?.type}</span>
            </h3>
            <h3>
              Size: <span style={textColor}>{data.display?.size}</span>
            </h3>
            <h3>
              Resolution:{" "}
              <span style={textColor}>{data.display?.resolution}</span>
            </h3>
            <h3>
              Protection:{" "}
              <span style={textColor}>{data.display?.protection}</span>
            </h3>
          </div>
          <div className="col">
            <h3>
              OS: <span style={textColor}>{data.platform?.os}</span>
            </h3>
            <h3>
              Chipset: <span style={textColor}>{data.platform?.chipset}</span>
            </h3>
            <h3>
              CPU: <span style={textColor}>{data.platform?.cpu}</span>
            </h3>
            <h3>
              GPU: <span style={textColor}>{data.platform?.gpu}</span>
            </h3>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                margin: "10px 0",
                color: "rgba(157,157,157,0.5)",
                textTransform: "uppercase",
                letterSpacing: "5px",
              }}
            >
              memory
            </Divider>
            <h3>
              Card Slot: <span style={textColor}>{data.memory?.cardSlot}</span>
            </h3>
            <h3>
              Internal: <span style={textColor}>{data.memory?.internal}</span>
            </h3>
            <h3>
              RAM: <span style={textColor}>{data.memory?.ram}</span>
            </h3>
            <Divider
              sx={{
                margin: "10px 0",
              }}
            />
            <h3>
              Battery: <span style={textColor}>{data.battery}</span>
            </h3>
            <h3>
              Price: <span style={textColor}>${data.price}</span>
            </h3>
            <h3>
              Quantity: <span style={textColor}>{data.totalQty}</span>
            </h3>
            <h3>
              Created At: <span style={textColor}>{data.createdAt}</span>
            </h3>
          </div>
          <div className="col">
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                margin: "10px 0",
                color: "rgba(157,157,157,0.5)",
                textTransform: "uppercase",
                letterSpacing: "5px",
              }}
            >
              main camera
            </Divider>
            <h3>Picture:</h3>
            <div className="picture-info">
              <h4>
                Type:{" "}
                <span id="picture-type" style={textColor}>
                  {data.mainCamera?.picture?.type}
                </span>
              </h4>
              <div className="details-wrapper">
                <h4>Details:</h4>
                <div className="details">
                  {data.mainCamera?.picture?.details?.map((detail) => (
                    <div className="detail" key={detail}>
                      <span style={textColor}>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h3>
              Features:{" "}
              <span style={textColor}>{data.mainCamera?.features}</span>
            </h3>
            <h3>
              Video: <span style={textColor}>{data.mainCamera?.video}</span>
            </h3>
            <Divider
              orientation="horizontal"
              flexItem
              sx={{
                margin: "10px 0",
                color: "rgba(157,157,157,0.5)",
                textTransform: "uppercase",
                letterSpacing: "5px",
              }}
            >
              selfie camera
            </Divider>
            <h3>Picture:</h3>
            <div className="picture-info">
              <h4>
                Type:{" "}
                <span id="picture-type" style={textColor}>
                  {data.selfieCamera?.picture?.type}
                </span>
              </h4>
              <div className="details-wrapper">
                <h4>Details:</h4>
                <div className="details">
                  {data.selfieCamera?.picture?.details?.map((detail) => (
                    <div className="detail" key={detail}>
                      <span style={textColor}>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <h3>
              Features:{" "}
              <span style={textColor}>{data.selfieCamera?.features}</span>
            </h3>
            <h3>
              Video: <span style={textColor}>{data.selfieCamera?.video}</span>
            </h3>
          </div>
        </div>
      )}

      {contentType === "accessory" && (
        <div className="accessory-info">
          <div className="col">
            <h3 title={data?.name?.length > 48 ? data?.name : undefined}>
              Name: <span style={textColor}>{productName}</span>
            </h3>
            <h3>
              Brand: <span style={textColor}>{data.brand}</span>
            </h3>
            <h3>
              Category: <span style={textColor}>{data.category}</span>
            </h3>
          </div>
          <div className="col">
            <h3>
              Price: <span style={textColor}>${data.price}</span>
            </h3>
            <h3>
              Quantity: <span style={textColor}>{data.totalQty}</span>
            </h3>
            <h3>
              Created At: <span style={textColor}>{data.createdAt}</span>
            </h3>
          </div>
          <div className="col description">
            <h3>Description:</h3>
            <p style={textColor}>{data.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
