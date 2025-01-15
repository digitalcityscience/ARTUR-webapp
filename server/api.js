import express from "express";
import pool from "./db.js";

const router = express.Router();

router.get("/capacity", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM capacity");
    const data = rows.reduce((acc, item) => {
      const { key, ...rest } = item; // Extract the key column and the rest of the properties
      acc[key] = rest; // Use the key column as the key
      return acc;
    }, {});
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("" + err);
  }
});
router.get("/country-boundary", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, int_name name FROM ukraine_boundary`,
    );

    const features = rows.map((row) => {
      delete row.wkb_geometry;
      return {
        type: "Feature",
        properties: {
          name: row.name,
        },
        geometry: JSON.parse(row.geometry),
      };
    });
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error(err);
    res.status(500).send("" + err);
  }
});
router.get("/vulnerability", async (req, res) => {
  try {
    // Step 1: Get all column names excluding 'wkb_geometry' and the specific column to alias
    const { rows: columns } = await pool.query(
      `SELECT column_name, data_type
       FROM information_schema.columns
       WHERE table_name = 'vulnerability_index_city'
       AND column_name NOT IN ('wkb_geometry', 'fid','ogc_fid')`,
    );
    // Filter numeric columns (data_type could be 'integer', 'numeric', 'double precision', etc.)
    const numericColumns = columns.filter((col) =>
      ["integer", "numeric", "double precision", "real", "bigint", "smallint"].includes(
        col.data_type,
      ),
    );
    // Step 2: Query to get min and max for each numeric column
    const minMaxQueries = numericColumns
      .map(
        (col) =>
          `MIN("${col.column_name}") "${col.column_name}_min", ` +
          `MAX("${col.column_name}") "${col.column_name}_max"`,
      )
      .join(", ");
    const minMaxQuery = `SELECT ${minMaxQueries} FROM vulnerability_index_city`;
    const { rows: minMaxResults } = await pool.query(minMaxQuery);
    const minMaxValues = minMaxResults[0];
    // Step 3: Dynamically build the SELECT query for features
    const columnNames = columns.map((row) => `"${row.column_name}"`).join(", ");
    const query = `
      SELECT ${columnNames}, ST_AsGeoJSON(wkb_geometry) geometry FROM vulnerability_index_city
    `;
    const { rows } = await pool.query(query);
    // Step 4: Map the results to GeoJSON features
    const features = rows.map((row) => {
      const { geometry, ...properties } = row;
      return {
        type: "Feature",
        properties,
        geometry: JSON.parse(geometry),
      };
    });
    // Step 5: Create a global properties object with min/max for numeric columns
    const globalProperties = numericColumns.reduce((acc, col) => {
      const minKey = `${col.column_name}_min`;
      const maxKey = `${col.column_name}_max`;
      acc[col.column_name] = [minMaxValues[minKey], minMaxValues[maxKey]];
      return acc;
    }, {});
    // Step 6: Return the FeatureCollection with global properties
    res.json({
      type: "FeatureCollection",
      properties: globalProperties,
      features,
    });
  } catch (err) {
    res.status(500).send("" + err);
  }
});

router.get("/shelter/:city", async (req, res) => {
  // Get the city from the URL parameter http://localhost:3000/api/shelter/zhytomyr
  const city = req.params.city;
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
  const city = req.params.city;
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
  const city = req.params.city;
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
  const city = req.params.city;
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, value, access FROM ${city}_population_polygon`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: { value: row.value, access: row.access, name: `${city}_population` },
      geometry: JSON.parse(row.geometry),
    }));
    let accessible = 0,
      inaccessible = 0;
    rows.forEach((row) => {
      if (row.access) accessible += row.value;
      else inaccessible += row.value;
    });
    res.json({
      type: "FeatureCollection",
      properties: { accessible: accessible, inaccessible: inaccessible },
      features,
    });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/health-site-point/:city", async (req, res) => {
  const city = req.params.city;
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
  const city = req.params.city;
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
  const city = req.params.city;
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
  const city = req.params.city;
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
  const city = req.params.city;
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
  const city = req.params.city;
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, value, access FROM ${city}_hospital_auto_population`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: {
        value: row.value,
        access: row.access,
        name: `${city}_HealthSite_population`,
      },
      geometry: JSON.parse(row.geometry),
    }));
    let accessible = 0,
      inaccessible = 0;
    rows.forEach((row) => {
      if (row.access) accessible += row.value;
      else inaccessible += row.value;
    });
    res.json({
      type: "FeatureCollection",
      properties: { accessible: accessible, inaccessible: inaccessible },
      features,
    });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/buildings/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) geometry, id, name, building_type, level, housenumber, street from ${city}_buildings`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: {
        id: row.id,
        name: row.name,
        housenumber: row.housenumber,
        street: row.street,
        type: row.type,
        level: row.level,
      },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/water-source/:city", async (req, res) => {
  const city = req.params.city;
  // Get the city from the URL parameter http://localhost:3000/api/shelter/zhytomyr
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, id, "capacity [m*3]" capacity, usage FROM generated_${city}_water_source`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: {
        name: row.id,
        capacity: row.capacity,
        usage: row.usage,
      },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error(err);
    res.status(500).send("" + err);
  }
});
router.get("/water-source-catchment/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, range_km range FROM generated_${city}_water_source_catchment`,
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
router.get("/water-source-population/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, value, access FROM generated_${city}_water_source_catchment_population`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: {
        value: row.value,
        access: row.access,
        name: `${city}_HealthSite_population`,
      },
      geometry: JSON.parse(row.geometry),
    }));
    let accessible = 0,
      inaccessible = 0;
    rows.forEach((row) => {
      if (row.access) accessible += row.value;
      else inaccessible += row.value;
    });
    res.json({
      type: "FeatureCollection",
      properties: { accessible: accessible, inaccessible: inaccessible },
      features,
    });
  } catch (err) {
    res.status(500).send("" + err);
  }
});
router.get("/energy-supply/:city", async (req, res) => {
  const city = req.params.city;
  // Get the city from the URL parameter http://localhost:3000/api/shelter/zhytomyr
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, id, "capacity [kw]" capacity, user_type FROM generated_${city}_energy_supply`,
    );
    const features = rows.map((row) => ({
      type: "Feature",
      properties: {
        name: row.id,
        capacity: row.capacity,
        userType: row.user_type,
      },
      geometry: JSON.parse(row.geometry),
    }));
    res.json({ type: "FeatureCollection", features });
  } catch (err) {
    console.error(err);
    res.status(500).send("" + err);
  }
});
router.get("/energy-supply-catchment/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const { rows } = await pool.query(
      `SELECT ST_AsGeoJSON(wkb_geometry) as geometry, range_km range FROM generated_${city}_energy_supply_catchment`,
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
export default router;
