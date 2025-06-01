import { useState } from "react";
import VoteIcons from "../icons/VoteIcons";
import { Swipe } from "../SwipeUtils";
import { Box, Typography } from "@mui/material";
import DayVoteCard from "../../components/DayVoteCard";

type Props = {
  fDV: () => void;
  days_to_vote_on: { id: string }[] | undefined;
  setDLikes: React.Dispatch<React.SetStateAction<string[]>>;
};

const VoteDays = ({ days_to_vote_on, fDV, setDLikes }: Props) => {
  const length = days_to_vote_on?.length;
  const [index, setIndex] = useState<number>(0);
  const time = days_to_vote_on && days_to_vote_on[index];
  const [swipe, setSwipe] = useState<Swipe>({ id: "", direction: "" });

  if (index === length) {
    fDV();
    return <></>;
  }

  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Typography variant="h5" alignSelf="flex-end" mb="5px">
        {index + 1} of {length}
      </Typography>
      <DayVoteCard dayId={time?.id} swipe={swipe} />
      <VoteIcons
        index={index}
        item={time}
        items={days_to_vote_on}
        setSwipe={setSwipe}
        setIndex={setIndex}
        setLikes={setDLikes}
      />
    </Box>
  );
};

export default VoteDays;
