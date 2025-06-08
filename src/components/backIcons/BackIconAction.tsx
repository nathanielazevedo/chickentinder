import { Box, Button } from "@mui/material";
import { setSwipeDirection } from "../../state";
import { useAppDispatch } from "../../state/redux";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const BackIcon = ({ action }: { action: () => void }) => {
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "50px",
        position: "absolute",
        top: "10px",
        left: "10px",
        width: "100vw",
      }}
    >
      <Button
        // variant="outlined"
        onClick={() => {
          dispatch(setSwipeDirection("right"));
          action();
        }}
        sx={styles.c}
        startIcon={<ArrowBackIosNewIcon />}
      >
        Back
      </Button>
    </Box>
  );
};

export default BackIcon;

const styles = {
  c: {},
};
