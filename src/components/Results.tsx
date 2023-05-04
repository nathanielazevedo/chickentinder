import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} color="info" />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${props.value}`}</Typography>
      </Box>
    </Box>
  );
}

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const [party, setParty] = React.useState<any>(undefined);

  useEffect(() => {
    fetch("http://localhost:6001/party/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        data.restaurants.forEach((restaurant: any) => {
          if (data.votes[restaurant.id]) {
            restaurant.votes = data.votes[restaurant.id];
          } else {
            restaurant.votes = 0;
          }
        });
        data.restaurants.sort((a: any, b: any) => {
          return b.votes - a.votes;
        });
        setParty(data);
      });
    });
  }, [id]);

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "black",
          alignSelf: "flex-start",
        }}
      >
        Voting Results
      </Typography>
      {party &&
        party.restaurants.map((restaurant: any) => {
          return (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <Typography sx={{ color: "black" }}>{restaurant.name}</Typography>
              <Box sx={{ width: "100%" }}>
                <LinearProgressWithLabel value={restaurant.votes} />
              </Box>
            </Box>
          );
        })}
    </>
  );
};

export default Results;
