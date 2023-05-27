import Notiflix from 'notiflix'; // Importar la biblioteca Notiflix

// Referencia al formulario HTML
const form = document.querySelector('.form');
// Referencias a los elementos del formulario
// const delayInput = document.querySelector('input[name="delay"]');
// const stepInput = document.querySelector('input[name="step"]');
// const amountInput = document.querySelector('input[name="amount"]');

// // Establecer los valores predeterminados
// delayInput.value = '1000'; // Valor predeterminado de delay: 1000
// stepInput.value = '500'; // Valor predeterminado de step: 500
// amountInput.value = '5'; // Valor predeterminado de amount: 5

// Función para crear una promesa con el número de posición y retraso especificados
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    // Comprobar si la promesa debe cumplirse o rechazarse
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}

// Función para mostrar una notificación de promesa cumplida
function showFulfilledPromise(position, delay) {
  Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

// Función para mostrar una notificación de promesa rechazada
function showRejectedPromise(position, delay) {
  Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}

// Función para procesar el envío del formulario
function handleSubmit(event) {
  event.preventDefault();

  // Obtener los valores de los campos del formulario
  const delayInput = document.querySelector('input[name="delay"]');
  const stepInput = document.querySelector('input[name="step"]');
  const amountInput = document.querySelector('input[name="amount"]');

  // Convertir los valores a números
  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);

  let currentDelay = delay;

  // Crear las promesas según la cantidad y los retrasos especificados
  for (let i = 1; i <= amount; i++) {
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        showFulfilledPromise(position, delay);
      })
      .catch(({ position, delay }) => {
        showRejectedPromise(position, delay);
      });

    currentDelay += step;
  }
}

// Agregar un evento de envío al formulario
form.addEventListener('submit', handleSubmit);
