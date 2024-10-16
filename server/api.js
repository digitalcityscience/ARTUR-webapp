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
    res.status(500).send("" + err);
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
    res.status(500).send("" + err);
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
    res.status(500).send("" + err);
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
    res.status(500).send("" + err);
  }
});
router.get("/population-split/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, value, access FROM ${city}_population_clip_merge`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { value: row.value, access: row.access, name: `${city}_population` },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/health-site-point/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, name, amenity FROM ${city}_healthsite WHERE amenity = 'clinic' OR amenity = 'hospital'`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { name: row.name, amenity: row.amenity },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/health-site-isochrone-auto/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, contour FROM ${city}_hospital_auto_isochrone`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { range: row.contour },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/health-site-isochrone-bus/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, range FROM ${city}_hospital_bus_isochrone`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { range: row.range },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/health-site-isochrone-bicycle/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, contour FROM ${city}_hospital_bicycle_isochrone`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { range: row.contour },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/health-site-isochrone-pedestrian/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, contour FROM ${city}_hospital_pedestrian_isochrone`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { range: row.contour },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/hospital-auto-population/:city", async (req, res) => {
  const city = req.params.city.replace(/ /g, "");
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, value, access FROM ${city}_hospital_auto_population`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { value: row.value, access: row.access, name: `${city}_population` },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
export default router;
