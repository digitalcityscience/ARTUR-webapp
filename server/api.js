import express from "express";
import pool from "./db.js";

const router = express.Router();

router.get("/pop", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT ST_AsGeoJSON(wkb_geometry) as geojson, population_best FROM ukraine_conflict_pop",
    );
    const features = rows.map((row) => ({
      type: "Feature",
      geometry: JSON.parse(row.geojson),
      properties: {
        population: row.population_best,
      },
    }));
    res.json({
      type: "FeatureCollection",
      features,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

export default router;
