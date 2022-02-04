"use strict";

let data;

const botoncito = document.getElementById("boton");
const select = document.getElementById("seleccionar");
const random = document.getElementById("aleatorio");

const contenedor = document.getElementById("app");

botoncito.addEventListener("click", buscarPersonaje);
random.addEventListener("click", Randomizar);

function setContainerStyles() {
  const app = document.getElementById("app");
  console.log("PONIENDO ESTILOS");
  app.style.borderStyle = "solid";
  app.style.borderColor = "black";
  app.style.borderWidth = "5px";
  app.style.textAlign = "center";
  app.style.borderRadius = "15px";
}

function getData(personaje, valor1, valor2) {
  contenedor.innerHTML = "<div></div>";
  return fetch(
    `https://frases-simpsons.herokuapp.com/${valor1}?${valor2}=${personaje}`
  )
    .then((respuesta) => respuesta.json())
    .then((res) => {
      // {character
      // imagen
      // quote
      // video}

      const contenido = document.createElement("div");
      data = res;
      data.map((quote) => {
        // agrega el nombre del personaje
        const personajeHTML = document.createElement("p");
        const personaje = quote.character;
        personajeHTML.textContent = personaje;
        // agrega la frase
        const fraseHTML = document.createElement("p");
        const frase = quote.quote;
        fraseHTML.textContent = frase;
        // agrega la imagen
        const imagenHTML = document.createElement("img");
        const imagenURL = quote.imagen;
        imagenHTML.src = imagenURL;

        // agrega el video
        const videoContainer = document.createElement("iframe");
        videoContainer.src = `https://www.youtube.com/embed/${quote.video}`;
        videoContainer.width = 560;
        videoContainer.height = 315;
        videoContainer.title="YouTube video player"
        videoContainer.frameBorder="0"
        videoContainer.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        videoContainer.allowfullscreen = true;

        const linea = document.createElement("hr");

        // agrega todo del quote al contenedor

        contenido.append(personajeHTML);
        contenido.append(fraseHTML);
        contenido.append(imagenHTML);
        contenido.append(videoContainer);
        contenido.append(linea);

        contenedor.append(contenido);
      });
    })
    .then(() => {
      setContainerStyles();
    });
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandom() {
  contenedor.innerHTML = "<div></div>";
  return fetch(`https://frases-simpsons.herokuapp.com/quote?quote=`)
    .then((respuesta) => respuesta.json())
    .then((res) => {
      const randomNumber = between(0, res.length - 1);
      console.log({ randomNumber });
      const contenido = document.createElement("div");
      data = [res[randomNumber]];
      data.map((quote) => {
        // agrega el nombre del personaje
        const personajeHTML = document.createElement("p");
        const personaje = quote.character;
        personajeHTML.textContent = personaje;
        // agrega la frase
        const fraseHTML = document.createElement("p");
        const frase = quote.quote;
        fraseHTML.textContent = frase;
        // agrega la imagen
        const imagenHTML = document.createElement("img");
        const imagenURL = quote.imagen;
        imagenHTML.src = imagenURL;

        // agrega todo del quote al contenedor

        contenido.append(personajeHTML);
        contenido.append(fraseHTML);
        contenido.append(imagenHTML);

        contenedor.append(contenido);
      });
    })
    .then(() => {
      setContainerStyles();
    });
}

var valor1 = "character";
var valor2 = "name";

function buscarPersonaje() {
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

console.log("carga");
