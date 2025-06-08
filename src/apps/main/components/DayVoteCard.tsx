import { Box, Typography } from "@mui/material";
import { getSwipe, Swipe } from "../vote/SwipeUtils";

type Props = {
  dayId: string | undefined;
  swipe: Swipe;
};

const DayVoteCard = ({ dayId, swipe }: Props) => {
  return (
    <Box className={dayId && getSwipe(dayId, swipe)} sx={styles.c}>
      <Box sx={styles.iC}>
        <Typography variant="h1">{dayId}</Typography>
      </Box>
    </Box>
  );
};

export default DayVoteCard;

const styles = {
  c: {
    height: "350px",
    display: "flex",
    borderRadius: "10px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "black",
    width: { xs: "350px", md: "500px" },
  },
  iC: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
};
