import { setSwipeDirection } from "../state";
import { useAppDispatch } from "../state/redux";
import { Box, Button, Typography } from "@mui/material";

type Props = {
  text: string;
  height?: string;
  selected?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  disabled?: boolean | undefined;
  type?: "button" | "submit" | "reset" | undefined;
};

const MainButton = ({
  text,
  icon,
  type,
  height,
  onClick,
  // selected = false,
  disabled = false,
}: Props) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      fullWidth
      variant="outlined"
      disabled={disabled}
      type={type ?? "button"}
      onClick={() => {
        onClick && onClick();
        dispatch(setSwipeDirection("left"));
      }}
      sx={{
        height: height ?? "50px",
        // border: !selected ? "none" : "grey 1px solid",
        // backgroundColor: "rgb(0, 213, 250, 15%)",
        "&:hover": {
          backgroundColor: "rgb(0, 213, 250, 25%)",
          // border: !selected ? "none" : "grey 1px solid",
        },
        "&:disabled": {
          border: "none",
        },
      }}
    >
      <Typography>{text}</Typography>
      {icon && (
        <Box display="flex" alignSelf="center" alignItems="center">
          {icon}
        </Box>
      )}
    </Button>
  );
};

export default MainButton;
