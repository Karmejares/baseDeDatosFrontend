import { Router } from "express";
import { pool } from "../db";

const router = Router();

/**
 * 1️⃣ Crear entrega de una asignación (con nota aleatoria)
 * POST /api/estudiantes/entregas
 */
router.post("/entregas", async (req, res) => {
  const { idasignacion, idestudiante } = req.body;
  if (!idasignacion || !idestudiante)
    return res
      .status(400)
      .json({ error: "idasignacion y idestudiante son requeridos" });

  try {
    // Validar que la asignación y el estudiante existan
    const [[asig]]: any = await pool.query(
      "SELECT * FROM asignaciones WHERE idasignacion = ?",
      [idasignacion]
    );
    const [[est]]: any = await pool.query(
      "SELECT * FROM estudiantes WHERE idestudiante = ?",
      [idestudiante]
    );
    if (!asig || !est)
      return res
        .status(404)
        .json({ error: "Asignación o estudiante no existente" });

    // Calificación aleatoria 1-5
    const calificacion = Math.floor(Math.random() * 5) + 1;
    const fecha_entrega = new Date();

    const [result] = await pool.query(
      `INSERT INTO entregas (idasignacion, idestudiante, fecha_entrega, calificacion)
       VALUES (?, ?, ?, ?)`,
      [idasignacion, idestudiante, fecha_entrega, calificacion]
    );

    res.status(201).json({
      message: "Entrega registrada con éxito",
      identrega: (result as any).insertId,
      calificacion,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar la entrega" });
  }
});

/**
 * 2️⃣ Ver cursos en los que está inscrito el estudiante
 * GET /api/estudiantes/:idestudiante/cursos
 */
router.get("/:idestudiante/cursos", async (req, res) => {
  const { idestudiante } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT c.* FROM cursos c
       JOIN estudiante_curso ec ON ec.idcurso = c.idcurso
       WHERE ec.idestudiante = ?`,
      [idestudiante]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener cursos del estudiante" });
  }
});

/**
 * 3️⃣ Ver asignaciones y entregas del estudiante por curso
 * GET /api/estudiantes/:idestudiante/cursos/:idcurso/asignaciones
 */
router.get("/:idestudiante/cursos/:idcurso/asignaciones", async (req, res) => {
  const { idestudiante, idcurso } = req.params;
  try {
    const [rows] = await pool.query(
      `SELECT 
          a.idasignacion, 
          a.titulo, 
          a.fecha_entrega AS fecha_limite,
          e.identrega, 
          e.fecha_entrega AS fecha_real,
          e.calificacion
       FROM curso_asignacion ca
       JOIN asignaciones a ON a.idasignacion = ca.idasignacion
       LEFT JOIN entregas e 
         ON e.idasignacion = a.idasignacion 
         AND e.idestudiante = ?
       WHERE ca.idcurso = ?`,
      [idestudiante, idcurso]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener asignaciones del curso" });
  }
});

/**
 * 4️⃣ Calificación promedio del estudiante en un curso
 * GET /api/estudiantes/:idestudiante/cursos/:idcurso/calificacion
 */
router.get("/:idestudiante/cursos/:idcurso/calificacion", async (req, res) => {
  const { idestudiante, idcurso } = req.params;
  try {
    const [[promedio]]: any = await pool.query(
      `SELECT AVG(e.calificacion) AS promedio
       FROM entregas e
       JOIN asignaciones a ON a.idasignacion = e.idasignacion
       JOIN curso_asignacion ca ON ca.idasignacion = a.idasignacion
       WHERE ca.idcurso = ? AND e.idestudiante = ?`,
      [idcurso, idestudiante]
    );
    res.json({
      promedio: promedio?.promedio
        ? Number(promedio.promedio).toFixed(2)
        : null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al calcular promedio" });
  }
});

/**
 * 5️⃣ Modificar una entrega
 * PUT /api/estudiantes/entregas/:identrega
 */
router.put("/entregas/:identrega", async (req, res) => {
  const { identrega } = req.params;
  const { fecha_entrega, calificacion } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE entregas
       SET fecha_entrega = COALESCE(?, fecha_entrega),
           calificacion = COALESCE(?, calificacion)
       WHERE identrega = ?`,
      [fecha_entrega || new Date(), calificacion || null, identrega]
    );
    if ((result as any).affectedRows === 0)
      return res.status(404).json({ error: "Entrega no encontrada" });
    res.json({ message: "Entrega actualizada" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar entrega" });
  }
});

/**
 * 6️⃣ Eliminar una entrega
 * DELETE /api/estudiantes/entregas/:identrega
 */
router.delete("/entregas/:identrega", async (req, res) => {
  const { identrega } = req.params;
  try {
    const [result] = await pool.query(
      "DELETE FROM entregas WHERE identrega = ?",
      [identrega]
    );
    if ((result as any).affectedRows === 0)
      return res.status(404).json({ error: "Entrega no encontrada" });
    res.json({ message: "Entrega eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar entrega" });
  }
});

export default router;
