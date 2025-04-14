document.getElementById("dimensionForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const rows1 = parseInt(document.getElementById("rows1").value);
    const common = parseInt(document.getElementById("common").value);
    const cols2 = parseInt(document.getElementById("cols2").value);
  
    const container = document.getElementById("matrices");
    container.innerHTML = ""; // limpiar
  
    const crearTabla = (nombre, rows, cols, prefix) => {
      const div = document.createElement("div");
      div.innerHTML = `<h3>${nombre}</h3>`;
      const table = document.createElement("table");
      for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
          const td = document.createElement("td");
          td.innerHTML = `<input type="number" required name="${prefix}-${i}-${j}">`;
          tr.appendChild(td);
        }
        table.appendChild(tr);
      }
      div.appendChild(table);
      container.appendChild(div);
    };
  
    crearTabla("Matriz 1", rows1, common, "m1");
    crearTabla("Matriz 2", common, cols2, "m2");
  
    document.getElementById("multiplicarBtn").style.display = "block";
  });
  
  document.getElementById("multiplicarBtn").addEventListener("click", async () => {
    const rows1 = parseInt(document.getElementById("rows1").value);
    const common = parseInt(document.getElementById("common").value);
    const cols2 = parseInt(document.getElementById("cols2").value);
  
    const matriz1 = [], matriz2 = [];
  
    for (let i = 0; i < rows1; i++) {
      matriz1[i] = [];
      for (let j = 0; j < common; j++) {
        const val = document.querySelector(`[name="m1-${i}-${j}"]`).value;
        if (val === "" || isNaN(val)) return alert("Todos los campos deben ser numéricos.");
        matriz1[i][j] = Number(val);
      }
    }
  
    for (let i = 0; i < common; i++) {
      matriz2[i] = [];
      for (let j = 0; j < cols2; j++) {
        const val = document.querySelector(`[name="m2-${i}-${j}"]`).value;
        if (val === "" || isNaN(val)) return alert("Todos los campos deben ser numéricos.");
        matriz2[i][j] = Number(val);
      }
    }
  
    const res = await fetch("/multiplicar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matriz1, matriz2 })
    });
  
    const data = await res.json();
    mostrarResultado(data.resultado);
  });
  
  function mostrarResultado(matriz) {
    const div = document.getElementById("resultado");
    div.innerHTML = "";
  
    const table = document.createElement("table");
    matriz.forEach(fila => {
      const tr = document.createElement("tr");
      fila.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
  
    div.appendChild(table);
  }
  