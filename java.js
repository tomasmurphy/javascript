// // // ENTREGABLE 1 

// // // CREAR UN ALGORITMO 
// // let dato = (prompt("ingrese algo"))
// // let parseDato = parseFloat(dato)


// // if (isNaN(parseDato)) {
// //     if ((dato.toLowerCase()) === "hola") {
// //         console.log("Dijo hola");
// //     }
// // } else if (parseDato > 1000) {
// //     alert("Es mayor a mil");
// // } else if (10 <= parseDato && parseDato <= 50) {
// //     alert("Esta entre 10 y 50");
// // }

// // // CREAR UN ALGORITMO UTILIZANDO UN CICLO 

// // let n1;
// // let n2 = 0;
// // while (true) {
// //     n1 = parseInt(prompt("Ingrese un numero"));
// //     n2 = n1 + n2
// //     if (isNaN(n1)) {
// //         alert("Pusiste una letra o cancelaste, nos vimos")
// //         break
// //     }
// //     else alert(n2)
// // }
// // let salida = ""
// // let cadena = ""

// // while (true) {
// //     salida = prompt("Ingrese un texto (escribe esc para salir)")
// //     if (salida == "esc") {
// //         break
// //     }
// //     else cadena = cadena + " " + salida
// //     console.log(cadena)
// // }

// // let holas = parseInt(prompt("Ingrese un numero"));

// // for (control = 0; control < holas; control++) {
// //     console.log("hola");
// // }
// /*let ingreso = parseInt (prompt("ingrese un numero a multiplicar"));
// let salida = parseInt (prompt("ingrese cuantas veces queres multiplicar"));
// //ingreso un for para que el usario ingrese 2 numeros a multiplicar 
// for (let i = 1; i <= salida; i= i + 1){
//     let resultado = ingreso * i;
//     //agrego un continue para saltar la linea 9 y seguir hasta la indicada, es un especie de break
//     if (i==9) {
//         continue
//     }
//     //coloco el console log para que el usario vea el resultado
//     console.log(ingreso + " X " + i + " = " + resultado);
// }
// let entrada = prompt("ingresa la lista del super \n Para salir ingresa ESC");
// while (entrada != "ESC") {
//     console.log("la lista es: " + entrada );
//     entrada = prompt("ingresa la lista del super \n Para salir ingresa ESC");
// }*/
// //Ejercicio 2
// let precioProducto = parseFloat(prompt("ingrese el precio del producto"));
// //Aqui el usuario va a poner el precio del producto a calcular incluyendo el iva
// while(true){
//     if(!isNaN(precioProducto) && precioProducto != null && precioProducto != ""){
//     break;
//     }
//     else{
//         //esto se ejecuta si el usuario no ingresa un numero
//         alert('no es numero');
//         continue;
//     }
// }
    
//     alert("el precio del producto es: " + precioProducto.toFixed(2));
//     console.log("el precio del producto es: " + precioProducto.toFixed(2));

//     //Sumar el IVA al producto
//     function sumarIva(precioProducto){
//     return (precioProducto * 0.21)
//     }

//     let iva = sumarIva(precioProducto);

//     alert("el IVA es: " + iva.toFixed(2));
//     console.log("el IVA es: " + iva.toFixed(2));

//     //Sumar el precio del producto con el iva
//     function sumarPrecio(precioProducto, iva){
        
//         return precioProducto+iva
//     }
//     let precioTotal = sumarPrecio(precioProducto, iva);
   

//     alert("el precio total es: " + precioTotal.toFixed(2));
//     console.log("el precio total es: " + precioTotal.toFixed(2));

class Producto{
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
          
    }
}
let productos=[]

do{
    let id = productos.length + 1
    let nombre = prompt("Nombre del producto")
    let precio = prompt("Precio del producto")
    let producto = new Producto(id,nombre,precio)
    productos.push(producto)
    let salir = prompt("Seguir ingresando productos. s/n")
    if (salir=="n"){
        break
    }
}while(true)

function mostrarProductos(x){
    var lista="";
    for(var i=0; i<x.length; i++){
      lista+= 'id: ' + productos[i].id + 
        ' nombre: ' + productos[i].nombre + 
        ' precio: ' + productos[i].precio +
        '\n'
    }
    return(lista)
}

let stock = prompt("Ingresa id del producto")

function hayStock (a){
    if(mostrarProductos(productos).includes(a)){
        alert("Hay stock de "+a)
    }
    else alert("No hay stock del producto id:"+a)
}
hayStock(stock)

let x = parseInt(prompt("Cuanto es el maximo que quiere pagar?")
)
let productosFiltrados = productos.filter(a => a.precio < x)

console.log(mostrarProductos(productosFiltrados))