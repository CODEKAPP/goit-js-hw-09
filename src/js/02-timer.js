// Importación de bibliotecas y estilos
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Referencias a elementos HTML
const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Función para actualizar la visualización del temporizador en la interfaz
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

// Función para agregar un cero al frente de valores numéricos menores que 10
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

// Función para convertir milisegundos en componentes de tiempo
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Función para iniciar el temporizador
function startTimer() {
  // Obtener la fecha seleccionada y la hora actual
  const selectedDate = new Date(datetimePicker.value);
  const currentTime = new Date();

  // Comprobar si la fecha seleccionada es válida (en el futuro)
  if (selectedDate <= currentTime) {
    Notiflix.Notify.warning('Please choose a date in the future');
    return;
  }

  // Calcular el tiempo restante en milisegundos
  const remainingTime = selectedDate - currentTime;

  // Actualizar la visualización del temporizador
  updateTimerDisplay(0, 0, 0, 0);
  startButton.disabled = true;

  // Intervalo de cuenta regresiva que se actualiza cada segundo
  const countdownIntervalId = setInterval(() => {
    const remainingTime = selectedDate - new Date();

    // Comprobar si se ha alcanzado la fecha de finalización
    if (remainingTime <= 0) {
      clearInterval(countdownIntervalId);
      updateTimerDisplay(0, 0, 0, 0);
      startButton.disabled = false;
      Notiflix.Notify.success('Countdown completed!');
      return;
    }

    // Convertir el tiempo restante en componentes de días, horas, minutos y segundos
    const { days, hours, minutes, seconds } = convertMs(remainingTime);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
}

// Inicializar flatpickr en el elemento de selección de fecha
flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  enableSeconds:true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Obtener la fecha seleccionada y la hora actual al cerrar el selector de fecha
    const selectedDate = selectedDates[0];
    const currentTime = new Date();

    // Comprobar si la fecha seleccionada es válida (en el futuro)
    if (selectedDate <= currentTime) {
      Notiflix.Notify.warning('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

// Agregar un evento de clic al botón de inicio
startButton.addEventListener('click', startTimer);
