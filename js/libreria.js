function getButton(id, func) {
    return document.querySelector("#" + id).addEventListener("click", func);
}

function getValue(id) {
    return document.querySelector("#" + id).value.trim();
}

function getElement(id) {
    return document.querySelector("#" + id);
}

function resetForm(id) {
    document.querySelector("#" + id).reset();
}

function formatearNombre(nombre) {
    return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
}

function formatearSoloNumeros(cadena) {
    let formatearCadena = "";
    for (let i = 0; i < cadena.length; i++) {
        if (!isNaN(cadena[i])) {
            formatearCadena += cadena[i];
        }
    }
    return formatearCadena;
}

function formatearSoloLetras(cadena) {
    let formatearCadena = "";
    for (let i = 0; i < cadena.length; i++) {
        const codigo = cadena[i].charCodeAt(0);
        if (codigo >= 65 && codigo <= 90 || codigo >= 97 && codigo <= 122) {
            formatearCadena += cadena[i];
        }
    }
    return formatearCadena;
}

function ocultarDiv(id) {
    document.querySelector("#" + id).style.display = "none";
}

function mostrarDiv(id) {
    document.querySelector("#" + id).style.display = "block";
}

function ocultarDivs() {
    ocultarDiv("ingresarDiv");
    ocultarDiv("registrarDiv");
    ocultarDiv("ingresarCedulaDiv");
    ocultarDiv("listaCensadosCensitaDiv");
    ocultarDiv("listaCensadosInvitadosDiv");
    ocultarDiv("censoDiv");
    ocultarDiv("perfilCensistaDiv");
    ocultarDiv("reasignarDiv");
    ocultarDiv("estadisticasCensistaDiv");
    ocultarDiv("validarPersonasDiv");
}

function ocultarDivsYmostrar(id) {
    ocultarDivs();
    mostrarDiv(id);
}

function eliminarEspacios(string) {
    let nuevoString = "";
    for (let i = 0; i < string.length; i++) {
        if (string[i] != " ") {
            nuevoString += string[i];
        }
    }
    return nuevoString;
}

function sonLetras(palabra) {
    let hayLetras = true;
    for (let i = 0; i < palabra.length && hayLetras; i++) {
        if (!isNaN(palabra[i]) && palabra[i] == palabra[i].toUpperCase()) {
            hayLetras = false;
        }
    }
    return hayLetras;
}

function hayNaN(numeros) {
    let hayNan = false;
    for (let i = 0; i < numeros.length && !hayNan; i++) {
        if (isNaN(numeros[i])) {
            hayNan = true;
        }
    }
    return hayNaN;
}

function chequeoPass(pass) {
    let passValida = false;
    let contieneMayuscula = false;
    let contieneMinuscula = false;
    let contieneNumero = false;
    let mensaje = "";
    for (let i = 0; i < pass.length; i++) {
        const codigo = pass[i].charCodeAt(0);

        if (codigo >= 65 && codigo <= 90) {
            contieneMayuscula = true;
        }

        if (codigo >= 97 && codigo <= 122) {
            contieneMinuscula = true;
        }

        if (codigo >= 48 && codigo <= 57) {
            contieneNumero = true;
        }
    }
    if (pass.length < 5) {
        mensaje = "La contraseña debe contener al menos 5 caracteres <br>";
    }
    if (!contieneMayuscula) {
        mensaje += "La contraseña debe contener al menos una mayúscula <br>";
    }
    if (!contieneMinuscula) {
        mensaje += "La contraseña debe contener al menos una minúscula <br>";
    }
    if (!contieneNumero) {
        mensaje += "La contraseña debe contener al menos un número";
    }
    if (contieneMayuscula && contieneMinuscula && contieneNumero) {
        passValida = true;
    }
    return [passValida, mensaje];
}

function cedulaValida(cedula) {
    const num7 = "2987634";
    const num6 = "298763";
    let cedulaValida = false;
    let aux = 0;
    if (cedula.length == 6) {
        for (let i = 0; i < cedula.length - 1; i++) {
            aux += parseInt(cedula[i]) * parseInt(num6[i]);
        }
    } else {
        for (let i = 0; i < cedula.length - 1; i++) {
            aux += parseInt(cedula[i]) * parseInt(num7[i]);
        }
    }
    if ((Math.ceil(aux / 10) * 10) - aux == parseInt(cedula[cedula.length - 1])) {
        cedulaValida = true;
    }
    return cedulaValida;
}

//AGREGAR
function cargarDatos(cedula) {
    let pos = sistema.getPosCensobyCedula(cedula);
    if (pos != -1) {
        getElement("nombreCensado").value = sistema.censos[pos].nombre;
        getElement("apellidoCensado").value = sistema.censos[pos].apellido;
        getElement("edadCensado").value = sistema.censos[pos].edad;
        getElement("departamentos").value = sistema.getDepaByPosOfCenso(pos);
        getElement("ocupaciones").value = sistema.censos[pos].ocupacion;
    }
}

function cargarCedulasNoValidadas(select) {
    let cdadCensos = 0;
    let cedulas = `<option id="cdadCensos" value="elegirCedula">-Elegir cédula-</option>`;
    for (let i = 0; i < sistema.censos.length; i++) {
        const censo = sistema.censos[i];
        if (!censo.censoValidado && censistaActual.id == censo.censistaAsociado) {
            cedulas += `<option value="${i}">${censo.cedula}</option>`;
            cdadCensos++;
        }
    }
    getElement(select).innerHTML = cedulas;
    getElement("cdadCensos").value = cdadCensos;
}

function cargarCensistas(select) { //no incluye al censista actual 
    let censistas = `<option value="elegirCensista">-Elegir censista-</option>`;
    for (let i = 0; i < sistema.censistas.length; i++) {
        const censista = sistema.censistas[i];
        if (censistaActual != censista) {
            censistas += `<option value="${censista.id}">ID: ${censista.id}, Nombre: ${censista.usuario}</option>`;
        }
    }
    getElement(select).innerHTML = censistas;
}

function agregarDeptosSelect(idSelect, listaDepartamentos) {
    let departamentos = `<option value="-1">-Elegir departamento-</option>`;
    for (let i = 0; i < listaDepartamentos.length; i++) {
        const departamentoActual = listaDepartamentos[i];
        departamentos += `<option value=${i}>${departamentoActual}</option>`;
    }
    getElement(idSelect).innerHTML = departamentos;
    //El value del departamento es la posición del departamento en la lista
}

function agregarOcupaciones(idSelect, listaOcupaciones) {
    let ocupaciones = `<option value="-1">-Elegir ocupación-</option>`;
    for (let i = 0; i < listaOcupaciones.length; i++) {
        const ocupacionActual = listaOcupaciones[i];
        ocupaciones += `<option value=${eliminarEspacios(ocupacionActual.toLowerCase())}>${ocupacionActual}</option>`;
    }
    getElement(idSelect).innerHTML = ocupaciones;
}


//ESTADÍSTICAS
function totalPersonasCensadas() {
    let retornar = `Se censaron ${censadosValidados} personas`;
    if (censadosValidados == 1) {
        retornar = `Se censó ${censadosValidados} persona`;
    }
    return retornar;
}

function personasPorDeparatamento(departamento) {
    let personasDepartamento = 0;
    for (let i = 0; i < sistema.censos.length; i++) {
        if (sistema.censos[i].departamento == departamento.toLowerCase()) {
            personasDepartamento++;
        }
    }
    return personasDepartamento;
}

function porcentajePersonasPorValidar() {
    let retornar = 0;
    if (totalPerCensadas != 0) {
        retornar = ((censadosNoValidados / totalPerCensadas) * 100).toFixed(2);
    }
    return retornar;
}

function porcentajeMenoresYMenores(departamento) {
    const censadosPorDepto = sistema.listaCensadosPorDepto(departamento, sistema.listaCensosValidados());
    const totalCensados = censadosPorDepto.length;
    let retornar = -1;
    if (totalCensados != 0) {
        let cdadMayores = 0;
        for (let i = 0; i < totalCensados; i++) {
            const censo = censadosPorDepto[i];
            if (censo.edad >= 18) {
                cdadMayores++;
            }
        }
        const porcentajeMayores = (cdadMayores / totalCensados) * 100;
        const porcentajeMenores = 100 - porcentajeMayores;
        retornar = [porcentajeMenores.toFixed(2), porcentajeMayores.toFixed(2)];

    }
    return retornar;
}