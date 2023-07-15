window.addEventListener("load", inicio);

const sistema = new Sistema();
let censistaActual = null;

function inicio() {
    getButton("btnRegistrar", registrar);
    getButton("btnIngresar", ingresar);
    getButton("btnCerrarSesion", cerrarSesion);
    getButton("btnCedula", ingresarCedula);
    getButton("btnAgregarDatosCenso", censo);
    getButton("btnEliminarDatosCenso", eliminarDatos);
    getButton("btnReasignar", reasignarPersona);
    getButton("btnVerFormulario", cargarFomulario);
    getButton("btnEstadisticas", estadisticas);
    getButton("btnVerMayoresMenores", mostrarMayoresYMenores);
    getButton("btnMostrarPersonasCensadas", listaCensados);
    getButton("btnListaCensados", listaCensadosInvitados);
}

function registrar() {
    const nombre = formatearNombre(formatearSoloLetras(getValue("nombreCrear")));
    const usuario = getValue("usuarioCrear").toLowerCase();
    const pass = getValue("passCrear");
    let parrafo = getElement("pRegistro");
    if (nombre == "" || usuario == "" || pass == "") {
        parrafo.innerHTML = "Se deben rellenar todos los campos";
    } else if (!sonLetras(nombre)) {
        parrafo.innerHTML = "Por favor, ingresar solo letras en el campo 'Nombre'";
    } else if (sistema.existeUsuario(usuario)) {
        parrafo.innerHTML = "Usuario ya ingresado, por favor, ingresar otro";
    } else if (!chequeoPass(pass)[0]) {
        parrafo.innerHTML = chequeoPass(pass)[1];
    } else {
        sistema.agregarCensista(new Censista(nombre, usuario, pass));
        alert("Se ha registrado correctamente");
        ocultarDivsYmostrar("ingresarDiv");
        resetForm("registrarForm");
    }
}

function ingresar() {
    const usuario = getValue("usuario").toLowerCase();
    const pass = getValue("contraseña");
    let parrafo = getElement("pIngresar");
    if (!sistema.existeUsuario(usuario) || !sistema.credencialesCorrectas(usuario, pass)) {
        parrafo.innerHTML = "Usuario y/o contraseña incorrectos";
        parrafo.style = "color :red;";
    } else {
        ocultarDivsYmostrar("perfilCensistaDiv");
        id = sistema.censistaActual(usuario);
        censistaActual = sistema.censistas[id - 1];
        resetForm("registrarForm");
    }
}

function cerrarSesion() {
    censistaActual = null;
    ocultarDivsYmostrar("ingresarDiv");
}

function ingresarCedula() {
    const cedula = formatearSoloNumeros(getValue("cedula"));
    const censosValidados = sistema.listaCensosValidados();
    const listaDepartamentos = sistema.departamentos;
    const listaOcupaciones = sistema.ocupaciones;
    let parrafo = getElement("pIngresarCedula");
    parrafo.style = "color :rgb(185, 58, 58);";
    if (!cedulaValida(cedula)) {
        parrafo.innerHTML = "Ingrese una cédula válida";
    } else {
        let estaEnSistema = false;
        for (let i = 0; i < censosValidados.length; i++) {
            if (cedula == censosValidados[i].cedula) {
                estaEnSistema = true;
            }
        }
        if (estaEnSistema) {
            alert("El usuario ya fue censado y los datos fueron validados");
        } else {
            getElement("cedulaCensado").innerHTML = cedula;
            agregarOcupaciones("ocupaciones", listaOcupaciones);
            agregarDeptosSelect("departamentos", listaDepartamentos);
            cargarDatos(cedula);
            ocultarDivsYmostrar("censoDiv");
        }
    }
}

function censo() {
    const nombre = formatearNombre(formatearSoloLetras(getValue("nombreCensado")));
    const apellido = formatearNombre(formatearSoloLetras(getValue("apellidoCensado")));
    const edad = getValue("edadCensado");
    const depa = sistema.departamentos[getValue("departamentos")].toLowerCase();
    const ocupacion = getValue("ocupaciones");
    const cedula = formatearSoloNumeros(getElement("cedulaCensado").textContent);
    let parrafo = getElement("formulario");
    const censistaAsociado = sistema.getRandomUser();
    if (nombre == "" || apellido == "" || edad == "" || depa == "-1" || ocupacion == "-1") {
        parrafo.innerHTML = "Se deben rellenar todos los campos";
    } else if (!hayNaN(edad)) {
        parrafo.innerHTML = "Por favor, ingresar solo números en el campo 'Edad'";
    } else if (censistaActual != null) {
        if (sistema.existeCenso(cedula)) {
            sistema.eliminarUsuario(cedula);
            censadosNoValidados--;
        }
        sistema.agregarCenso(new Censo(cedula, nombre, apellido, edad, depa, ocupacion, censistaAsociado.id, true));
        censadosValidados++;
        ocultarDivsYmostrar("perfilCensistaDiv");
        alert("El censo fue guardado y validado extitosamente.");
        resetForm("censoForm");
    } else {
        if (sistema.existeCenso(cedula)) {
            sistema.eliminarUsuario(cedula);
            censadosNoValidados--;
        }
        sistema.agregarCenso(new Censo(cedula, nombre, apellido, edad, depa, ocupacion, censistaAsociado.id, false));
        censadosNoValidados++;
        ocultarDivsYmostrar("ingresarCedulaDiv");
        alert(`El usuario fue ingresado exitosamente y fue derivado con el censista: ${censistaAsociado.nombre}.`);
        resetForm("censoForm");
    }
}

function eliminarDatos() {
    let idActual = "perfilCensistaDiv";
    sistema.eliminarUsuario(getElement("cedulaCensado").textContent);
    censadosNoValidados--;
    if (censistaActual == null) {
        idActual = "ingresarCedulaDiv";
    }
    alert("Los datos del usuario fueron eliminados extitosamente.");
    ocultarDivsYmostrar(idActual);
    resetForm("censoForm");
}

function reasignarPersona() {
    const posCenso = getElement("selectDeCedulasAvalidar");
    const idCensistaSelect = getElement("selectCensistas");
    const cedula = getElement("selectCensistas")
    if (posCenso.selectedIndex == 0 || cedula.selectedIndex == 0) {
        getElement("reasignarError").innerHTML = "Por favor, seleccione una cédula válida y un censista válido.";
    } else {
        sistema.censos[posCenso.value].censistaAsociado = idCensistaSelect.value;
        alert("El censo fue reasignado correctamente");
        resetForm("reasignarForm");
        ocultarDivsYmostrar("perfilCensistaDiv");
    }
}

function cargarFomulario() {
    const posCenso = getElement("cedulasParaValidar");
    if (posCenso.selectedIndex == 0 || cedula.selectedIndex == 0) {
        getElement("pValidarPersona").innerHTML = "Por favor, seleccione una cédula válida";
    } else {
        const cedula = sistema.censos[posCenso.value].cedula;
        getElement("cedulaCensado").innerHTML = cedula;
        agregarOcupaciones("ocupaciones", sistema.ocupaciones);
        agregarDeptosSelect("departamentos", sistema.departamentos);
        cargarDatos(cedula);
        ocultarDivsYmostrar("censoDiv");
    }
}

function estadisticas() {
    //Censados Validados
    const totalValidados = sistema.totalPersonasCensadas();
    const porcentajeNoValidados = sistema.porcentajePersonasPorValidar();
    let totalValidadosMsj = `Se censaron ${totalValidados} personas.`;
    if (totalValidados == 1) {
        totalValidadosMsj = `Se censó a ${totalValidados} persona.`;
    }
    getElement("censadoEstadistica").innerHTML = totalValidadosMsj;
    getElement("pendientesEstadistica").innerHTML = porcentajeNoValidados;
}

function listaCensados() {
    let personasPorDepa = "<caption>Personas censadas por departamento</caption><tr><th>Departamentos</th><th>Personas censadas</th></tr>";
    for (let i = 0; i < sistema.departamentos.length; i++) {
        const departamento = sistema.departamentos[i];
        const cdadPorDepa = sistema.personasPorDeparatamento(departamento.toLowerCase());
        let mensaje = `Se censaron ${cdadPorDepa} personas`;
        if (cdadPorDepa == 0) {
            mensaje = `No hay datos`;
        } else if (cdadPorDepa == 1) {
            mensaje = `Se censó ${cdadPorDepa} persona`;
        }
        personasPorDepa += `<tr><td>${departamento}</td><td>${mensaje}</td></tr>`;
    }
    getElement("tablaEstadisticas").innerHTML = personasPorDepa;
}

function mostrarMayoresYMenores() {
    getElement("mayoresYMenores").style.color = "rgb(185, 58, 58)";
    const posDepto = getElement("departamentosEstadisticas");
    let mensaje = "";
    if (posDepto.selectedIndex == 0) {
        mensaje = "Por favor, elige un departamento válido.";
    } else {
        const depto = sistema.departamentos[posDepto.value];
        const porcentajes = porcentajeMenoresYMenores(depto.toLowerCase());
        if (porcentajes == -1) {
            mensaje = `No hay personas censadas en ${depto}`;
        } else {
            const porcentajeMenores = porcentajes[0];
            const porcentajeMayores = porcentajes[1];
            mensaje = `Para el departamento ${formatearNombre(depto)}:<br>
            Porcentaje de personas menores de edad: ${porcentajeMenores}%<br>
            Porcentaje de personas mayores de edad: ${porcentajeMayores}%`;
            getElement("mayoresYMenores").style.color = "black";
        }
    }
    getElement("mayoresYMenores").innerHTML = mensaje;
}

function listaCensadosInvitados() {
    mostrarDiv("listaCensadosInvitadosDiv");
    let tabla = `
    <caption>Lista de censados</caption>
    <tr>
        <th>Departamento</th>
        <th>Estudian</th>
        <th>No trabajan</th>
        <th>Dependientes o independientes</th>
        <th>Porcentaje del total de censados</th>
    </tr>`;
    for (let i = 0; i < sistema.departamentos.length; i++) {
        const departamento = sistema.departamentos[i];
        let estudian = sistema.ocupacionPorDepto(departamento, "estudiante");
        let noTrabajan = sistema.ocupacionPorDepto(departamento, "notrabaja");
        let dependientes = sistema.ocupacionPorDepto(departamento, "dependiente");
        let independientes = sistema.ocupacionPorDepto(departamento, "independiente");
        let censadosTotPorDepto = (personasPorDeparatamento(departamento) / totalPerCensadas) * 100;
        if (isNaN(censadosTotPorDepto)) {
            censadosTotPorDepto = 0;
        }
        let estudianStyle = "color: rgb(86, 207, 70);";
        let noTrabajanStyle = "color: rgb(86, 207, 70);";
        let depIndepStyle = "color: rgb(86, 207, 70);";

        if (estudian == 0) {
            estudianStyle = 'color: rgb(185, 58, 58);';
        }
        if (noTrabajan == 0) {
            noTrabajanStyle = 'color: rgb(185, 58, 58);';
        }
        if (dependientes + independientes == 0) {
            depIndepStyle = 'color: rgb(185, 58, 58);';
        }
        tabla += `<tr><td>${departamento}</td>
        <td style="${estudianStyle}">${estudian}</td>
        <td style="${noTrabajanStyle}">${noTrabajan}</td>
        <td style="${depIndepStyle}">${dependientes + independientes}</td>
        <td>%${censadosTotPorDepto.toFixed(2)}</td></tr>`;
    }
    getElement("listaCensadosInvitados").innerHTML = tabla;
}