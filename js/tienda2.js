

document.addEventListener('DOMContentLoaded', () => {
    const btnEsculturas = document.querySelector("#btnEsculturas");
    const btnPinturas = document.querySelector("#btnPinturas");
    const btnFotos = document.querySelector("#btnFotos");
    
    
    const productos = [
    {
        id: 1,
        categoria: "Esculturas",
        nombre: 'Escultura',
        descripcion: "Una escultura",
        precio: 1,
        imagen: 'escultura.jpg'
    },
    {
        id: 1,
        categoria: "Esculturas",
        nombre: 'Escultura',
        descripcion: "Una escultura",
        precio: 1,
        imagen: 'escultura.jpg'
    },

    {
        id: 1,
        categoria: "Pinturas",
        nombre: 'Pintura',
        descripcion: "Una pintura",
        precio: 1,
        imagen: 'pintura.jpg'
    },
    {
        id: 1,
        categoria: "Fotos",
        nombre: 'Foto',
        descripcion: "Una foto",
        precio: 1,
        imagen: 'foto.jpg'
    },
    ];
    
   
    
    let productosFiltrados = productos
    
    btnEsculturas.addEventListener("click", () => {
        filtrar("Esculturas")
    });
    btnPinturas.addEventListener("click", () => {
        filtrar("Pinturas")
    });
    btnFotos.addEventListener("click", () => {
        filtrar("Fotos")
    });
            

let carrito = [];
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;


    function renderizarProductos() {
        productosFiltrados.forEach((info) => {
            const divProductos = document.createElement('div');
            divProductos.classList.add('card', 'col-12', 'col-sm-6', 'col-md-3');
            const divProductosCardBody = document.createElement('div');
            divProductosCardBody.classList.add('card-body');
            const divProductosTitle = document.createElement('h5');
            divProductosTitle.classList.add('card-title');
            divProductosTitle.textContent = info.nombre;
            const divProductosImagen = document.createElement('img');
            divProductosImagen.classList.add('img-fluid');
            divProductosImagen.setAttribute('src', info.imagen);
            const divProductosDescripcion = document.createElement('p');
            divProductosDescripcion.classList.add('card-text');
            divProductosDescripcion.textContent = `${info.descripcion}`;
            const divProductosPrecio = document.createElement('p');
            divProductosPrecio.classList.add('card-text');
            divProductosPrecio.textContent = `$ ${info.precio}`;
            const divProductosBoton = document.createElement('button');
            divProductosBoton.classList.add('btn');
            divProductosBoton.textContent = 'Agregar al carrito';
            divProductosBoton.setAttribute('marcador', info.id);
            divProductosBoton.addEventListener('click', agregarAlCarrito);
            
            divProductosCardBody.appendChild(divProductosImagen);
            divProductosCardBody.appendChild(divProductosTitle);
            divProductosCardBody.appendChild(divProductosDescripcion);
            divProductosCardBody.appendChild(divProductosPrecio);
            divProductosCardBody.appendChild(divProductosBoton);
            divProductos.appendChild(divProductosCardBody);
            DOMitems.appendChild(divProductos);
        });
    }

    function agregarAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    function actualizarCarrito() {
        DOMcarrito.textContent = '';
        const carritoSinDuplicados = [...new Set(carrito)];
        carritoSinDuplicados.forEach((item) => {
            const miItem = productos.filter((itemProductos) => {
                return itemProductos.id === parseInt(item);
            });
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            const divProductos = document.createElement('li');
            divProductos.classList.add('list-group-item', 'text-right', 'mx-2');
            divProductos.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - $ ${miItem[0].precio}`;
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            divProductos.appendChild(miBoton);
            DOMcarrito.appendChild(divProductos);
        });
        DOMtotal.textContent = calcularTotal();
    }

    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        actualizarCarrito();
        guardarCarritoEnLocalStorage();

    }
    function calcularTotal() {
        return carrito.reduce((total, item) => {
            const miItem = productos.filter((itemProductos) => {
                return itemProductos.id === parseInt(item);
            });
            return total + miItem[0].precio;
        }, 0).toFixed(0);
    }

    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito();
        localStorage.clear();
    }

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    cargarCarritoDeLocalStorage();
    // renderizarProductos();
    actualizarCarrito();
    function filtrar(x){
        productosFiltrados = productos.filter(a => a.categoria === x);
        renderizarProductos()
        }
  
});
 