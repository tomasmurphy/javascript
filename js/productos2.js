const form = document.querySelector("form");

const
    inputCategoria = document.querySelector("#categoria"),
    inputNombre = document.querySelector("#nombre"),
    inputDescripcion = document.querySelector("#descripcion"),
    inputPrecio = document.querySelector("#precio"),
    inputImg = document.querySelector("#img"),
    btnGuardar = document.querySelector("#btnGuardar"),
    contenedor = document.querySelector("#contenedor");

const productos = [];

class Producto {
    constructor(id, categoria, nombre, descripcion, precio, img) {
        this.id = id;
        this.categoria = categoria;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.img = img;
    }
}
function crearProducto(id, categoria, nombre, descripcion, precio, img) {
    id = productos.length + 1
    categoria = inputCategoria.value;
    nombre = inputNombre.value;
    descripcion = inputDescripcion.value;
    precio = inputPrecio.value;
    img = inputImg.value;
    return new Producto(id, categoria, nombre, descripcion, precio, img);
}
function guardarProducto(producto) {
    productos.push(producto);
    localStorage.setItem("productosJson", JSON.stringify(productos))
}

function crearHTML(x) {
    let html;
    for (const producto of x) { 
    html = `
    <img class="col-2 mx-0 img-fluid" src=${producto.img} />
    <p class="col-2 mx-0">${producto.nombre}</p>
    <p class="col-2 mx-0">
  ${producto.id}
</p>  
  <p class="col-2 mx-0">
      ${producto.categoria}
    </p>  
  <p class="col-2 mx-0">
      ${producto.descripcion}
    </p>
    <p class="col-2 mx-0">$${producto.precio}</p>
  `}
    contenedor.innerHTML += html;
};


btnGuardar.addEventListener("click", () => {
    const product = crearProducto(categoria, nombre, descripcion, precio, img);
    guardarProducto(product);
    location.reload();
});

let productosJson = localStorage.getItem("productosJson");
productosJson = JSON.parse(productosJson)
crearHTML(productosJson);