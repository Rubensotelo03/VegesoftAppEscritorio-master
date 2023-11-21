// productos.js

const apiUrl = 'http://localhost:3000/productos';

const mostrarListaProductos = async () => {
  try {
    const response = await fetch(apiUrl);
    const productosConocidos = await response.json();

    const productosList = document.getElementById('productosList');
    productosList.innerHTML = '';

    for (const producto in productosConocidos) {
      const li = document.createElement('li');
      li.textContent = `${producto}: ${productosConocidos[producto]}`;

      const editarBtn = document.createElement('button');
      editarBtn.textContent = 'Editar';
      editarBtn.onclick = () => editarProducto(producto);
      li.appendChild(editarBtn);

      const eliminarBtn = document.createElement('button');
      eliminarBtn.textContent = 'Eliminar';
      eliminarBtn.onclick = () => eliminarProducto(producto);
      li.appendChild(eliminarBtn);

      productosList.appendChild(li);
    }
  } catch (error) {
    console.error('Error al obtener la lista de productos: ', error);
  }
};

const guardarNuevoProducto = async () => {
  const newProductName = document.getElementById('newProductName').value;
  const newProductPrice = document.getElementById('newProductPrice').value;

  if (newProductName && newProductPrice) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre: newProductName, precio: newProductPrice }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Producto agregado correctamente.');
        mostrarListaProductos();
      } else {
        alert('Error al agregar el producto. Verifica los datos.');
      }
    } catch (error) {
      console.error('Error al agregar el producto: ', error);
    }
  } else {
    alert('Por favor, ingresa ambos nombre y precio del producto.');
  }
};

const editarProducto = async (producto) => {
  // Implementa la lógica para editar un producto
  // Puedes usar una ventana modal, por ejemplo, para recoger nuevos datos
  // y luego realizar una solicitud PUT al servidor.
};

const eliminarProducto = async (producto) => {
  // Implementa la lógica para eliminar un producto
  // Puedes confirmar con el usuario y luego realizar una solicitud DELETE al servidor.
};

document.addEventListener('DOMContentLoaded', mostrarListaProductos);
