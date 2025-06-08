import { Box, Chip } from "@mui/material";
import { Link } from "react-router-dom";
import HowToVoteOutlinedIcon from "@mui/icons-material/HowToVoteOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import ShareChip from "./ShareChip";

type Props = {
  id: string;
  voted: boolean;
  hasWinner: boolean;
  onManageClick: () => void;
  party: any;
};

const chipSx = {
  px: 2,
  py: 1,
  fontSize: "0.875rem",
  fontWeight: 500,
  borderRadius: "20px",
  whiteSpace: "nowrap",
};

const PartyActions = ({
  id,
  voted,
  hasWinner,
  onManageClick,
  party,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        overflowX: "auto",
        gap: 1.5,
        mt: 2,
        pb: 1,
        whiteSpace: "nowrap",
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Chrome/Safari
        },
      }}
    >
      <Link
        to={voted || hasWinner ? `/party/${id}/myVotes` : `/party/${id}/vote`}
        style={{ textDecoration: "none" }}
      >
        <Chip
          label={voted || hasWinner ? "My Votes" : "Vote"}
          variant="filled"
          clickable
          icon={<HowToVoteOutlinedIcon sx={{ fontSize: 18 }} />}
          sx={chipSx}
        />
      </Link>

      {/* <Link to={`/party/${id}/results`} style={{ textDecoration: "none" }}>
        <Chip
          label={hasWinner ? "Winner" : "All Votes"}
          variant="filled"
          clickable
          icon={<RemoveRedEyeOutlinedIcon sx={{ fontSize: 18 }} />}
          sx={chipSx}
        />
      </Link> */}

      <Chip
        label="Manage"
        variant="filled"
        clickable
        onClick={onManageClick}
        icon={<ManageAccountsOutlinedIcon sx={{ fontSize: 18 }} />}
        sx={chipSx}
      />

      <ShareChip party={party} id={id} />
    </Box>
  );
};

export default PartyActions;
