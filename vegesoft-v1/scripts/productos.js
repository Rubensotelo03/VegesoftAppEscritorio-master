// productos.js

const apiUrl = "http://localhost:3000/productos";

const mostrarListaProductos = async () => {
  try {
    const response = await fetch(apiUrl);
    const productosConocidos = await response.json();

    const productosList = document.getElementById("productosList");
    productosList.innerHTML = "";

    for (const producto in productosConocidos) {
      const li = document.createElement("li");
      li.textContent = `${producto}: ${productosConocidos[producto]}`;
      const editarBtn = document.createElement("button");
      editarBtn.textContent = "Editar";
      editarBtn.onclick = ((prod) => {
        return () => editarProducto(prod);
      })(producto); // Utilizando una IIFE para preservar el valor de producto
      li.appendChild(editarBtn);

      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.onclick = ((prod) => {
        return () => eliminarProducto(prod);
      })(producto); // Utilizando una IIFE para preservar el valor de producto
      li.appendChild(eliminarBtn);

      productosList.appendChild(li);
    }
  } catch (error) {
    console.error("Error al obtener la lista de productos: ", error);
  }
};

const guardarNuevoProducto = async () => {
  const newProductName = document.getElementById("newProductName").value;
  const newProductPrice = document.getElementById("newProductPrice").value;

  if (newProductName && newProductPrice) {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: newProductName,
          precio: newProductPrice,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Listo!",
          text: "Producto agregado correctamente.",
          icon: "success"
        });
       document.getElementById("newProductName").value = "";
       document.getElementById("newProductPrice").value = "";
        mostrarListaProductos()
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al agregar el producto. Verifica los datos!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } catch (error) {
      console.error("Error al agregar el producto: ", error);
    }
  } else {
    alert("Por favor, ingresa ambos nombre y precio del producto.");
  }
};

const editarProducto = async (producto) => {
  // Implementa la lógica para editar un producto
  // Puedes usar una ventana modal, por ejemplo, para recoger nuevos datos
  // y luego realizar una solicitud PUT al servidor.
  const { value: formValues } = await Swal.fire({
    title: "Editar Producto",
    html: `
      <input id="swal-input1" class="swal2-input" value="${producto}">
      <input id="swal-input2" class="swal2-input" type="number">
    `,
    focusConfirm: false,
    preConfirm: () => {      

      return [
        document.getElementById("swal-input1").value,
        document.getElementById("swal-input2").value
      ];
    }
  });
  if (formValues) {
    const newProductName = formValues[0];
    const newProductPrice = formValues[1];

    Swal.fire(JSON.stringify(formValues));

    try {
      const response = await fetch(`${apiUrl}/${newProductName}/${newProductPrice}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          
        }),
      });

      const result = await response.json();

      if (result.success) {
        Swal.fire({
          title: "Listo!",
          text: "Producto modificado correctamente.",
          icon: "success"
        });
        mostrarListaProductos()
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al modificar el producto. Verifica los datos!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    } catch (error) {
      console.error("Error al modificar el producto: ", error);
    }
  }
 
};

const eliminarProducto = async (producto) => {
  // Implementa la lógica para eliminar un producto
  // Puedes confirmar con el usuario y luego realizar una solicitud DELETE al servidor.
  try {
    const response = await fetch(`${apiUrl}/${producto}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
      }),
    });

    const result = await response.json();

    if (result.success) {
      Swal.fire({
        title: "Listo!",
        text: "Producto eliminado correctamente.",
        icon: "success"
      });
      mostrarListaProductos()
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al eliminar el producto. Verifica los datos!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    }
  } catch (error) {
    console.error("Error al agregar el producto: ", error);
  }

};

document.addEventListener("DOMContentLoaded", mostrarListaProductos);
