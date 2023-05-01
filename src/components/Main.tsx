import NavBar from "./Navbar";
import { Box, Rating, Typography } from "@mui/material";
import { data } from "../../tomtom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Main = () => {
  const [restaurants, setRestaurants] = useState<any>(data.businesses);
  const [likes, setLikes] = useState<any>([]);
  console.log(likes);
  if (restaurants.length === 0) {
    return (
      <>
        <NavBar />
        <Box sx={styles.container}>
          <Typography>Your submission has been recorded.</Typography>
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
            <Box
              key={result.id}
              sx={{
                ...styles.restaurantContainer,
                poisiton: "relative",
                display: index === last ? "flex" : "none",
              }}
            >
              <img
                src={result.image_url}
                alt={result.name}
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  filter: "brightness(40%)",
                  borderRadius: "10px",
                }}
              />
              <Box
                sx={{
                  zIndex: 1,
                }}
              >
                <Typography variant="h5">{result.name}</Typography>
                <Typography variant="h6">
                  {result.location?.address1}
                </Typography>
                <a href={result.url} target="_blank">
                  <Typography sx={styles.link} variant="h6">
                    View on Yelp
                  </Typography>
                </a>
                <Typography variant="h6">{result.display_phone}</Typography>
                <Typography variant="h6">Price: {result.price}</Typography>
                <Rating name="simple-controlled" value={result.rating} />
              </Box>
            </Box>
          );
        })}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "30%",
          }}
        >
          <ThumbDownIcon
            sx={{ fontSize: "80px", cursor: "pointer" }}
            color="error"
            onClick={() =>
              setRestaurants((prevState: any) => {
                prevState.pop();
                return [...prevState];
              })
            }
          />
          <ThumbUpIcon
            sx={{ fontSize: "80px", cursor: "pointer" }}
            color="success"
            onClick={() => {
              const selected = restaurants[restaurants.length - 1];
              setLikes((prevState: any) => [...prevState, selected.id]);
              setRestaurants((prevState: any) => {
                prevState.pop();
                return [...prevState];
              });
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
    alignItems: "center",
    marginTop: "5rem",
    position: "relative",
    justifyContent: "flex-end",
    height: "70vh",
    width: "100vw",
  },
  restaurantContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5rem",
    height: "300px",
    width: "400px",
    border: "1px solid white",
    borderRadius: "10px",
    position: "absolute",
    top: "20px",
    backgroundColor: "rgba(0,0,0)",
  },
  img: {
    height: "100%",
    width: "100%",
    position: "absolute",
    filter: "brightness(40%)",
    borderRadius: "10px",
  },
  link: {
    textDecoration: "underline",
    color: "lightblue",
  },
};
