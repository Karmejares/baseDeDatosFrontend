"use client";

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Typography,
  TextField,
  Alert,
  Box,
} from "@mui/material";

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
  const [expanded, setExpanded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [comment, setComment] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [grade, setGrade] = useState<number | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file && comment.trim() !== "") {
      setUploaded(true);
      setGrade(5); // Nota automática
    } else {
      alert("Por favor, sube un archivo y deja un comentario.");
    }
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "100%",
        padding: 2,
        marginBottom: 2,
      }}
    >
      <CardHeader
        title={name}
        subheader={`Profesor: ${profesor}`}
        avatar={
          <Avatar
            src={image}
            alt={alt}
            sx={{
              width: 80,
              height: 80,
              border: "2px solid #1976d2",
            }}
          />
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
          <Typography variant="h6" gutterBottom>
            Entregables:
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            - Entregable 1: Sube tu archivo y deja un comentario.
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Comentario"
              multiline
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              fullWidth
            />

            <Button variant="contained" component="label" color="primary">
              Subir archivo
              <input type="file" hidden onChange={handleFileChange} />
            </Button>

            <Button variant="outlined" color="success" onClick={handleSubmit}>
              Enviar entrega
            </Button>

            {uploaded && (
              <>
                <Alert severity="success">
                  Archivo subido correctamente. Nota asignada: {grade}
                </Alert>
              </>
            )}
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};
