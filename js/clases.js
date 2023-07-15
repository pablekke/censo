let idCensista = idCensistaEJ;//1;
let censadosValidados = censadosValidadosEJ;//0;
let censadosNoValidados = censadosNoValidadosEJ;//0;
let totalPerCensadas = censadosValidados + censadosNoValidados;

class Sistema {
    constructor() {
        this.censistas = censistasEjemplos;//[];
        this.censos = censosEjemplo;//[];
        this.departamentos = ["Artigas", "Canelones", "Cerro largo", "Colonia", "Durazno", "Flores", "Florida",
            "Lavalleja", "Maldonado", "Montevideo", "Paysandú", "Río negro", "Rivera", "Rocha",
            "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y tres"];
        this.ocupaciones = ["Dependiente", "Independiente", "Estudiante", "No trabaja"];
    }
    //AGREGAR
    agregarCensista(censista) {
        this.censistas.push(censista);
    }

    agregarCenso(form) {
        this.censos.push(form);
    }
    //CHEQUEOS
    credencialesCorrectas(usuario, pass) {
        let passCorrecta = false;
        for (let i = 0; i < this.censistas.length && !passCorrecta; i++) {
            const censista = this.censistas[i];
            if (censista.usuario == usuario && censista.pass == pass) {
                passCorrecta = true;
            }
        }
        return passCorrecta;
    }

    CIenSistema(cedula) {
        let estaEnSistema = false;
        for (let i = 0; i < this.cedulasValidadas.length && !estaEnSistema; i++) {
            if (this.cedulasValidadas[i] == cedula) {
                estaEnSistema = true;
            }
        }
        return estaEnSistema;
    }

    censistaActual(usuario) {
        let encontreUsuario = false;
        let id = 0;
        for (let i = 0; i < this.censistas.length && !encontreUsuario; i++) {
            const censista = this.censistas[i];
            if (censista.usuario == usuario) {
                encontreUsuario = true;
                id = censista.id;
            }
        }
        return id;
    }

    existeUsuario(usuario) {
        let existe = false;
        for (let i = 0; i < this.censistas.length && !existe; i++) {
            if (this.censistas[i].usuario == usuario) {
                existe = true;
            }
        }
        return existe;
    }

    existeCenso(cedula) {
        let encontreCenso = false;
        for (let i = 0; i < this.censos.length && !encontreCenso; i++) {
            if (this.censos[i].cedula == cedula) {
                encontreCenso = true;
            }
        }
        return encontreCenso;
    }

    eliminarUsuario(cedula) {
        let encontreCenso = false;
        for (let i = 0; i < this.censos.length && !encontreCenso; i++) {
            if (this.censos[i].cedula == cedula) {
                this.censos.splice(i, 1);
                encontreCenso = true;
            }
        }
    }
    //OBTENER DEL SISTEMA
    getRandomUser() {
        return this.censistas[Math.floor(Math.random() * this.censistas.length)];
    }

    totalPersonasCensadas() {
        return this.listaCensosValidados().length;
    }

    porcentajePersonasPorValidar() {
        let retornar = 0;
        if (totalPerCensadas != 0) {
            retornar = (censadosNoValidados * 100 / totalPerCensadas).toFixed(2);
        }
        return retornar;
    }

    getPosCensobyCedula(cedula) {
        let encontreCedula = false;
        let pos = -1;
        for (let i = 0; i < this.censos.length && !encontreCedula; i++) {
            if (cedula == this.censos[i].cedula) {
                encontreCedula = true;
                pos = i;
            }
        }
        return pos;
    }

    getDepaByPosOfCenso(pos) {
        let depa = -1;
        let encontreDepa = false;
        for (let i = 0; i < this.departamentos.length && !encontreDepa; i++) {
            if (this.censos[pos].departamento == this.departamentos[i].toLowerCase()) {
                encontreDepa = true;
                depa = i;
            }
        }
        return depa;
    }

    personasPorDeparatamento(departamento) {
        const listaValidados = this.listaCensosValidados();
        let cdadPorDepa = 0;
        for (let i = 0; i < listaValidados.length; i++) {
            const censo = listaValidados[i];
            const depto = censo.departamento;
            if (censo.censoValidado && depto == departamento) {
                cdadPorDepa++;
            }
        }
        return cdadPorDepa;
    }

    ocupacionPorDepto(departamento, ocupacion) {
        departamento = departamento.toLocaleLowerCase();
        let ocupacionPorDepto = 0;
        for (let i = 0; i < this.censos.length; i++) {
            const depto = this.censos[i].departamento;
            const ocupa = this.censos[i].ocupacion;
            if (departamento == depto && ocupacion == ocupa) {
                ocupacionPorDepto++;
            }
        }
        return ocupacionPorDepto;
    }

    //LISTAS
    listaCensosValidados() {
        let listaCensosValidados = [];
        for (let i = 0; i < this.censos.length; i++) {
            if (this.censos[i].censoValidado) {
                listaCensosValidados.push(this.censos[i]);
            }
        }
        return listaCensosValidados;
    }

    listaCensosNoValidados() {
        let listaCensosNoValidados = [];
        for (let i = 0; i < this.censos.length; i++) {
            if (!this.censos[i].censoValidado) {
                listaCensosNoValidados.push(this.censos[i]);
            }
        }
        return listaCensosNoValidados;
    }

    listaCensadosPorDepto(departamento, lista) {
        let listaPorDepto = [];
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].departamento == departamento) {
                listaPorDepto.push(lista[i]);
            }
        }
        return listaPorDepto;
    }
}

class Censista {
    constructor(nombre, usuario, pass) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.pass = pass;
        this.id = idCensista++;
    }
}

class Censo {
    constructor(cedula, nombre, apellido, edad, departamento, ocupacion, id, validado) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.departamento = departamento;
        this.ocupacion = ocupacion;
        this.censoValidado = validado;
        this.censistaAsociado = id;
    }
}