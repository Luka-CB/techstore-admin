const ProductImageGallery = ({ images, contentType }) => {
  return (
    <div className="product-gallery-container">
      <div className="gallery-wrapper">
        {images.map((img, i) => (
          <div className="image-wrapper" key={img._id}>
            <img src={img.imageUrl} alt={`Image #${i}`} id="img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
