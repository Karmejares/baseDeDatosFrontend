import { Box } from "@mui/material";
import { AsignatureCard } from "../molecules";

interface Asignature {
  name: string;
  profesor: string;
  image: string;
  totalPoints: number;
}

const AsignarutesList: Asignature[] = [
  {
    name: "Matemáticas",
    profesor: "Ander Marin",
    image: "/OIP.jpg",
    totalPoints: 5,
  },
];

export const AsignaturesList = () => {
  return AsignarutesList.map(({ name, profesor, image, totalPoints }) => (
    <Box key={name} style={{ marginBottom: "1rem" }}>
      <AsignatureCard
        name={name}
        image={image}
        profesor={profesor}
        totalPoints={totalPoints}
      />
    </Box>
  ));
};
