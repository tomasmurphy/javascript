// ENTREGABLE 1 
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