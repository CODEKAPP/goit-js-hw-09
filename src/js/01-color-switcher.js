// Obtener referencias a los botones "Start" y "Stop"
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
stopButton.disabled = true; // Desactiva el botón "Stop"
let intervalId; // Variable para almacenar el ID del intervalo

// Función para generar un color aleatorio en formato hexadecimal
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

// Función para cambiar el color de fondo del <body>
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

// Manejador de evento para el botón "Start"
function startButtonClickHandler() {
  startButton.disabled = true; // Desactivar el botón "Start"
  intervalId = setInterval(changeBackgroundColor, 1000); // Cambiar el color cada segundo
  stopButton.disabled = false; // Habilitar el botón "Stop"
}

// Manejador de evento para el botón "Stop"
function stopButtonClickHandler() {
  startButton.disabled = false; // Habilitar el botón "Start"
  clearInterval(intervalId); // Detener el cambio de color
  stopButton.disabled = true; // Desactiva el botón "Stop"
}

// Asignar los manejadores de evento a los botones
startButton.addEventListener('click', startButtonClickHandler);
stopButton.addEventListener('click', stopButtonClickHandler);
