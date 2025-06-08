import { Box, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Party } from "../../../models/Party";
import { getPartyFromLocal } from "../../../utils/localStorage";

type Props = {
  party: Party;
};

const HCarousel = ({ party }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;

    const scrollLeft = containerRef.current.scrollLeft;
    // @ts-expect-error aa
    const cardWidth = containerRef.current.firstChild?.clientWidth || 1;
    const index = Math.round(scrollLeft / (cardWidth + 16));
    setActiveIndex(index);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const localParty = getPartyFromLocal(party._id);
  const userVotes = localParty?.h_likes || [];

  const enrichedTimes = party.hours_to_vote_on.map((t) => ({
    ...t,
    voteCount: party.h_votes?.[t.id] || 0,
    isWinner: party.h_winner === t.id,
    votedOn: userVotes.includes(t.id),
  }));

  const sortedTimes = enrichedTimes.sort((a, b) =>
    a.isWinner ? -1 : b.isWinner ? 1 : 0
  );

  return (
    <>
      <Typography variant="body2" color={"text.secondary"} sx={{ pt: 2 }}>
        Times you're voting on:
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
        {sortedTimes.map((time) => (
          <Box
            key={time.id}
            sx={{
              scrollSnapAlign: "start",
              flexShrink: 0,
              width: { xs: "350px", md: "500px" },
              height: "150px",
              position: "relative",
              backgroundColor: "black",
              color: "white",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Winner Badge */}
            {time.isWinner && (
              <Box
                sx={{
                  position: "absolute",
                  top: 8,
                  left: 8,
                  backgroundColor: "gold",
                  color: "black",
                  borderRadius: "12px",
                  padding: "2px 10px",
                  fontWeight: "bold",
                  fontSize: "14px",
                  zIndex: 10,
                }}
              >
                🏆 Winner
              </Box>
            )}

            {/* Vote Count */}
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                backgroundColor: "rgba(255,255,255,0.85)",
                color: "black",
                borderRadius: "12px",
                padding: "2px 8px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              {time.voteCount} vote{time.voteCount !== 1 ? "s" : ""}
            </Box>

            {/* You Voted Badge */}
            {time.votedOn && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: 8,
                  backgroundColor: "rgba(0,0,0,0.7)",
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

            <Typography variant="h4">{time.id}</Typography>
          </Box>
        ))}
      </Box>

      <Stack direction="row" justifyContent="center" mt={1} gap={1}>
        {sortedTimes.map((_, index) => (
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

export default HCarousel;
