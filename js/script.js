let guias = [];

const estados = ["Pendiente", "En tránsito", "Entregado"];

const forma = document.getElementById("formGuia");
const listaGuias = document.getElementById("listaGuias")

const guiasPendientesE1 = document.getElementById("guiasPendientes");
const guiasTransitoE1 = document.getElementById("guiasTransito");
const guiasEntregadasE1 = document.getElementById("guiasEntregadas");

const modal = document.getElementById("modalHistorial");
const cerrarModal = document.getElementById("cerrarModal");
const contenidoHistorial = document.getElementById("contenidoHistorial");

forma.addEventListener("submit", (e) => {
    e.preventDefault();

    const numero =  document.getElementById("numero").value.trim();
    const destinatario =  document.getElementById("destinatario").value.trim();
    const estado =  document.getElementById("estado").value.trim();
    const origen =  document.getElementById("origen").value.trim();
    const destino =  document.getElementById("destino").value.trim();
    const fecha =  document.getElementById("fecha").value.trim();

    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    let valido = true;

    if (!numero) {document.getElementById("errorNumero").textContent = "Requerido"; valido = false; }
    else if (guias.some(g => g.numero === numero)) {
        document.getElementById("errorNumero").textContent = "El número de guía ya existe"; valido = false;
    }
    if (!destinatario) {document.getElementById("errorDestinatario") .textContent = "Requerido"; valido = false; }
    if (!estado) {document.getElementById("errorEstado").textContent = "Seleccione el estado"; valido = false; }
    if (!origen) {document.getElementById("errorOrigen").textContent = "Requerido"; valido = false; }
    if (!destino) {document.getElementById("errorDestino").textContent = "Requerido"; valido = false; }
    if (!fecha) {document.getElementById("errorFecha").textContent = "Requerido"; valido = false; }

    if(!valido) return;

    //crear Guia
    const nuevaGuia = {numero, destinatario, estado, origen, destino, fecha, historial: [{estado, fechaHora: new Date().toLocaleString()}]};

    guias.push(nuevaGuia);
    console.log(guias);
    mostrarGuias();
    actualizaPanel();
    // forma.reset();

});

//Mostrar las guias
function mostrarGuias() {
    listaGuias.innerHTML = "";
    guias.forEach((guia, index) => {
        const div = document.createElement("div");
        div.classList.add("guia");
        div.innerHTML = `
            <p><strong>${guia.numero}</strong> - ${guia.destinatario}</p>
            <p>Estado: ${guia.estado}</p>
            <p>Origen: ${guia.origen} → Destino: ${guia.destino}</p>
            <p>Fecha: ${guia.fecha}</p>
            <button onclick="actualizarEstado(${index})">Actualizar Estado</button>
            <button onclick="verHistorial(${index})">Ver Historial</button>
        `;
        listaGuias.appendChild(div);
    });
}


//Actualizar estado de las guias
function actualizarEstado(index){
    const guia = guias[index];
    let estadoActual = guia.estado;
    let idx = estados.indexOf(estadoActual);

    if(idx < estados.length - 1){
        guia.estado = estados[idx + 1];
        guia.historial.push({ estado: guia.estado, fechaHora: new Date().toLocaleString()});
    }

    mostrarGuias();
    actualizaPanel();
}

//Ver el historial
function verHistorial(index){
    const guia = guias[index];
    contenidoHistorial.innerHTML = "";
    guia.historial.forEach(h => {
        const p = document.createElement("p");
        p.textContent = `${h.fechaHora} - Estado: ${h.estado}`;
        contenidoHistorial.appendChild(p);
    });
    modal.style.display = "block";
}

cerrarModal.onclick = () => {modal.style.display = "none"; };

function actualizaPanel(){
    guiasPendientesE1.textContent = guias.filter(g => g.estado === "Pendiente").length
    guiasTransitoE1.textContent = guias.filter(g => g.estado === "En tránsito").length;
    guiasEntregadasE1.textContent = guias.filter(g => g.estado === "Entregado").length;
}