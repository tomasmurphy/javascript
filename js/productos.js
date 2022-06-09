class Producto{
    constructor(id, categoria, nombre, descripcion, precio){
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = parseFloat(precio);
        this.vendido = false;  
    }
    vender(){
        this.vendido = true
    }
}
let productos=[]

do{
    let id = productos.length + 1
    let categoria = prompt("Ingrese la categoria de su producto")
    let nombre = prompt("Nombre del producto")
    let descripcion = prompt("Descripcion del producto")
    let precio = prompt("Precio del producto")
    let producto = new Producto(id, categoria,nombre,descripcion,precio)
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
        ' categoria: ' + productos[i].categoria + 
        ' nombre: ' + productos[i].nombre + 
        ' descripcion: ' + productos[i].descripcion +
        ' precio: ' + productos[i].precio +
         '<br>';
    }
    return(lista)
}
function imprimirResultado(x) {
    var objetivo = document.getElementById('total');
    objetivo.innerHTML = x;      
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

imprimirResultado(mostrarProductos(productosFiltrados))