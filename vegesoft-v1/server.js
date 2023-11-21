const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/productos', (req, res) => {
  const productos = JSON.parse(fs.readFileSync('productos.json'));
  res.json(productos);
});

app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;

  if (nombre && precio) {
    const productos = JSON.parse(fs.readFileSync('productos.json'));
    productos[nombre] = precio;

    fs.writeFileSync('productos.json', JSON.stringify(productos));
    res.json({ success: true, message: 'Producto agregado correctamente.' });
  } else {
    res.status(400).json({ success: false, message: 'Faltan datos del producto.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
