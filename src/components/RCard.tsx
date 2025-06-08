import { yelp_logo } from "../assets/yelp";
import { Restaurant } from "../models/Restaurant";
import { Box, Skeleton, Typography } from "@mui/material";
import { Swipe, getSwipe } from "../apps/main/vote/SwipeUtils";

type Props = {
  swipe: Swipe;
  restaurant: Restaurant | undefined;
  voteCount?: number;
  isWinner?: boolean;
  votedOn?: boolean;
};

const RCard = ({ restaurant, swipe, voteCount, isWinner, votedOn }: Props) => {
  return (
    <Box
      sx={styles.c}
      className={restaurant && getSwipe(restaurant?.id, swipe)}
    >
      {/* Winner Badge */}
      {isWinner && (
        <Box
          sx={{
            position: "absolute",
            top: 5,
            right: 8,
            backgroundColor: "gold",
            color: "black",
            borderRadius: "12px",
            padding: "2px 10px",
            fontWeight: "bold",
            fontSize: "14px",
            zIndex: 1000,
            boxShadow: "0 0 8px rgba(0,0,0,0.4)",
          }}
        >
          🏆 Winner
        </Box>
      )}

      {/* Vote Count Badge */}
      {typeof voteCount === "number" && (
        <Box
          sx={{
            position: "absolute",
            top: 35,
            right: 8,
            borderRadius: "12px",
            padding: "2px 8px",
            fontWeight: "bold",
            fontSize: "14px",
            // backgroundColor: "rgba(255, 255, 255, 0.85)",
            border: "solid grey 1px",
            zIndex: 10,
          }}
        >
          {voteCount} vote{voteCount !== 1 ? "s" : ""}
        </Box>
      )}

      {/* You Voted Badge */}
      {votedOn && (
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            borderRadius: "8px",
            padding: "2px 8px",
            fontSize: "12px",
            fontWeight: "medium",
            zIndex: 10,
          }}
        >
          ✅ You Voted
        </Box>
      )}

      {/* Restaurant Image */}
      {restaurant?.image_url && (
        <img
          alt={restaurant.name}
          src={restaurant.image_url}
          style={{
            right: 0,
            maxWidth: "100%",
            maxHeight: "100%",
            borderRadius: "10px",
            position: "absolute",
            filter: "brightness(35%)",
          }}
        />
      )}

      {/* Content Overlay */}
      <Box sx={styles.rContent}>
        <Box>
          <Typography variant="h5">
            {restaurant?.name ? (
              restaurant.name
            ) : (
              <Skeleton variant="text" width={200} />
            )}
          </Typography>
          <Typography>
            {restaurant ? (
              `${restaurant.location?.address1}, ${restaurant.location?.city}`
            ) : (
              <>
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
                <Skeleton variant="text" width={200} />
              </>
            )}
          </Typography>

          {restaurant && (
            <>
              <Typography>Price: {restaurant.price}</Typography>
              <Box m="5px 0" gap="10px" display="flex" alignItems={"center"}>
                <Typography>⭐ {restaurant.rating}</Typography>
                <Box>
                  <img alt="yelp logo" width="45px" src={yelp_logo} />
                </Box>
              </Box>
              <Typography>
                Based on {restaurant.review_count} Reviews
              </Typography>
              <Typography>{restaurant.display_phone}</Typography>
              <a
                href={restaurant.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography sx={styles.link}>View on Yelp</Typography>
              </a>
            </>
          )}
        </Box>

        <Box display="flex" gap="10px" justifySelf="flex-end" flexWrap="wrap">
          {restaurant?.categories ? (
            restaurant.categories.map((category, i) => (
              <Typography key={i}>#{category.title}</Typography>
            ))
          ) : (
            <>
              <Skeleton variant="text" width={200} />
              <Skeleton variant="text" width={200} />
              <Skeleton variant="text" width={200} />
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RCard;

const styles = {
  c: {
    padding: "20px",
    height: "350px",
    display: "flex",
    position: "relative",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
    alignItems: "flex-start",
    width: { xs: "400px", md: "500px" },
  },
  rContent: {
    zIndex: 1,
    display: "flex",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "underline",
    color: "primary.main",
  },
};
