const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

let entities = [
  {
    name: "Entity1",
    coordinate: [-5, 10],
    labels: ["labelA", "labelB", "labelE"],
  },
  { name: "Entity2", coordinate: [3, 6], labels: ["labelC", "labelD"] },
  { name: "Entity3", coordinate: [4, -1], labels: ["labelA", "labelC"] },
];

app.use(cors());
app.use(bodyParser.json());

// CRUD endpoints
app.get("/entities", (req, res) => res.json(entities));

app.post("/entities", (req, res) => {
  const newEntity = req.body;
  entities.push(newEntity);
  res.json(newEntity);
});

app.delete("/entities/:name", (req, res) => {
  const { name } = req.params;
  entities = entities.filter((e) => e.name !== name);
  res.json({ message: "Entity removed" });
});

app.put("/entities/:name", (req, res) => {
  const { name } = req.params;
  const updatedEntity = req.body;
  entities = entities.map((e) => (e.name === name ? updatedEntity : e));
  res.json(updatedEntity);
});

// Query endpoint
app.post("/query", (req, res) => {
  const { coord1, coord2 } = req.body;
  const [x1, y1] = coord1;
  const [x2, y2] = coord2;

  const xMin = Math.min(x1, x2);
  const xMax = Math.max(x1, x2);
  const yMin = Math.min(y1, y2);
  const yMax = Math.max(y1, y2);

  const queryResult = entities.filter((entity) => {
    const [x, y] = entity.coordinate;
    return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
  });

  const labels = [...new Set(queryResult.flatMap((entity) => entity.labels))];

  res.json({ entities: queryResult, labels });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
