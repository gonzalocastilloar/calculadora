var memoria = null; // Variable para almacenar el resultado previo
var nuevoValor = ''; // Variable para almacenar el nuevo valor ingresado
var operacion = ''; // Variable para almacenar la operación actual
var elemNumero = null; // Variable del elemento donde mostraremos los números
var elemOperacion = null; // Variable del elemento donde mostraremos la operación en curso
var elemAnimacion = null; // Variable donde guardaremos el elemento que tiene la marquesina.

// Esperamos a que cargue toda la web para setear las variables de elementos
// TODO: event load

// Función para procesar la entrada de un número
function Numero(_n) {
  document.getElementById('C').removeAttribute('disabled');
  nuevoValor += _n.toString();
  Animacion_Marquesina(false);

  elemNumero.innerHTML = nuevoValor;

  if (nuevoValor === "0") {
    nuevoValor = '';
  }
}

// Función para procesar la selección de un operador
function Operador(_op) {
  if (_op) {
    document.getElementById('igual').removeAttribute('disabled');
    operacion = _op;
    document.getElementById('operador').innerHTML = _op;

    Parpadeo();
  }
  Pantalla();
}

// Función para realizar las operaciones y mostrar el resultado
function Pantalla() {
  if (operacion == 'C') {
    Reset();
  } else if (memoria == null && nuevoValor != '') {
    memoria = parseInt(nuevoValor);
  } else if (nuevoValor != '' && memoria !== null) {

    // Utilizamos SWITCH para reemplazar anidamientos de if else if.
    switch (operacion) {
      case '+':
        memoria = memoria + parseInt(nuevoValor);
        break;
      case '-':
        memoria = memoria - parseInt(nuevoValor);
        break;
      case '*':
        memoria = memoria * parseInt(nuevoValor);
        break;
      case '/':
        memoria = memoria / parseInt(nuevoValor);
        break;
      default:
        memoria = parseInt(nuevoValor);
        break;
    }
  }
  nuevoValor = '';
  elemNumero.innerHTML = memoria;
}

// Evento 'load' para resetear la calculadora al cargar la página
window.addEventListener('load', function () {
  Reset();
});

// Función para resetear la calculadora
function Reset() {
  nuevoValor = '';
  memoria = null;
  operacion = '';
  document.getElementById('operador').innerHTML = '';
  document.getElementById('C').setAttribute('disabled', true);
  document.getElementById('igual').setAttribute('disabled', true);
  Animacion_Marquesina(true);
}

// Evento 'keydown' para capturar las teclas presionadas del teclado.
document.addEventListener("keydown", function (event) {
  var teclaPresionada = event.key;

  // Verificamos si se presionó un número
  if (!isNaN(teclaPresionada)) {
    Numero(teclaPresionada);
  }

  // Verificamos si se presionó la tecla igual
  if (teclaPresionada === "=" || teclaPresionada === "Enter") {
    Pantalla();
  }

  // Verificamos si se presionó algún operador
  if (teclaPresionada == "+" || teclaPresionada == "-" || teclaPresionada == "*" || teclaPresionada == "/") {
    Operador(teclaPresionada);
  }

  console.log("tecla: " + teclaPresionada);
});


function Animacion_Marquesina(_mostrar) {
  if (_mostrar) {
    elemNumero.setAttribute('style', 'display: none');
    elemAnimacion.setAttribute('style', 'display: inherit');
  } else {
    elemNumero.setAttribute('style', 'display: inherit');
    elemAnimacion.setAttribute('style', 'display: none');
  }
}

function Animacion_Parpadeo() {
  let style = elemNumero.getAttribute('style');
  elemNumero.setAttribute('style', 'display: none');
  setTimeout(function () {
    elemNumero.setAttribute('style', 'display: none');

  })
}
