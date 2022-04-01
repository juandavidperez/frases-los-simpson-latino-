"use strict";

let data;

const botoncito = document.getElementById("boton");
const select = document.getElementById("seleccionar");
const random = document.getElementById("aleatorio");
const copy = document.getElementById("copiar");

const contenedor = document.getElementById("app");

botoncito.addEventListener("click", buscarPersonaje);
random.addEventListener("click", Randomizar);
copy.addEventListener("click", copyUrl);

function setContainerStyles() {
  const app = document.getElementById("app");

  app.className = "resultados";
}

var content;

function getData(personaje, valor1, valor2) {
  contenedor.innerHTML = "<div><p>CARGANDO...</p></div>";
  return fetch(
    `https://frases-simpsons-latino.herokuapp.com/${valor1}?${valor2}=${personaje}`
  )
    .then((respuesta) => respuesta.json())
    .then((res) => {
      const contenido = document.createElement("div");
      contenido.className = "contenido";

      // agrega el nombre del personaje
      const personajeHTML = document.createElement("p");
      const personaje = res[0].character;
      personajeHTML.className = "autor";
      personajeHTML.textContent = personaje;

      contenido.prepend(personajeHTML);

      data = res;
      data.map((quote) => {
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
        tarjeta.append(linea);

        contenido.append(tarjeta);

        contenedor.innerHTML = "";
        contenedor.append(contenido);

        content = `https://frases-simpsons-latino.herokuapp.com/${valor1}?${valor2}=${personaje}`;
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
  contenedor.innerHTML = "<div><p>CARGANDO...</p></div>";
  return fetch(`https://frases-simpsons-latino.herokuapp.com/quote?quote=`)
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
        personajeHTML.className = "autor";
        personajeHTML.textContent = personaje;
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
        // agrega el video
        const videoContainer = document.createElement("iframe");
        videoContainer.src = `https://www.youtube.com/embed/${quote.video}`;
        videoContainer.className = "videos";
        videoContainer.title = "YouTube video player";
        videoContainer.frameBorder = "0";
        videoContainer.allow =
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        videoContainer.allowfullscreen = true;
        // agrega todo del quote al contenedor
        contenido.append(personajeHTML);
        contenido.append(fraseHTML);
        contenido.append(imagenHTML);
        contenido.append(br);
        contenido.append(videoContainer);
        contenedor.innerHTML = "";
        contenedor.append(contenido);
        content = `https://frases-simpsons-latino.herokuapp.com/${valor1}?${valor2}=${personaje}`;
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

function copyUrl() {
  navigator.clipboard
    .writeText(content)
    .then(() => {
      alert("Text copied to clipboard...");
    })
    .catch((err) => {
      alert("Something went wrong", err);
    });
}

function Randomizar() {
  return getRandom();
}

console.log("carga");
