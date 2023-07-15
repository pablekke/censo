window.addEventListener("load", menu);
let modoClaro = false;

function menu() {
    getButton("btnModo", cambiarModo);
    getButton("btnPerfilCensista", perfilCensista);
    getButton("btnPerfilInvitado", perfilInvitado);
    getButton("btnRegistrarseDiv", registrarsediv);
    getButton("btnCedula", ingresarCedula);
    getButton("btnCensarPersona", censarPersona);
    getButton("btnReasignarValidar", reasignarPersonas);
    getButton("btnValidarPersonas", validarPersonaCensista);
    getButton("btnEstadisticas", estadisticasCensistaDiv);
}

function cambiarModo() {
    let href = "css/estiloOscuro.css";;
    if (modoClaro) {
        modoClaro = false;;
    } else {
        href = "css/estiloClaro.css";;
        modoClaro = true;;
    }
    getElement("modos").href = href;;
}

function registrarsediv() {
    ocultarDivsYmostrar("registrarDiv");
}

function perfilCensista() {
    getElement("textPerfilInvitado").textContent = "";
    getElement("btnAgregarDatosCenso").value = "Validar datos";
    if (censistaActual == null) {
        ocultarDivsYmostrar("ingresarDiv");
    } else {
        ocultarDivsYmostrar("perfilCensistaDiv");
    }
    resetForm("ingresarForm");
    resetForm("censoForm");
    resetForm("cedulaForm");
}

function perfilInvitado() {
    censistaActual = null;
    getElement("textPerfilInvitado").textContent = "Perfil invitado";
    getElement("btnAgregarDatosCenso").value = "Guardar datos";
    ocultarDivsYmostrar("ingresarCedulaDiv");
    mostrarDiv("btnListaCensados");
    resetForm("censoForm");
    resetForm("cedulaForm");
}

function censarPersona() {
    ocultarDivsYmostrar("ingresarCedulaDiv");
    ocultarDiv("btnListaCensados");
}
function ingresarCedula() {
    ocultarDivsYmostrar("btnCedula");
}

function reasignarPersonas() {
    cargarCedulasNoValidadas("selectDeCedulasAvalidar");
    cargarCensistas("selectCensistas");
    if (getElement("cdadCensos").value == 0) {
        alert("No tenés censos para reasignar!");
    } else {
        ocultarDivsYmostrar("reasignarDiv");
    }
}

function estadisticasCensistaDiv() {
    agregarDeptosSelect("departamentosEstadisticas", sistema.departamentos);
    ocultarDivsYmostrar("estadisticasCensistaDiv");
    mostrarDiv("listaCensadosCensitaDiv");
}

function validarPersonaCensista() {
    cargarCedulasNoValidadas("cedulasParaValidar");
    if (getElement("cdadCensos").value == 0) {
        alert("No tenés censos por validar!");
    } else {
        ocultarDivsYmostrar("validarPersonasDiv");
    }
}

function listaCensadosCensitaDiv() {
    ocultarDivsYmostrar("listaCensadosCensitaDiv");
}