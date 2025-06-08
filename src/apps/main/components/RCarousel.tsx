import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Swipe } from "../vote/SwipeUtils";
import RCard from "../../../components/RCard";
import { Party } from "../../../models/Party";
import { getPartyFromLocal } from "../../../utils/localStorage";

type Props = {
  party: Party;
  swipe: Swipe;
};

const RCarousel = ({ party, swipe }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollLeft = containerRef.current.scrollLeft;
    // @ts-expect-error aa
    const cardWidth = containerRef.current.firstChild?.clientWidth || 1;

    const index = Math.round(scrollLeft / (cardWidth + 16)); // 16 = gap
    setActiveIndex(index);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Get vote info from local storage
  const localParty = getPartyFromLocal(party._id);
  const userVotes = localParty?.r_likes || [];

  // Enrich restaurants with vote count, winner, and local vote info
  const restaurantsWithVotes = party.restaurants.map((r) => ({
    ...r,
    voteCount: party.r_votes[r.id] || 0,
    isWinner: party.r_winner?.id === r.id,
    votedOn: userVotes.includes(r.id),
  }));

  // Sort winner to the front
  const sortedRestaurants = restaurantsWithVotes.sort((a, b) =>
    a.isWinner ? -1 : b.isWinner ? 1 : 0
  );

  return (
    <>
      <Typography variant="body1" color={"text.secondary"} sx={{ pt: 2 }}>
        Places you're voting on:
      </Typography>
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          px: 1,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {sortedRestaurants.map((restaurant) => (
          <Box
            key={restaurant.id}
            sx={{
              scrollSnapAlign: "start",
              flexShrink: 0,
            }}
          >
            <RCard
              restaurant={restaurant}
              swipe={swipe}
              voteCount={restaurant.voteCount}
              isWinner={restaurant.isWinner}
              votedOn={restaurant.votedOn}
            />
          </Box>
        ))}
      </Box>

      <Stack direction="row" justifyContent="center" mt={1} gap={1}>
        {sortedRestaurants.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor:
                index === activeIndex ? "primary.main" : "grey.400",
              transition: "all 0.2s ease-in-out",
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default RCarousel;
