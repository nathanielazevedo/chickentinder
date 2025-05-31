import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number | ReactNode;
  icon?: ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Box
    sx={{
      padding: 2,
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minWidth: 120,
      backgroundColor: "rgba(14, 107, 125, 0.1)",
    }}
  >
    {icon && <Box sx={{ mb: 1 }}>{icon}</Box>}
    <Typography variant="h4">{value}</Typography>
    <Typography variant="body2" color="text.secondary" mt={1}>
      {title}
    </Typography>
  </Box>
);

export default StatCard;
