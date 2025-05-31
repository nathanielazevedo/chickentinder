import { Box, Skeleton, Typography, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toMiles } from "../../create/CreateHelpers";
import { useState } from "react";

type Props = {
  party: {
    _id?: string;
    name?: string;
    location?: string;
    max_distance?: number;
    type?: string;
    price?: number;
    max_voters?: number;
    topic?: string; // ex: "Where to go", "When to go"
    vote_on_days?: string; // ISO string
    vote_on_time?: string; // ISO time or string
  };
};

const PartyHeader = ({ party }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!party._id) return;
    const url = `${window.location.origin}/party/${party.id}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box
      mt={2}
      sx={{
        padding: "20px",
        borderRadius: "10px",
        // border: "1px solid rgb(14, 107, 125)",
        backgroundColor: "rgba(14, 107, 125, 0.1)",
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3">
          {party.name ?? <Skeleton variant="text" width={200} />}
        </Typography>
        {party._id && (
          <Tooltip title={copied ? "Copied!" : "Copy link"}>
            <IconButton onClick={handleCopy}>
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Typography color="secondary" mt={1}>
        Location:{" "}
        {party.max_distance && party.location ? (
          `Within ${toMiles(party.max_distance)} miles from ${party.location}.`
        ) : (
          <Skeleton variant="text" width={200} />
        )}
      </Typography>

      <Box mt={2} display="flex" flexDirection="column" gap={0.5}>
        {party.topic && (
          <Typography color="secondary">
            <strong>Voting on:</strong> {party.topic}
          </Typography>
        )}
        {party.type && (
          <Typography>
            <strong>Type of place:</strong> {party.type}
          </Typography>
        )}
        {party.price !== undefined && (
          <Typography>
            <strong>Max price:</strong>{" "}
            {party.price > 0 ? "$".repeat(party.price) : "No limit"}
          </Typography>
        )}
        <Typography>
          <strong>Max voters:</strong>{" "}
          {party.max_voters ? party.max_voters : "No limit"}
        </Typography>
        {party.vote_on_days && (
          <Typography>This party is voting on days</Typography>
        )}
        {party.vote_on_time && (
          <Typography>This party is voting on a time</Typography>
        )}
      </Box>
    </Box>
  );
};

export default PartyHeader;
