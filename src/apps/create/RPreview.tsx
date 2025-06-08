import { useState } from "react";
import CustomDialog from "./CustomDialog";
import SlideIn from "../../components/SlideIn";
import MainButton from "../../components/MainButton";
import BackIconAction from "../../components/backIcons/BackIconAction";
import { Box, Chip, Link, Skeleton, Typography } from "@mui/material";
import {
  CustomRestaurant,
  Restaurant,
  RestaurantCreate,
} from "../../models/Restaurant";
import RefreshIcon from "@mui/icons-material/Refresh";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  fetchMore: () => void;
  completeRestaurants: () => void;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  restaurants: Restaurant[] | undefined;
  setRestaurants: React.Dispatch<
    React.SetStateAction<(Restaurant | CustomRestaurant)[] | undefined>
  >;
  submitting: boolean;
};

const RPreview = ({
  setStep,
  fetchMore,
  restaurants,
  submitting,
  setRestaurants,
  completeRestaurants,
}: Props) => {
  const [customOpen, setCustomOpen] = useState(false);

  const removeRestaurant = (id: string) => {
    setRestaurants((prev) => prev?.filter((r) => r.id !== id));
  };

  const createRestaurant = (restaurant: RestaurantCreate) => {
    setCustomOpen(false);
    const obj = {
      ...restaurant,
      location: {
        address1: restaurant.location as string,
      },
    } as CustomRestaurant;
    setRestaurants((prev) => (prev ? [...prev, obj] : [obj]));
  };

  const hasEnough = () => (restaurants?.length ?? 0) >= 2;

  return (
    <>
      <BackIconAction action={() => setStep(0)} />
      <SlideIn>
        {customOpen && (
          <CustomDialog
            open={customOpen}
            setOpen={setCustomOpen}
            createRestaurant={createRestaurant}
          />
        )}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography variant="h5">These are the places I found.</Typography>
            <Typography color="secondary">
              Remove any you don’t like.
            </Typography>
          </Box>
          <Box width="90px">
            <MainButton
              disabled={!hasEnough()}
              onClick={completeRestaurants}
              text="Next"
            />
          </Box>
        </Box>

        {!hasEnough() && !submitting && (
          <Typography color="error" fontSize="12px" mt={1}>
            You must select at least 2 places.
          </Typography>
        )}

        <Box
          mt={3}
          mb={2}
          sx={{ display: "flex", alignItems: "center", gap: 2 }}
        >
          <Typography variant="body1" color="text.secondary">
            Actions:
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            // justifyContent="flex-start"
            alignItems="center"
          >
            <Chip
              icon={<RefreshIcon fontSize="small" />}
              label="Fetch More"
              onClick={fetchMore}
              variant="outlined"
              color="primary"
              size="small"
            />
            <Chip
              icon={<AddIcon fontSize="small" />}
              label="Create Custom Place"
              onClick={() => setCustomOpen(true)}
              variant="outlined"
              color="secondary"
              size="small"
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography
            variant="body1"
            color="text.secondary"
            mt={1}
            display="block"
          >
            {restaurants?.length ?? 0} place
            {restaurants?.length === 1 ? "" : "s"} selected
          </Typography>
        </Box>

        <Box>
          {restaurants ? (
            restaurants.map((restaurant) => (
              <Box
                key={restaurant.id}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent: "center",
                  gap: 2,
                  pb: 3,
                  my: 3,
                  pt: 2,
                  // borderRadius: 2,
                  borderBottom: "1px solid grey",
                  alignItems: "center",
                  // backgroundColor: "#fff",
                }}
              >
                {/* Remove Button */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 8,
                  }}
                >
                  <Chip
                    label="Remove"
                    size="small"
                    onClick={() => removeRestaurant(restaurant.id)}
                    sx={{ fontSize: "0.7rem" }}
                    color="error"
                    variant="outlined"
                  />
                </Box>

                {/* Restaurant Image */}
                {restaurant?.image_url && (
                  <Box
                    component="img"
                    src={restaurant.image_url}
                    alt={restaurant.name}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      objectFit: "cover",
                    }}
                  />
                )}

                {/* Info */}
                <Box flexGrow={1}>
                  <Typography variant="h6">{restaurant.name}</Typography>

                  <Typography variant="body2" color="text.secondary">
                    {restaurant.location?.display_address?.join(", ") ||
                      restaurant.location?.address1}
                  </Typography>

                  <Typography variant="body2" mt={0.5}>
                    {restaurant.categories?.map((cat) => cat.title).join(", ")}
                  </Typography>

                  <Typography variant="body2" mt={0.5}>
                    {restaurant.price || "N/A"} • ⭐ {restaurant.rating} (
                    {restaurant.review_count} reviews)
                  </Typography>

                  {restaurant.url && (
                    <Link
                      href={restaurant.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        fontSize: "0.875rem",
                        mt: 1,
                        display: "inline-block",
                      }}
                    >
                      View on Yelp
                    </Link>
                  )}
                </Box>
              </Box>
            ))
          ) : (
            <Box display="flex" flexDirection="column" gap="15px" mt="20px">
              <Skeleton variant="rectangular" width="100%" height={50} />
              <Skeleton variant="rectangular" width="100%" height={50} />
              <Skeleton variant="rectangular" width="100%" height={50} />
            </Box>
          )}
        </Box>
      </SlideIn>
    </>
  );
};

export default RPreview;
