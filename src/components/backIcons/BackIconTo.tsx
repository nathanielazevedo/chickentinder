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
        top: "10px",
        left: "0px",
        width: "100%",
        height: "50px",
        display: "flex",
        alignItems: "center",
        position: "absolute",
        justifyContent: "space-between",
      }}
    >
      <Button
        onClick={() => {
          navigate(to);
          dispatch(setSwipeDirection("right"));
        }}
        sx={styles.c}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 10, mr: "3px" }} />
        Back
      </Button>
      {/* <Typography color='secondary'>Chicken Tinder</Typography> */}
    </Box>
  );
};

export default BackIcon;

const styles = {
  c: {
    // borderRadius: '50%',
    // minWidth: '50px',
    // minHeight: '50px',
    // position: 'absolute',
    // top: '10px',
    // left: '0px',
  },
};
