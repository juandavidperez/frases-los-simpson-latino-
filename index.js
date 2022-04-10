"use strict";

let data;

const botoncito = document.getElementById("boton");
const select = document.getElementById("seleccionar");
const random = document.getElementById("aleatorio");
const copy = document.getElementById("copiar");

const contenedor = document.getElementById("app");

botoncito.addEventListener("click", buscarPersonaje);
random.addEventListener("click", Randomizar);

function setContainerStyles() {
  const app = document.getElementById("app");
  app.className = "resultados";
}

var content;

function crearTarjeta(quote) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "tarjeta";

  // agrega la frase
  const fraseHTML = document.createElement("p");
  const frase = quote.quote;
  fraseHTML.className = "frasesita";
  fraseHTML.textContent = frase;
  // agrega la imagen
  const imagenHTML = document.createElement("img");
  const imagenURL = quote.imagen;
  imagenHTML.className = "imagenes";
  imagenHTML.src = imagenURL;
  //agrega un salto de linea
  const br = document.createElement("br");

  const button = document.createElement("button");
  button.innerHTML = "compartir";
  button.className = "copiar";
  button.value = `${quote.id}`;
  button.onclick = () =>
    navigator.clipboard
      .writeText(`https://frases-los-simpson-latino.vercel.app/?id=${quote.id}`)
      .then(() => console.log("copiado al portapapeles"))
      .catch((error) => console.log(error));
  // agrega el video
  const videoContainer = document.createElement("iframe");
  videoContainer.src = `https://www.youtube.com/embed/${quote.video}`;
  videoContainer.className = "videos";
  videoContainer.title = "YouTube video player";
  videoContainer.frameBorder = "0";
  videoContainer.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  videoContainer.allowfullscreen = true;
  //agrega la linea
  const linea = document.createElement("hr");
  // agrega todo del quote al contenedor
  tarjeta.append(fraseHTML);
  tarjeta.append(imagenHTML);
  tarjeta.append(br);
  tarjeta.append(videoContainer);
  tarjeta.append(button);
  tarjeta.append(linea);

  return tarjeta;
}

function getData(personaje, valor1, valor2) {
  contenedor.innerHTML = "<div><p>CARGANDO...</p></div>";
  return fetch(
    `https://frases-simpsons-latino.herokuapp.com/${valor1}?${valor2}=${personaje}`
  )
    .then((respuesta) => respuesta.json())
    .then((res) => {
      const contenido = document.createElement("div");
      contenido.className = "contenido";
      if (res && res.length > 0) {
        console.log({ res });
        // agrega el nombre del personaje
        const personajeHTML = document.createElement("p");
        const personaje = res[0].character;
        personajeHTML.className = "autor";
        personajeHTML.textContent = personaje;

        contenido.prepend(personajeHTML);

        res.map((quote) => {
          const tarjeta = crearTarjeta(quote);

          contenido.append(tarjeta);
          contenedor.innerHTML = "<div></div>";
          contenedor.append(contenido);

          content = `https://frases-simpsons.herokuapp.com/${valor1}?${valor2}=${personaje}`;
        });
      } else {
        contenedor.innerHTML =
          "<div class='mensaje-resultado'>No encontramos resultados para tu búsqueda, pero puedes probar una diferente!</div><br/><div class='mensaje-resultado'>¿Que tal si buscas Homero Simpson?</div>";
      }
    })
    .then(() => {
      setContainerStyles();
    });
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandom() {
  contenedor.innerHTML = "<div><p>CARGANDO...</p></div>";
  return fetch(`https://frases-simpsons-latino.herokuapp.com/quote?quote=`)
    .then((respuesta) => respuesta.json())
    .then((res) => {
      const randomNumber = between(0, res.length - 1);

      const contenido = document.createElement("div");
      contenido.className = "contenido";
      data = [res[randomNumber]];
      data.map((quote) => {
        const tarjeta = crearTarjeta(quote);
        contenido.append(tarjeta);
        contenedor.innerHTML = "<div></div>";
        const nombre = document.createElement("p");
        nombre.className = "autor";
        nombre.innerHTML = quote.character;
        contenedor.append(nombre);
        contenedor.append(contenido);
      });
    })
    .then(() => {
      setContainerStyles();
    });
}

var valor1 = "character";
var valor2 = "name";

function buscarPersonaje(event) {
  event.preventDefault();
  console.log("BUSCANDO");
  const buscar = document.getElementById("texto");

  if (select.value === "Character") {
    console.log("personaje");
    var valor1 = "character";
    var valor2 = "name";
  } else if (select.value === "Quote") {
    console.log("frase");
    var valor1 = "quote";
    var valor2 = "quote";
  }
  return getData(buscar.value, valor1, valor2);
}

function Randomizar() {
  return getRandom();
}

document.addEventListener("DOMContentLoaded", function () {
  const queryparams = window.location.search;
  const params = new URLSearchParams(queryparams);
  const personaje = params.get("character");
  const frase = params.get("quote");
  const id = params.get("id");

  if (personaje) {
    getData(personaje, "character", "name");
  }
  if (frase) {
    getData(frase, "quote", "quote");
  }
  if (id) {
    getData(id, "id", "id");
  }

  console.log("pagina cargo", { personaje });
});

console.log("carga");
