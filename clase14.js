/* -------------------------------- CLASE 15 -------------------------------- */

// Vamos implementar esta funcion en el script de Clase 14 al principio.
// La idea es que antes de la carga de la window hagamos un chequeo del Storage.
/* -------------------------------------------------------------------------- */
/*                [10] FUNCION: chequeamos si existe un usuario               */
/* -------------------------------------------------------------------------- */

function chequearUsuarioValido() {
	// 👇 objeto que obtenemos del storage
	const usuario = JSON.parse(localStorage.getItem("user"));

	// chequeamos las propiedades del objeto

	if (usuario !== null) {
		// 👇 utilizamos destructuring para separar las variables
		const { email, password, rol, terminos } = usuario;
		console.log(
			`Usuario: \n--> ${email}\n--> ${password}\n--> ${rol}\n--> ${terminos}`
		);
	} else {
		// si no hay usuario registrado en localStorage lo devolvemos al login
		location.replace("./");
		localStorage.clear();
	}
}

chequearUsuarioValido();

/* ----------------------------- MESA DE TRABAJO ---------------------------- */
// 1. Levantar el objeto desde el localStorage con key=listado
// 2. Devolver un array con nombre y apellido de las personas mayores a 18 años (se debe usar map y filter --> investigarlos)
// 3. Volver a guardarlo en localStorage bajo el mismo key
// 4. Mostrar por consola el resultado, asegurándose de que sea el requerido

localStorage.setItem(
	"listado",
	`[{"nombre":"Pedro","apellido":"Gomez","nacimiento":"11/05/1998"},{"nombre":"Joaquin","apellido":"Sotto","nacimiento":"21/10/1985"},{"nombre":"Gabriela","apellido":"Perez","nacimiento":"02/02/2010"},{"nombre":"Agustina","apellido":"Estevez","nacimiento":"21/08/1986"},{"nombre":"Paola","apellido":"Serra","nacimiento":"22/09/2009"},{"nombre":"Juan","apellido":"Coprez","nacimiento":"12/04/1977"}]`
);

/* -------------------------------- CLASE 14 -------------------------------- */

// Vamos a trabajar pasando información al Storage.
// De esta manera vamos a poder consumir en un HTML algo que haya guardado otro.
// 👉 Para eso debemos agregar al principio de la función [5] en script 'clase13' la siguiente línea:
// localStorage.setItem('user', JSON.stringify(estadoUsuario));

const listado = JSON.parse(localStorage.getItem("listado"));
const listFilter = listado.filter((persona) => {
	const fecha = new Date(persona.nacimiento);
	const edad = new Date().getFullYear() - fecha.getFullYear();
	return edad >= 18;
});
console.log(listFilter);
/* -------------------------------------------------------------------------- */
/*           [6] FUNCION: Escuchamos el evento de carga de la página          */
/* -------------------------------------------------------------------------- */
window.addEventListener("load", function () {
	const user = recuperarDataStorage();
	renderizarElementos(user);

	botonCerrarSesion();
});

/* -------------------------------------------------------------------------- */
/*                 [7] FUNCION: Recuperar la info del storage                 */
/* -------------------------------------------------------------------------- */
function recuperarDataStorage() {
	const datosEnJSON = localStorage.getItem("user");
	const datosParseados = JSON.parse(datosEnJSON);
	return datosParseados;
}

// JSON.parse(datos en formato JSON) --> lo transforma a JS
// JSON.stringify(datos en JS) --> lo transforma a JSON

/* -------------------------------------------------------------------------- */
/*                [8] FUNCION: Renderizamos la info en pantalla               */
/* -------------------------------------------------------------------------- */
function renderizarElementos(objeto) {
	const email = document.querySelector("#email");
	const perfil = document.querySelector("#perfil");

	email.innerText = objeto.email;
	perfil.innerText = objeto.rol;
}

/* -------------------------------------------------------------------------- */
/*                     [9] FUNCION: Boton de cerrar sesion                    */
/* -------------------------------------------------------------------------- */
function botonCerrarSesion() {
	const tarjeta = document.querySelector(".user");

	const boton = document.createElement("button");
	boton.style =
		"padding: 5px 20px; background-color: rgba(255,0,0,0.2); color: red; margin: 20px; border: none; cursor: pointer;";
	boton.innerText = "Cerrar sesión";

	tarjeta.appendChild(boton);

	boton.addEventListener("click", () => {
		if (confirm("¿Seguro desea cerrar sesión?")) {
			location.replace("./");
			localStorage.clear();
		}
	});
}
