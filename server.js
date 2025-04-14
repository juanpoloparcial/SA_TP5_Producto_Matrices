const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.post("/multiplicar", (req, res) => {
  const { matriz1, matriz2 } = req.body;

  const filas = matriz1.length;
  const comunes = matriz1[0].length;
  const columnas = matriz2[0].length;

  const resultado = Array.from({ length: filas }, () => Array(columnas).fill(0));

  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < columnas; j++) {
      for (let k = 0; k < comunes; k++) {
        resultado[i][j] += matriz1[i][k] * matriz2[k][j];
      }
    }
  }

  res.json({ resultado });
});

app.listen(3000, () => {
  console.log("Servidor en el http://localhost:3000");
});
