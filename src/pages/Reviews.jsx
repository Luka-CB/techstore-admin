import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ReviewCard from "../components/reviews/ReviewCard";
import { getReviews } from "../redux/actions/reviewActions";
import TooltipTitle from "../components/TooltipTitle";
import PostModal from "../components/reviews/PostModal";
import DeleteReviewModal from "../components/reviews/DeleteReviewModal";

const Reviews = () => {
  const [sort, setSort] = useState("desc");
  const [rppn, setRppn] = useState(0);

  const { isLoading, reviews, reviewCount } = useSelector(
    (state) => state.getReviews
  );

  const dispatch = useDispatch();

  const handleSort = () => {
    if (sort === "desc") {
      setSort("asc");
    } else {
      setSort("desc");
    }
  };

  useEffect(() => {
    dispatch(getReviews({ rppn, sort }));
  }, [dispatch, rppn, sort]);

  return (
    <Box className="reviews-container">
      <Divider>
        <Box className="reviews-header">
          <Box className="count">
            <Typography variant="h5" color="rgb(174, 174, 174)">
              Reviews:
            </Typography>
            <Typography variant="h3" color="secondary" ml={1}>
              {reviewCount}
            </Typography>
          </Box>
          <Tooltip
            title={TooltipTitle(sort === "asc" ? "Descending" : "Ascending")}
            placement="top"
            TransitionComponent={Zoom}
            arrow
          >
            <Box className="sort" onClick={handleSort}>
              <NorthIcon id={sort === "asc" ? "up-disabled" : "up-active"} />
              <SouthIcon
                id={sort === "desc" ? "down-disabled" : "down-active"}
              />
            </Box>
          </Tooltip>
        </Box>
      </Divider>
      <Box className="reviews">
        {isLoading ? (
          <CircularProgress size={60} color="secondary" id="spinner" />
        ) : null}

        {reviews?.map((review) => (
          <ReviewCard key={review._id} data={review} />
        ))}
      </Box>
      <Box className="show-more">
        <Button
          variant="outlined"
          color="warning"
          sx={{ width: 150, height: 40 }}
          onClick={() => setRppn(reviews.length + 20)}
          disabled={reviews.length === reviewCount}
        >
          <ExpandCircleDownIcon sx={{ fontSize: "1.6rem", mr: 2 }} />
          <Typography sx={{ fontSize: "0.8rem" }}>Show More</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Reviews;
