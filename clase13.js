/* -------------------------------- CLASE 13 -------------------------------- */

/* -------------------------- estado por defecto ------------------------- */
const estadoUsuario = {
  email: "",
  password: "",
  rol: "",
  terminos: false,
};

// ponemos en true solo cuando estén correctos
const estadoErroresOK = {
  email: false,
  password: false,
  rol: false,
  terminos: false,
};

/* ---------------------------------- nodos --------------------------------- */

// capturamos todos los elementos que necesitamos
const formulario = document.forms[0];

const inputEmail = document.querySelector("#email");
const inputPassword = document.querySelector("#password");
const inputRol = document.querySelector("#rol");
const inputTerminos = document.querySelector("#terminos");

const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const rolError = document.querySelector("#rolError");
const terminosError = document.querySelector("#terminosError");

/* -------------------------------------------------------------------------- */
/*                   [1] FUNCION: mostrar errores al usuario                  */
/* -------------------------------------------------------------------------- */

function mostrarErrores() {
  // por cada small mostramos u ocultamos el error
  estadoErroresOK.email
    ? emailError.classList.remove("visible")
    : emailError.classList.add("visible");

  estadoErroresOK.password
    ? passwordError.classList.remove("visible")
    : passwordError.classList.add("visible");

  estadoErroresOK.rol
    ? rolError.classList.remove("visible")
    : rolError.classList.add("visible");

  estadoErroresOK.terminos
    ? terminosError.classList.remove("visible")
    : terminosError.classList.add("visible");
}

/* -------------------------------------------------------------------------- */
/*               [2] FUNCION: actualizamos los estados de la app               */
/* -------------------------------------------------------------------------- */

// 👇 por cada cambio en el formulario actualizamos
formulario.addEventListener("change", function () {
  // 👇 actualizo el estado de la pantalla con los datos
  estadoUsuario.email = inputEmail.value;
  estadoUsuario.password = inputPassword.value;
  estadoUsuario.rol = inputRol.value;
  estadoUsuario.terminos = inputTerminos.checked;

  // 👇 actualizo el estado del error segun el estado del usuario
  estadoErroresOK.email = validarEmail(estadoUsuario.email);
  estadoErroresOK.password = validarPassword(estadoUsuario.password);
  estadoErroresOK.rol = validarRol(estadoUsuario.rol);
  estadoErroresOK.terminos = validarTerminos(estadoUsuario.terminos);

  // finalmente muestro los errores presentes
  mostrarErrores();
});

/* -------------------------------------------------------------------------- */
/*                        [3] FUNCIONES: validar campos                       */
/* -------------------------------------------------------------------------- */

function validarEmail(email) {
  let resultado = false;

  // // EJEMPLO VALIDACIÓN A MANO 👇
  // if (email.includes('@') && email.includes('.') && !email.includes(' ') && email.length > 5) {
  //     resultado = true;
  // }

  // EJEMPLO CON EXPRESION REGULAR 👇
  let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  if (regex.test(email)) {
    resultado = true;
  }

  return resultado;
}

function validarPassword(password) {
  let resultado = false;

  // si pasa las pruebas lo damos por válido 👇
  if (password.length > 5 && !password.includes(" ")) {
    resultado = true;
  }

  return resultado;
}

function validarRol(rol) {
  let resultado = false;

  // si pasa las pruebas lo damos por válido 👇
  if (rol === "frontend" || rol === "backend") {
    resultado = true;
  }

  return resultado;
}

function validarTerminos(verificacion) {
  let resultado = false;

  // si pasa las pruebas lo damos por válido 👇
  if (verificacion) {
    resultado = true;
  }

  return resultado;
}

/* -------------------------------------------------------------------------- */
/*                      [4] FUNCION: escuchamos el submit                     */
/* -------------------------------------------------------------------------- */

// en el evento submit nos remitimos a chequear nuestro estado de errores
formulario.addEventListener("submit", function (evento) {
  // prevenimos el default para manejar nososotro el comportamiento
  evento.preventDefault();

  console.log(estadoUsuario);
  console.log(estadoErroresOK);

  if (
    estadoErroresOK.email &&
    estadoErroresOK.password &&
    estadoErroresOK.rol &&
    estadoErroresOK.terminos
  ) {
    navegarPaginaExito();
  }
});

/* -------------------------------------------------------------------------- */
/*                [5] FUNCION: Formulario completado con éxito                */
/* -------------------------------------------------------------------------- */

function navegarPaginaExito() {
  localStorage.setItem("user", JSON.stringify(estadoUsuario));

  const boton = document.querySelector("button");
  boton.innerText = "Cargando...";

  setTimeout(() => {
    boton.disabled = true;
    window.location.replace("./usuario.html");
  }, 3000);

  window.removeEventListener("click", () => {
    history.back();
  });
}
