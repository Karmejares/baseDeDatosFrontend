import { Paper, PaperProps } from "@mui/material";

interface CustomPaperProps extends PaperProps {
  children: React.ReactNode;
  bgcolor?: string;
}

export const CustomPaper = ({
  children,
  sx,
  bgcolor = "#1E1E1E",
  ...rest
}: CustomPaperProps) => {
  return (
    <Paper
      sx={{
        borderRadius: 3,
        p: 4,
        bgcolor: bgcolor,
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
};
