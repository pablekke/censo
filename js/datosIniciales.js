let idCensistaEJ = 4;
let censadosValidadosEJ = 17;
let censadosNoValidadosEJ = 13;
let censosEjemplo = [
  {
    "cedula": "26474427",
    "nombre": "Maria",
    "apellido": "Rodriguez",
    "edad": "43",
    "departamento": "tacuarembó",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 2
  },
  {
    "cedula": "6797271",
    "nombre": "Juan",
    "apellido": "Fernandez",
    "edad": "28",
    "departamento": "maldonado",
    "ocupacion": "dependiente",
    "censoValidado": false,
    "censistaAsociado": 1
  },
  {
    "cedula": "34675421",
    "nombre": "Andres",
    "apellido": "Perez",
    "edad": "15",
    "departamento": "rocha",
    "ocupacion": "estudiante",
    "censoValidado": true,
    "censistaAsociado": 3
  },
  {
    "cedula": "75553729",
    "nombre": "Ana",
    "apellido": "Gomez",
    "edad": "52",
    "departamento": "lavalleja",
    "ocupacion": "notrabaja",
    "censoValidado": false,
    "censistaAsociado": 2
  },
  {
    "cedula": "62374417",
    "nombre": "Diego",
    "apellido": "Silva",
    "edad": "19",
    "departamento": "río negro",
    "ocupacion": "estudiante",
    "censoValidado": true,
    "censistaAsociado": 3
  },
  {
    "cedula": "42651641",
    "nombre": "Laura",
    "apellido": "Lopez",
    "edad": "32",
    "departamento": "san josé",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 1
  },
  {
    "cedula": "3693781",
    "nombre": "Martin",
    "apellido": "Garcia",
    "edad": "58",
    "departamento": "cerro largo",
    "ocupacion": "dependiente",
    "censoValidado": false,
    "censistaAsociado": 2
  },
  {
    "cedula": "84781828",
    "nombre": "Luis",
    "apellido": "Perez",
    "edad": "13",
    "departamento": "colonia",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 3
  },
  {
    "cedula": "77567112",
    "nombre": "Ana",
    "apellido": "Gonzalez",
    "edad": "29",
    "departamento": "paysandú",
    "ocupacion": "estudiante",
    "censoValidado": false,
    "censistaAsociado": 1
  },
  {
    "cedula": "4192352",
    "nombre": "Carolina",
    "apellido": "Fernandez",
    "edad": "37",
    "departamento": "maldonado",
    "ocupacion": "dependiente",
    "censoValidado": true,
    "censistaAsociado": 2
  },
  {
    "cedula": "92444367",
    "nombre": "Manuel",
    "apellido": "Gomez",
    "edad": "46",
    "departamento": "san josé",
    "ocupacion": "notrabaja",
    "censoValidado": false,
    "censistaAsociado": 3
  },
  {
    "cedula": "44319697",
    "nombre": "Sofia",
    "apellido": "Rodriguez",
    "edad": "41",
    "departamento": "florida",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 1
  },
  {
    "cedula": "32886339",
    "nombre": "Valentina",
    "apellido": "Gonzalez",
    "edad": "23",
    "departamento": "treinta y tres",
    "ocupacion": "estudiante",
    "censoValidado": true,
    "censistaAsociado": 2
  },
  {
    "cedula": "45373125",
    "nombre": "Luis",
    "apellido": "Garcia",
    "edad": "16",
    "departamento": "artigas",
    "ocupacion": "dependiente",
    "censoValidado": false,
    "censistaAsociado": 3
  },
  {
    "cedula": "70630687",
    "nombre": "Ana",
    "apellido": "Silva",
    "edad": "51",
    "departamento": "montevideo",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 1
  },
  {
    "cedula": "70976093",
    "nombre": "Martin",
    "apellido": "Mendez",
    "edad": "48",
    "departamento": "rocha",
    "ocupacion": "dependiente",
    "censoValidado": false,
    "censistaAsociado": 2
  },
  {
    "cedula": "59342760",
    "nombre": "Sofia",
    "apellido": "gonzalez",
    "edad": "17",
    "departamento": "maldonado",
    "ocupacion": "estudiante",
    "censoValidado": true,
    "censistaAsociado": 3
  },
  {
    "cedula": "85744142",
    "nombre": "Luis",
    "apellido": "Fernandez",
    "edad": "55",
    "departamento": "salto",
    "ocupacion": "notrabaja",
    "censoValidado": false,
    "censistaAsociado": 1
  },
  {
    "cedula": "28824137",
    "nombre": "Ana",
    "apellido": "Rodriguez",
    "edad": "22",
    "departamento": "durazno",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 2
  },
  {
    "cedula": "88856364",
    "nombre": "Carolina",
    "apellido": "Lopez",
    "edad": "42",
    "departamento": "paysandú",
    "ocupacion": "dependiente",
    "censoValidado": false,
    "censistaAsociado": 3
  },
  {
    "cedula": "54127759",
    "nombre": "Manuel",
    "apellido": "Perez",
    "edad": "47",
    "departamento": "río negro",
    "ocupacion": "estudiante",
    "censoValidado": true,
    "censistaAsociado": 1
  },
  {
    "cedula": "54248808",
    "nombre": "Laura",
    "apellido": "Gomez",
    "edad": "10",
    "departamento": "tacuarembó",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 2
  },
  {
    "cedula": "52992748",
    "nombre": "Diego",
    "apellido": "Silva",
    "edad": "26",
    "departamento": "maldonado",
    "ocupacion": "notrabaja",
    "censoValidado": false,
    "censistaAsociado": 3
  },
  {
    "cedula": "6488969",
    "nombre": "Sofia",
    "apellido": "Gonzalez",
    "edad": "63",
    "departamento": "montevideo",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 1
  },
  {
    "cedula": "17362295",
    "nombre": "Luis",
    "apellido": "Fernandez",
    "edad": "41",
    "departamento": "san josé",
    "ocupacion": "dependiente",
    "censoValidado": false,
    "censistaAsociado": 2
  },
  {
    "cedula": "50517164",
    "nombre": "Carolina",
    "apellido": "Lopez",
    "edad": "29",
    "departamento": "canelones",
    "ocupacion": "estudiante",
    "censoValidado": true,
    "censistaAsociado": 3
  },
  {
    "cedula": "34506513",
    "nombre": "Juan",
    "apellido": "Garcia",
    "edad": "54",
    "departamento": "paysandú",
    "ocupacion": "independiente",
    "censoValidado": true,
    "censistaAsociado": 1
  },
  {
    "cedula": "6701383",
    "nombre": "Martin",
    "apellido": "Perez",
    "edad": "47",
    "departamento": "montevideo",
    "ocupacion": "dependiente",
    "censoValidado": false,
    "censistaAsociado": 2
  },
  {
    "cedula": "57756373",
    "nombre": "Sofia",
    "apellido": "Silva",
    "edad": "31",
    "departamento": "artigas",
    "ocupacion": "notrabaja",
    "censoValidado": true,
    "censistaAsociado": 3
  },
  {
    "cedula": "76509161",
    "nombre": "Luis",
    "apellido": "Gomez",
    "edad": "33",
    "departamento": "cerro largo",
    "ocupacion": "estudiante",
    "censoValidado": false,
    "censistaAsociado": 1
  }
];


let censistasEjemplos = [{
  "nombre": "Pablo",
  "usuario": "pablo",
  "pass": "aaaA1",
  "id": 1
},
{
  "nombre": "Nicolas",
  "usuario": "nico",
  "pass": "bbbB1",
  "id": 2
},
{
  "nombre": "Guillermo",
  "usuario": "guille",
  "pass": "cccC1",
  "id": 3
}
];