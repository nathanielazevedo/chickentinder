/* eslint-disable @typescript-eslint/no-explicit-any */
import NavBar from "./Navbar";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Rating,
  Typography,
} from "@mui/material";
// import { data } from "../../tomtom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Swipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [party, setParty] = useState<any>(undefined);
  const [likes, setLikes] = useState<any>([]);
  const [swipe, setSwipe] = useState<any>(undefined);
  const [restaurants, setRestaurants] = useState<any>(undefined);

  useEffect(() => {
    const getParty = async () => {
      try {
        if (!id) return;
        const party = await API.getParty(id);
        if (party?.winner) {
          navigate(`/party/${id}`);
        }
        setParty(party);
        setRestaurants(structuredClone(party.restaurants));
      } catch {
        console.log("error");
      }
    };
    getParty();
  }, [id, navigate]);

  const getSwipe = (id: string) => {
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

  useEffect(() => {
    const submitVotes = () => {
      try {
        if (!id) return;
        API.vote(id, likes);
      } catch {
        console.log("error");
      }
    };
    if (party && party?.restaurants?.length === 0) {
      submitVotes();
    }
  }, [id, likes, party]);

  if (!party) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box>
            <CircularProgress color="success" />
          </Box>
        </Box>
      </>
    );
  }

  if (party?.restaurants?.length === 0) {
    return (
      <>
        <NavBar />
        <Box sx={{ ...styles.container, gap: "10px", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <Typography variant="h4" color="scondary">
              Awesome! You liked {likes.length} restaurants!
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                height: "50px",
                fontSize: "1rem",
                background:
                  "radial-gradient(926px at 2.7% 11%, #30a7d0 0%, rgb(178, 31, 102) 90%)",
              }}
              onClick={() => navigate(`/party/${id}`)}
            >
              Go to Main
            </Button>
          </Box>
          {likes.length != 0 && (
            <Box
              sx={{
                height: "800px",
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              {restaurants.map((result: any) => {
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
                          flexWrap: "wrap",
                        }}
                      >
                        {result.categories.map((category: any) => {
                          return (
                            <Typography
                              key={category.alias}
                              variant="h6"
                              color="secondary"
                            >
                              #{category.title}
                            </Typography>
                          );
                        })}
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          )}
        </Box>
      </>
    );
  }
  const restaurant = party.restaurants[party.restaurants.length - 1];
  return (
    <>
      <NavBar />
      <Box sx={styles.container}>
        <Card
          elevation={3}
          key={restaurant.id}
          className={getSwipe(restaurant?.id)}
          sx={{
            ...styles.restaurantContainer,
            position: "relative",
            display: "flex",
            padding: "20px",
            border: "0.1px solid white",
          }}
        >
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
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
                {restaurant.name}
              </Typography>
              <Typography variant="h6" color="secondary">
                {restaurant.location?.address1}, {restaurant.location?.city}
              </Typography>
              {restaurant.price && (
                <Typography variant="h6" color="secondary">
                  Price: {restaurant.price}
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
                  value={restaurant.rating}
                  disabled
                />
                <Typography variant="h6" color="secondary">
                  - {restaurant.review_count} reviews
                </Typography>
              </Box>

              <Typography variant="h6" color="secondary">
                {restaurant.display_phone}
              </Typography>
              <a href={restaurant.url} target="_blank">
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
                flexWrap: "wrap",
              }}
            >
              {restaurant.categories.map((category: any, index: number) => {
                return (
                  <Typography variant="h6" color="secondary" key={index}>
                    #{category.title}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        </Card>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "30%",
            marginTop: "40px",
            gap: "40px",
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
              const selected = party.restaurants[party.restaurants.length - 1];
              setSwipe({ id: selected.id, direction: "left" });
              setTimeout(() => {
                setParty((prevState: any) => {
                  prevState.restaurants.pop();
                  return { ...prevState };
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
              const selected = party.restaurants[party.restaurants.length - 1];
              setLikes((prevState: any) => [...prevState, selected.id]);
              setSwipe({ id: selected.id, direction: "right" });
              setTimeout(() => {
                setParty((prevState: any) => {
                  prevState.restaurants.pop();
                  return { ...prevState };
                });
              }, 1000);
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Swipe;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: { xs: "flex-start", md: "center" },
    paddingTop: { xs: "40px", md: "0px" },
    alignItems: "center",
    maxHeight: "93vh",
    height: "93vh",
    width: "100vw",
    maxWidth: "100vw",
    overflow: "hidden",
    backgroundColor: "#060816",
    // backgroundImage: `url(${food})`,
  },
  restaurantContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "flex-start",
    height: "400px",
    width: { xs: "350px", md: "500px" },
    borderRadius: "10px",
    backgroundColor: "black",
  },
  link: {
    textDecoration: "underline",
    color: "lightblue",
  },
};
