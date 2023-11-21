// script.js

document.addEventListener('DOMContentLoaded', async function () {
    let currentProductName = '';
    let currentProductPrice = '';
    let productosConocidos = await cargarProductosConocidos();
  
    let objectDetected = false;
    let framesWithoutObject = 0;
    const framesThreshold = 30;
  
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = document.getElementById('cameraView');
      videoElement.srcObject = stream;
  
      const model = await cocoSsd.load();
  
      const detectObjects = async () => {
        try {
          const predictions = await model.detect(videoElement);
  
          if (predictions.length > 0) {
            const detectedClass = predictions[0].class || 'Desconocido';
  
            if (productosConocidos[detectedClass.toLowerCase()]) {
              if (currentProductName !== detectedClass) {
                currentProductName = detectedClass;
                currentProductName = currentProductName.toUpperCase();
                document.getElementById('productName').value = currentProductName;
  
                currentProductPrice = productosConocidos[currentProductName.toLowerCase()] || '';
                document.getElementById('productPrice').value = currentProductPrice;
  
                objectDetected = true;
                framesWithoutObject = 0;
              }
            }
          } else {
            if (objectDetected) {
              framesWithoutObject++;
              if (framesWithoutObject >= framesThreshold) {
                currentProductName = '';
                currentProductPrice = '';
                document.getElementById('productName').value = '';
                document.getElementById('productPrice').value = '';
                objectDetected = false;
              }
            }
          }
        } catch (error) {
          console.error('Error al detectar objetos: ', error);
        }
  
        requestAnimationFrame(detectObjects);
      };
  
      detectObjects();
    } catch (error) {
      console.error('Error al acceder a la cámara o cargar el modelo COCO-SSD: ', error);
    }
  });
  
  async function cargarProductosConocidos() {
    try {
      const response = await fetch('http://localhost:3000/productos');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al cargar la lista de productos conocidos: ', error);
      return {};
    }
  }
  