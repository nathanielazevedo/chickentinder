import Fields from "./Fields";
import NavBar from "./Navbar";
import { Box } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Main = () => {
  return (
    <>
      <NavBar />
      <Box sx={styles.container}>
        <Fields />
      </Box>
    </>
  );
};

export default Main;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "5rem",
  },
};
