import {
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ProductImageGallery from "../components/productDetails/ProductImageGallery";
import ProductSizes from "../components/productDetails/ProductSizes";
import { getProduct } from "../redux/actions/productActions";
import { colorPallets } from "../theme";
import ProductInfo from "../components/productDetails/ProductInfo";
import ProductColors from "../components/productDetails/ProductColors";
import TooltipTitle from "../components/TooltipTitle";
import ReviewCard from "../components/reviews/ReviewCard";
import { getProductReviews } from "../redux/actions/reviewActions";

const Details = () => {
  const theme = useTheme();
  const colors = colorPallets(theme.palette.mode);

  const { product, isLoading: isGetProductLoading } = useSelector(
    (state) => state.getProduct
  );
  const { isLoading: isGetReviewsLodaing, reviews } = useSelector(
    (state) => state.getProductReviews
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contentType, id } = useParams();

  const route = contentType === "accessory" ? "accessories" : `${contentType}s`;

  useEffect(() => {
    dispatch(getProduct({ route, productId: id }));
    dispatch(getProductReviews(id));
  }, [dispatch, id]);

  console.log(reviews);

  return (
    <Box>
      <Paper
        elevation={12}
        sx={{
          position: "relative",
          width: "95%",
          margin: "auto",
          mb: 5,
          minHeight: 550,
          p: 2,
        }}
      >
        <Tooltip
          onClick={() => navigate(-1)}
          title={TooltipTitle("Go Back")}
          placement="top"
          TransitionComponent={Zoom}
          arrow
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            fontSize: "2rem",
            transition: "0.2s ease-in-out",
            "&:hover": { color: colors.secondary[500] },
          }}
        >
          <IconButton>
            <ArrowCircleLeftIcon sx={{ fontSize: "2rem" }} />
          </IconButton>
        </Tooltip>
        {isGetProductLoading ? (
          <Box
            sx={{
              height: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={60} color="secondary" />
          </Box>
        ) : (
          <>
            {product && (
              <ProductInfo
                colors={colors}
                data={{ ...product, images: null, sizes: null, colors: null }}
                contentType={contentType}
              />
            )}
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
              Images ({product?.images?.length})
            </Divider>
            {product.images && (
              <ProductImageGallery
                images={product.images}
                contentType={contentType}
              />
            )}
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
              {contentType === "tv"
                ? `Sizes (${product?.sizes?.length})`
                : `Colors (${product?.colors?.length})`}
            </Divider>
            {contentType === "tv" ? (
              <ProductSizes
                colors={colors}
                sizes={product.sizes && product.sizes}
              />
            ) : (
              <ProductColors
                themeColors={colors}
                colors={product.colors && product.colors}
              />
            )}
          </>
        )}
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
          reviews ({reviews?.length})
        </Divider>
        <Box className="product-reviews">
          {isGetReviewsLodaing ? (
            <Box className="spinner">
              <CircularProgress size={60} color="secondary" />
            </Box>
          ) : reviews?.length === 0 ? (
            <p id="no-reviews">no reviews!</p>
          ) : (
            <>
              {reviews?.map((review) => (
                <ReviewCard key={review._id} data={review} />
              ))}
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default Details;
