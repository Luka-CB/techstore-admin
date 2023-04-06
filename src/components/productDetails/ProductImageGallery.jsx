const ProductImageGallery = ({ images, contentType }) => {
  const mainImg = images.find((img) => img.isMain).imageUrl;
  const otherImages = images.filter((img) => !img.isMain);

  return (
    <div className="product-gallery-container">
      <div className="main-image">
        <div
          className={
            contentType === "cellphone"
              ? "cellphone-main-image-wrapper"
              : "main-image-wrapper"
          }
        >
          <img src={mainImg} alt="Main Image" />
        </div>
      </div>
      <div className="other-gallery-wrapper">
        <div className="other-gallery-images">
          {otherImages.map((img, i) => (
            <div className="other-img" key={img._id}>
              <img src={img.imageUrl} alt={`Image #${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductImageGallery;
