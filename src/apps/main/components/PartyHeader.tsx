import { Box, Skeleton, Typography } from "@mui/material";
import { toMiles } from "../../create/CreateHelpers";
import { Party } from "../../../models/Party";

type Props = {
  party: Party;
  onManageClick: any;
};

const PartyHeader = ({ party }: Props) => {
  return (
    <Box
      sx={{
        padding: "20px",
        borderRadius: "10px",
        backgroundColor: "rgba(14, 107, 125, 0.1)",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={1}
      >
        <Typography variant="h3">
          {party.name ?? <Skeleton variant="text" width={200} />}
        </Typography>
      </Box>

      <Typography color="text.secondary" mt={2}>
        {party.max_distance && party.location ? (
          `Your party is voting on ${party.type} within ${toMiles(
            party.max_distance
          )} miles from ${party.location}.`
        ) : (
          <Skeleton variant="text" width={200} />
        )}
      </Typography>

      <Box mt={1} display="flex" flexDirection="column" gap={1}>
        {party.price !== undefined && (
          <Typography color="text.secondary">
            Max price:{" "}
            <strong>
              {party.price > 0 ? "$".repeat(party.price) : "No limit"}
            </strong>
          </Typography>
        )}
        <Typography color="text.secondary">
          Max voters: <strong>{party.max_voters ?? "No limit"}</strong>
        </Typography>
        {party.vote_on_days && (
          <Typography color="text.secondary">
            Party is voting on available days.
          </Typography>
        )}
        {party.vote_on_hours && (
          <Typography color="text.secondary">
            Party is voting on time of day.
          </Typography>
        )}
        <Typography color="text.secondary">
          Voters so far: {party.voters_so_far}
        </Typography>
      </Box>
    </Box>
  );
};

export default PartyHeader;
