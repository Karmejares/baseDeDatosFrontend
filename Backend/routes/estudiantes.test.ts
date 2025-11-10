import request from "supertest";
import express from "express";
import router from "./estudiantes";
import { pool } from "../db";

// Mock del pool de base de datos
jest.mock("../db", () => ({
  pool: {
    query: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use("/api/estudiantes", router);

describe("Estudiantes API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /entregas", () => {
    test("debería crear una entrega exitosamente", async () => {
      // Mock de las consultas
      (pool.query as jest.Mock)
        .mockResolvedValueOnce([[{ id: 1 }]]) // asignación existe
        .mockResolvedValueOnce([[{ id: 1 }]]) // estudiante existe
        .mockResolvedValueOnce([{ insertId: 1 }]); // inserción exitosa

      const res = await request(app).post("/api/estudiantes/entregas").send({
        idasignacion: 1,
        idestudiante: 1,
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("identrega");
      expect(res.body).toHaveProperty("calificacion");
    });

    test("debería retornar 400 si faltan datos requeridos", async () => {
      const res = await request(app).post("/api/estudiantes/entregas").send({});

      expect(res.status).toBe(400);
    });
  });

  describe("GET /:idestudiante/cursos", () => {
    test("debería obtener los cursos de un estudiante", async () => {
      const mockCursos = [{ idcurso: 1, nombre: "Matemáticas" }];

      (pool.query as jest.Mock).mockResolvedValueOnce([mockCursos]);

      const res = await request(app).get("/api/estudiantes/1/cursos");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("DELETE /entregas/:identrega", () => {
    test("debería eliminar una entrega exitosamente", async () => {
      (pool.query as jest.Mock).mockResolvedValueOnce([{ affectedRows: 1 }]);

      const res = await request(app).delete("/api/estudiantes/entregas/1");

      expect(res.status).toBe(200);
    });
  });
});
