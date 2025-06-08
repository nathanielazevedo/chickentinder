import { Box, Skeleton } from "@mui/material";
import StatCard from "./StatCard";

type Props = {
  party: any;
};

const PartyStats = ({ party }: Props) => {
  // const showHours = party?.vote_on_hours;
  // const showDays = party?.vote_on_days;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mt: 2,
      }}
    >
      <StatCard
        title="Voters So Far"
        value={
          party?.voters_so_far !== undefined ? (
            `${party.voters_so_far}`
          ) : (
            <Skeleton variant="text" width={40} />
          )
        }
      />
      <StatCard
        title={party?.type ?? "Type"}
        value={
          party?.restaurants !== undefined ? (
            `${party.restaurants.length}`
          ) : (
            <Skeleton variant="text" width={40} />
          )
        }
      />
      {/* {showHours && (
        <StatCard
          title="Hours to Vote On"
          value={
            party?.hours_to_vote_on !== undefined ? (
              `${party.hours_to_vote_on.length}`
            ) : (
              <Skeleton variant="text" width={40} />
            )
          }
        />
      )}
      {showDays && (
        <StatCard
          title="Days to Vote On"
          value={
            party?.days_to_vote_on !== undefined ? (
              `${party.days_to_vote_on.length}`
            ) : (
              <Skeleton variant="text" width={40} />
            )
          }
        />
      )} */}
    </Box>
  );
};

export default PartyStats;
