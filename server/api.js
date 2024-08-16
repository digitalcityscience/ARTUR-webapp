import express from "express";
import pool from "./db.js";

const router = express.Router();

router.get("/shelter/:city", async (req, res) => {
  // Get the city from the URL parameter http://localhost:3000/api/shelter/zhytomyr
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, name, description FROM ${city}_shelters`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: {
        name: row.name,
        description: row.description,
      },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get("/boundary/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry FROM ${city}_boundary`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get("/isochrone/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, range FROM ${city}_isochrone`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { range: row.range },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get("/population/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, value, access FROM ${city}_population_polygon`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { value: row.value, access: row.access, name: `${city}_population` },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
router.get("/conflict-pop", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT ST_AsGeoJSON(wkb_geometry) as geometry, population_best FROM ukraine_conflict_population",
    );
    const features = rows.map((row) => ({
      type: "Feature",
      name: "ukraine_conflict_population",
      properties: { population: row.population_best },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
export default router;
