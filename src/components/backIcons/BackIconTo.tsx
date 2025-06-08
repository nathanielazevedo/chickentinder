import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setSwipeDirection } from "../../state";
import { useAppDispatch } from "../../state/redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const BackIcon = ({ to }: { to: string }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        top: "20px",
        left: "10px",
        width: "100%",
        // height: "53px",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        justifyContent: "space-between",
      }}
    >
      <Button
        // variant="outlined"
        onClick={() => {
          navigate(to);
          dispatch(setSwipeDirection("right"));
        }}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Back
      </Button>
    </Box>
  );
};

export default BackIcon;
