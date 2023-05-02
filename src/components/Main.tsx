import NavBar from "./Navbar";
import { Box, Card, Rating, Typography } from "@mui/material";
import { data } from "../../tomtom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState } from "react";
import drum from "../assets/drum.svg";
import food from "../assets/food.jpeg";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Main = () => {
  const [restaurants, setRestaurants] = useState<any>(data.businesses);
  const [likes, setLikes] = useState<any>([]);
  const [swipe, setSwipe] = useState<any>(undefined);

  const getSwipe = (id: any) => {
    if (swipe?.id === id) {
      if (swipe.direction === "left") {
        return "cssanimation sequence fadeOutLeft";
      } else {
        return "cssanimation sequence fadeOutRight";
      }
    } else {
      return "";
    }
  };

  if (restaurants.length === 0) {
    return (
      <>
        <NavBar />
        <Box sx={{ ...styles.container, gap: "70px", flexDirection: "row" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img src={drum} alt="drum" width="200px" />
            <Typography variant="h4" color={"primary"}>
              Awesome! You liked {likes.length} restaurants!
            </Typography>
          </Box>
          <Box
            sx={{
              height: "800px",
              overflowY: "scroll",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {data.businesses.map((result: any) => {
              if (!likes.includes(result.id)) return null;
              return (
                <Card
                  elevation={3}
                  key={result.id}
                  sx={{
                    ...styles.restaurantContainer,
                    position: "relative",
                    padding: "20px",
                    minHeight: "300px",
                  }}
                >
                  <img
                    src={result.image_url}
                    alt={result.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      position: "absolute",
                      filter: "brightness(40%)",
                      borderRadius: "10px",
                      right: 0,
                    }}
                  />
                  <Box
                    sx={{
                      zIndex: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography variant="h5" color="secondary">
                        {result.name}
                      </Typography>
                      <Typography variant="h6" color="secondary">
                        {result.location?.address1}, {result.location?.city}
                      </Typography>
                      {result.price && (
                        <Typography variant="h6" color="secondary">
                          Price: {result.price}
                        </Typography>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Rating
                          name="simple-controlled"
                          value={result.rating}
                          disabled
                        />
                        <Typography variant="h6" color="secondary">
                          - {result.review_count} reviews
                        </Typography>
                      </Box>

                      <Typography variant="h6" color="secondary">
                        {result.display_phone}
                      </Typography>
                      <a href={result.url} target="_blank">
                        <Typography
                          sx={styles.link}
                          variant="h6"
                          color="secondary"
                        >
                          View on Yelp
                        </Typography>
                      </a>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        justifySelf: "flex-end",
                      }}
                    >
                      {result.categories.map((category: any) => {
                        return (
                          <Typography
                            key={category.alias}
                            variant="h6"
                            color="secondary"
                          >
                            {category.title}
                          </Typography>
                        );
                      })}
                    </Box>
                  </Box>
                </Card>
              );
            })}
          </Box>
        </Box>
      </>
    );
  }
  return (
    <>
      <NavBar />
      <Box sx={styles.container}>
        {restaurants.map((result: any, index: number) => {
          const last = restaurants.length - 1;
          return (
            <Card
              elevation={3}
              key={result.id}
              className={getSwipe(result?.id)}
              sx={{
                ...styles.restaurantContainer,
                position: "relative",
                display: index === last ? "flex" : "none",
                padding: "20px",
              }}
            >
              <img
                src={result.image_url}
                alt={result.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  position: "absolute",
                  filter: "brightness(40%)",
                  borderRadius: "10px",
                  right: 0,
                }}
              />
              <Box
                sx={{
                  zIndex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box>
                  <Typography variant="h5" color="secondary">
                    {result.name}
                  </Typography>
                  <Typography variant="h6" color="secondary">
                    {result.location?.address1}, {result.location?.city}
                  </Typography>
                  {result.price && (
                    <Typography variant="h6" color="secondary">
                      Price: {result.price}
                    </Typography>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Rating
                      name="simple-controlled"
                      value={result.rating}
                      disabled
                    />
                    <Typography variant="h6" color="secondary">
                      - {result.review_count} reviews
                    </Typography>
                  </Box>

                  <Typography variant="h6" color="secondary">
                    {result.display_phone}
                  </Typography>
                  <a href={result.url} target="_blank">
                    <Typography sx={styles.link} variant="h6" color="secondary">
                      View on Yelp
                    </Typography>
                  </a>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifySelf: "flex-end",
                  }}
                >
                  {result.categories.map((category: any) => {
                    return (
                      <Typography variant="h6" color="secondary">
                        #{category.title}
                      </Typography>
                    );
                  })}
                </Box>
              </Box>
            </Card>
          );
        })}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "30%",
            marginTop: "40px",
            // backgroundColor: "white",
            // padding: "20px",
            // borderRadius: "10px",
          }}
        >
          <ThumbDownIcon
            sx={{
              fontSize: "80px",
              cursor: "pointer",
              border: "3px solid red",
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: "white",
              ":hover": {
                backgroundColor: "lightcoral",
              },
            }}
            color="error"
            onClick={() => {
              const selected = restaurants[restaurants.length - 1];
              setSwipe({ id: selected.id, direction: "left" });
              setTimeout(() => {
                setRestaurants((prevState: any) => {
                  prevState.pop();
                  return [...prevState];
                });
              }, 1000);
            }}
          />
          <ThumbUpIcon
            sx={{
              fontSize: "80px",
              cursor: "pointer",
              border: "3px solid green",
              borderRadius: "50%",
              padding: "10px",
              backgroundColor: "white",
              ":hover": {
                backgroundColor: "lightgreen",
              },
            }}
            color="success"
            onClick={() => {
              const selected = restaurants[restaurants.length - 1];
              setLikes((prevState: any) => [...prevState, selected.id]);
              setSwipe({ id: selected.id, direction: "right" });
              setTimeout(() => {
                setRestaurants((prevState: any) => {
                  prevState.pop();
                  return [...prevState];
                });
              }, 1000);
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Main;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "93vh",
    height: "93vh",
    width: "100vw",
    maxWidth: "100vw",
    backgroundColor: "white",
    backgroundImage: `url(${food})`,
  },
  restaurantContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "400px",
    width: "500px",
    borderRadius: "10px",
    backgroundColor: "black",
  },
  link: {
    textDecoration: "underline",
    color: "lightblue",
  },
};
