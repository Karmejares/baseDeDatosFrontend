import { Box, Typography } from "@mui/material";
import { CustomPaper } from "../atoms";
import { AsignaturesList } from "../organism";

export const Classroom = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Typography variant="h3">Classroom</Typography>
      <CustomPaper sx={{ mt: 4, width: "80%", p: 4 }}>
        <AsignaturesList />
      </CustomPaper>
    </Box>
  );
};
