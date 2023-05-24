var memoria = null; // Variable para almacenar el resultado previo
var nuevoValor = ''; // Variable para almacenar el nuevo valor ingresado
var operacion = ''; // Variable para almacenar la operación actual
var elemNumero = null; // Variable del elemento donde mostraremos los números
var elemOperacion = null; // Variable del elemento donde mostraremos la operación en curso
var elemAnimacion = null; // Variable donde guardaremos el elemento que tiene la marquesina.

// Esperamos a que cargue toda la web para setear las variables de elementos
window.addEventListener('load', Inicializar);

function Inicializar() {
  elemNumero = document.getElementById('numero');
  elemAnimacion = document.getElementById('animacion');
  elemOperacion = document.getElementById('Operacion');

  // Evento 'load' para resetear la calculadora al cargar la página
  Reset();

  // Activamos la marquesina
  Animacion_Marquesina(true);
}


// Función para procesar la entrada de un número
function Numero(_n) {
  // Habilitamos el botón "C".
  document.getElementById('C').removeAttribute('disabled');

  // Agregamos el nuevo valor a la variable "nuevoValor". Aquí estamos construyendo el nuevo valor a utilizar.
  nuevoValor += _n.toString();

  // Desactivamos la marquesina.
  Animacion_Marquesina(false);

  // Mostramos el nuevo valor
  elemNumero.innerHTML = nuevoValor;

  // En caso de ya ser cero, tiene que romper el ciclo.
  if (nuevoValor === "0") {
    nuevoValor = '';
  }
}

// Función para procesar la selección de un operador
function Operador(_op) {
  if (_op) {
    // Habilitamos el botón de "igual".
    document.getElementById('igual').removeAttribute('disabled');

    // Cargamos el valor del operador en el display.
    document.getElementById('operador').innerHTML = _op;

    // Almacenamos el nuevo operador recibido.
    operacion = _op;
  }

  // Llamamos a la función de parpadeo del display.
  Animacion_Parpadeo();

  // Llamamos a "Calcular" para que decida si debe o no hacer la operación.
  Calcular();
}



// Función para realizar las operaciones y mostrar el resultado
function Calcular() {

  // Si no hay nuevo valor, no hacemos nada y salimos de la función con "return";
  if (nuevoValor == '') return;


  if (memoria == null) {
    // Si memoria está vacía, es porque estamos ante el primer valor a operar, la almacenamos y no procesamos nada.
    memoria = parseInt(nuevoValor);

  } else {
    // Si no, es que "memoria" tiene algo y "nuevoValor" también.

    // Utilizamos SWITCH para reemplazar anidamientos de if else if.
    // Equivale a "if (operacion == '+') {..."
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

  // Si ya hicimos una operación, vaciamos el numero que acabamos de usar.
  nuevoValor = '';

  // Mostramos el nuevo valor en el display.
  elemNumero.innerHTML = memoria;
}

// Función para resetear la calculadora, la usamos al inicio ni bien carga la web y también cuando el usuario presiona la tecla "C".
function Reset() {
  nuevoValor = '';
  memoria = null;
  operacion = '';
  document.getElementById('numero').innerHTML = '';
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
    Calcular();
  }

  // Verificamos si se presionó algún operador
  if (teclaPresionada == "+" || teclaPresionada == "-" || teclaPresionada == "*" || teclaPresionada == "/") {
    Operador(teclaPresionada);
  }

  console.log("tecla: " + teclaPresionada);
});


function Animacion_Marquesina(_mostrar) {
  // Si el parámetro "_mostrar" es verdadero, ocultamos el elemeno del número y mostramos la animación. En caso de ser falso, hacemos lo contrario.
  if (_mostrar) {
    elemNumero.setAttribute('style', 'display: none');
    elemAnimacion.setAttribute('style', 'display: inherit');
  } else {
    elemNumero.setAttribute('style', 'display: inherit');
    elemAnimacion.setAttribute('style', 'display: none');
  }
}

// Para simular el parpadeo que tienen las calculadoras de bolsillo. Esto es algo netamente estético.
function Animacion_Parpadeo() {
  let style = elemNumero.getAttribute('style');
  elemNumero.setAttribute('style', 'display: none');
  setTimeout(function () {
    elemNumero.setAttribute('style', style);
  }, 100)
}
