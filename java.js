// ENTREGABLE 1 

// CREAR UN ALGORITMO 
let dato = (prompt("ingrese algo"))
let parseDato = parseFloat(dato)


if (isNaN(parseDato)) {
    if ((dato.toLowerCase()) === "hola") {
        console.log("Dijo hola");
    }
} else if (parseDato > 1000) {
    alert("Es mayor a mil");
} else if (10 <= parseDato && parseDato <= 50) {
    alert("Esta entre 10 y 50");
}

// CREAR UN ALGORITMO UTILIZANDO UN CICLO 

let n1;
let n2 = 0;
while (true) {
    n1 = parseInt(prompt("Ingrese un numero"));
    n2 = n1 + n2
    if (isNaN(n1)) {
        alert("Pusiste una letra o cancelaste, nos vimos")
        break
    }
    else alert(n2)
}
let salida = ""
let cadena = ""

while (true) {
    salida = prompt("Ingrese un texto (escribe esc para salir)")
    if (salida == "esc") {
        break
    }
    else cadena = cadena + " " + salida
    console.log(cadena)
}

let holas = parseInt(prompt("Ingrese un numero"));

for (control = 0; control < holas; control++) {
    console.log("hola");
}