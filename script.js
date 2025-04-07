let slideActual = 0;

function mostrarSlide(index) {
  const slides = document.querySelectorAll('.slide');
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function cambiarSlide(direccion) {
  const slides = document.querySelectorAll('.slide');
  slideActual = (slideActual + direccion + slides.length) % slides.length;
  mostrarSlide(slideActual);
}

function abrirVideo(src) {
  const modal = document.getElementById("modal");
  const video = document.getElementById("video");
  const iframe = document.getElementById("iframe");

  iframe.style.display = "none";
  iframe.src = "";

  video.style.display = "block";
  video.src = src;

  modal.classList.add("active");
}

function abrirIframe(url) {
  const modal = document.getElementById("modal");
  const video = document.getElementById("video");
  const iframe = document.getElementById("iframe");

  video.pause();
  video.style.display = "none";
  video.src = "";

  iframe.style.display = "block";
  iframe.src = url;

  modal.classList.add("active");
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  const video = document.getElementById("video");
  const iframe = document.getElementById("iframe");

  video.pause();
  video.src = "";
  iframe.src = "";

  video.style.display = "none";
  iframe.style.display = "none";

  modal.classList.remove("active");
}

// Inicializar con la primera imagen
mostrarSlide(slideActual);

function agregarGrupo(btn) {
  const container = document.getElementById("grupos-container");

  const grupo = document.createElement("div");
  grupo.classList.add("grupo-input");

  grupo.innerHTML = `
    <input type="text" placeholder="Nombre del invitado">
    <input type="text" placeholder="Número de WhatsApp (ej: 573001234567)">
    <button class="add-btn" onclick="agregarGrupo(this)">＋</button>
  `;

  container.appendChild(grupo);
}


async function enviarResumen() {
  const grupos = document.querySelectorAll(".grupo-input");

  for (const grupo of grupos) {
    const inputs = grupo.querySelectorAll("input");
    const nombre = inputs[0].value.trim();
    const numero = inputs[1].value.trim();

    if (nombre && numero) {
      const mensaje = `Hola ${nombre}. Te envío un resumen de nuestra presentación:

*Exámenes virtuales*: https://tuservidor.com/videos/video1.mp4

*Atención Médica Particular*: https://tuservidor.com/videos/video2.mp4

*Pruebas de Ansiedad y Depresión*: https://tuservidor.com/videos/video4.mp4

*Batería de Riesgo Psicosocial*: https://tuservidor.com/videos/video3.mp4

Gracias por participar en la reunión de *BSL*.

Daniel Talero`;

      try {
        const resp = await sendTextMessage(numero, mensaje);
        console.log("✅ Enviado a", nombre, numero, resp);
      } catch (err) {
        console.error("❌ Error al enviar a", nombre, numero, err);
      }
    }
  }
}

function abrirInvitados() {
  document.getElementById("modal-invitados").classList.add("active");
}

function cerrarInvitados() {
  document.getElementById("modal-invitados").classList.remove("active");
}

function agregarGrupo(btn) {
  const container = document.getElementById("grupos-container");

  const grupo = document.createElement("div");
  grupo.classList.add("grupo-input");

  grupo.innerHTML = `
    <input type="text" placeholder="Nombre del invitado">
    <input type="text" placeholder="Número de WhatsApp (ej: 573001234567)">
    <button class="add-btn" onclick="agregarGrupo(this)">＋</button>
  `;

  container.appendChild(grupo);
}



// Función para enviar usando WHAPI
function sendTextMessage(toNumber, messageBody) {
  const url = "https://gate.whapi.cloud/messages/text";
  const headers = {
    "accept": "application/json",
    "authorization": "Bearer due3eWCwuBM2Xqd6cPujuTRqSbMb68lt",
    "content-type": "application/json"
  };
  const postData = {
    "typing_time": 0,
    "to": toNumber,
    "body": messageBody
  };

  return fetch(url, {
    method: 'post',
    headers: headers,
    body: JSON.stringify(postData)
  })
    .then(response => response.json())
    .catch(err => console.error("❌ Error al enviar mensaje:", err));
}

