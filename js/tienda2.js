document.addEventListener('DOMContentLoaded', () => {
    
    // PRODUCTOS 
    const productos = [
        {
            id: 1,
            categoria: "Esculturas",
            nombre: 'Escultura',
            descripcion: "Una escultura",
            precio: 1,
            imagen: '../img/parquesNacionales/celtas.jpg'
        },
        {
            id: 2,
            categoria: "Esculturas",
            nombre: 'Escultura',
            descripcion: "Una escultura",
            precio: 1,
            imagen: '../img/parquesNacionales/celtas.jpg'
        },

        {
            id: 3,
            categoria: "Pinturas",
            nombre: 'Pintura',
            descripcion: "Una pintura",
            precio: 1,
            imagen: '../img/parquesNacionales/islandia.jpg'
        },
        {
            id: 4,
            categoria: "Fotos",
            nombre: 'Foto',
            descripcion: "Una foto",
            precio: 1,
            imagen: '../img/parquesNacionales/las_rocas_azules_del_recuerdo.jpg'
        },
    ];

    // VARIABLES 
    const btnVaciar = document.querySelector('#btnVaciar');
    const btnComprar = document.querySelector('#btnComprar');
    const btnTodos = document.querySelector("#btnTodos");    
    const btnEsculturas = document.querySelector("#btnEsculturas");
    const btnPinturas = document.querySelector("#btnPinturas");
    const btnFotos = document.querySelector("#btnFotos");
    let carrito = [];
    const crearItems = document.querySelector('#crearItems');
    const divCarrito = document.querySelector('#carrito');
    const total = document.querySelector('#total');
    const miLocalStorage = window.localStorage;

    // EVENTOS BOTONES 
    // btnTodos.addEventListener("click", () => {
    //     cargarProductos("Todos")
    // });
    btnEsculturas.addEventListener("click", () => {
        cargarProductos("Esculturas")
    });
    btnPinturas.addEventListener("click", () => {
        cargarProductos("Pinturas")
    });
    btnFotos.addEventListener("click", () => {
        cargarProductos("Fotos")
    });
    btnComprar.addEventListener("click", () => {
        Swal.fire({
            title: "Finalizar compra",
            text: "Comprueba que tus productos son correctos",
            showCancelButton: true,
            confirmButtonText: "Comprar",
            cancelButtonText: "Cancelar",
        });
    });
    btnVaciar.addEventListener("click", () => {
        Swal.fire({
            title: "Vaciar el carrito",
            text: "¿Estás seguro que quieres vaciar el carrito?",
            showCancelButton: true,
            confirmButtonText: "Vaciar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed){
                vaciarCarrito();
            }
        })
    });

    // CREAR MAIN DONDE CARGAR PRODUCTOS 
    const crearMain = document.createElement('main');
    crearMain.setAttribute("id", "items")
    crearMain.classList.add("items", "col-12", "row");
    crearItems.appendChild(crearMain);

    // FUNCIONES 
    function cargarProductos(filtro) {
        var borrar = document.getElementById("items");
        padre = borrar.parentNode;
        padre.removeChild(borrar);
        const crearMain = document.createElement('main');
        crearMain.setAttribute("id", "items")
        crearMain.classList.add("items", "col-12", "row");
        crearItems.appendChild(crearMain);

        switch (filtro) {
            case "Esculturas":
                var productosFiltrados = productos.filter(a => a.categoria === filtro);
                break;
            case "Pinturas":
                var productosFiltrados = productos.filter(a => a.categoria === filtro);
                break;
            case "Fotos":
                var productosFiltrados = productos.filter(a => a.categoria === filtro);
                break;
            case "Todos":
                    var productosFiltrados = productos;
                    break;
            default:
                var productosFiltrados = productos
                break;
        }

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

            
            divProductosCardBody.appendChild(divProductosTitle);
            divProductosCardBody.appendChild(divProductosImagen);
            divProductosCardBody.appendChild(divProductosDescripcion);
            divProductosCardBody.appendChild(divProductosPrecio);
            divProductosCardBody.appendChild(divProductosBoton);
            divProductos.appendChild(divProductosCardBody);
            crearMain.appendChild(divProductos);

        });
    }

    function agregarAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
    }

    function actualizarCarrito() {
        divCarrito.textContent = '';
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
            divCarrito.appendChild(divProductos);
        });
        total.textContent = calcularTotal();
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

    function guardarCarritoEnLocalStorage() {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage() {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    function vaciarCarrito() {
        carrito = [];
        actualizarCarrito();
        localStorage.clear();
    }

    // INICIALIZAR FUNCIONES 
    cargarCarritoDeLocalStorage();
    cargarProductos("todos");
    actualizarCarrito();
});
