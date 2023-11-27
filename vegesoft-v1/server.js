const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const { profileEnd } = require("console");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});

app.get("/productos", (req, res) => {
  const productos = JSON.parse(fs.readFileSync("productos.json"));
  res.json(productos);
});

app.post("/productos", (req, res) => {
  const { nombre, precio } = req.body;

  if (nombre && precio) {
    const productos = JSON.parse(fs.readFileSync("productos.json"));
    productos[nombre] = precio;

    fs.writeFileSync("productos.json", JSON.stringify(productos));
    res.json({ success: true, message: "Producto agregado correctamente." });
  } else {
    res
      .status(400)
      .json({ success: false, message: "Faltan datos del producto." });
  }
});

app.post("/productos/:name", (req, res) => {
  let { name } = req.params;
  name = name.toLocaleLowerCase();

  const productos = JSON.parse(fs.readFileSync("productos.json"));
  if (productos.hasOwnProperty(name)) {
    delete productos[name]; // Elimina el atributo si existe
    fs.writeFileSync("productos.json", JSON.stringify(productos));
    res.json({ success: true, message: `Se eliminó el atributo ${name}` });
  } else {
    res
      .status(300)
      .json({
        success: false,
        message: `El atributo ${name} no existe en la base de datos`,
      });
  }
});

app.post("/productos/:name/:price", (req, res) => {
  let { name, price } = req.params;
  name = name.toLocaleLowerCase();

  const productos = JSON.parse(fs.readFileSync("productos.json"));
  if (productos.hasOwnProperty(name)) {
    productos[name]=`${price}$`;

    fs.writeFileSync("productos.json", JSON.stringify(productos));
    res.json({ success: true, message: `Se modifico el precio de ${name} , nuevo precio ${price}` });
  } else {
    res
      .status(300)
      .json({
        success: false,
        message: `El atributo ${name} no existe en la base de datos`,
      });
  }
});
