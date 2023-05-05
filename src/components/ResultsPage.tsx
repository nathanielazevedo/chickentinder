import { Box } from "@mui/material";
import Results from "./Results";
import Navbar from "./Navbar";

const ResultsPage = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "calc(100vh - 80px)",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: { xs: "40px 5px", sm: "40px" },
            borderRadius: "20px",
            width: { xs: "100%", sm: "600px" },
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          <Results />
        </Box>
      </Box>
    </>
  );
};

export default ResultsPage;
