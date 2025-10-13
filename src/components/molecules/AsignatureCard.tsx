"use client";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
} from "@mui/material";
import { title } from "process";
import React from "react";

interface AsignatureCardProps {
  name: string;
  image: string;
  alt?: string;
  profesor: string;
  totalPoints: number;
}

export const AsignatureCard = ({
  name,
  image,
  alt = "Imagen de la asignatura",
  profesor,
  totalPoints,
}: AsignatureCardProps) => {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
        maxWidth: "100%",
        padding: 2,
      }}
    >
      <CardHeader
        title={name}
        subheader={`Profesor: ${profesor}`}
        slotProps={{ title: { fontWeight: "bold", fontSize: "1.5rem" } }}
        avatar={
          <Avatar
            src={image}
            alt={alt}
            sx={{
              width: 80,
              height: 80,
              border: "2px solid #1976d2",
            }}
          ></Avatar>
        }
      />
      <CardContent>
        <Typography sx={{ fontWeight: "bold" }}>
          Total Points: {totalPoints}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="primary" onClick={handleExpandClick}>
          Mirar Asignatura
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Entregables:</Typography>
          <Typography variant="body2" color="text.secondary">
            - Entregable 1: Descripción del entregable 1.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Entregable 2: Descripción del entregable 2.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            - Entregable 3: Descripción del entregable 3.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
