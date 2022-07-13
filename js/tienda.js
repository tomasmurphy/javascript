document.addEventListener('DOMContentLoaded', () => {
    
    // PRODUCTOS IMPORTADOS DE JSON
    const productosJson = '../js/productos.json'
    const importarProductos = async () =>{
        const respuesta = await fetch(productosJson)
        const productos =  await respuesta.json()
    
    // VARIABLES 
    const btnVaciar = document.querySelector('#btnVaciar');
    const btnComprar = document.querySelector('#btnComprar');   
    const btnEsculturas = document.querySelector("#btnEsculturas");
    const btnPinturas = document.querySelector("#btnPinturas");
    const btnFotos = document.querySelector("#btnFotos");
    let carrito = [];
    const crearItems = document.querySelector('#crearItems');
    const divCarrito = document.querySelector('#carrito');
    const total = document.querySelector('#total');
    const miLocalStorage = window.localStorage;
    const abrirCarrito = document.querySelector("#abrirCarrito");
    const btnCarrito = document.querySelector("#btnCarrito");
    const btnBurger = document.querySelector("#navbarNavAltMarkup");
    const btnInfo = document.querySelector("#btnInfo");

    // EVENTOS BOTONES 
    abrirCarrito.addEventListener("click", () => {
        abrirCarrito.classList.remove("show");
    });
    btnCarrito.addEventListener("click", () => {
        const prueba = abrirCarrito.classList.contains("show");
        if(prueba === true){
        abrirCarrito.classList.remove("show");}else{
        abrirCarrito.classList.add("show")
        }
    });    
    btnEsculturas.addEventListener("click", () => {
        cargarProductos("Esculturas");
        btnBurger.setAttribute("aria-expanded", "false");
        btnBurger.classList.remove("show");
    });
    btnPinturas.addEventListener("click", () => {
        cargarProductos("Pinturas");
        btnBurger.setAttribute("aria-expanded", "false");
        btnBurger.classList.remove("show");
    });
    btnFotos.addEventListener("click", () => {
        cargarProductos("Fotos");
        btnBurger.setAttribute("aria-expanded", "false");
        btnBurger.classList.remove("show");
    });
    btnComprar.addEventListener("click", () => {
        Swal.fire({
            title: "Finalizar compra",
            text: "",
            showCancelButton: true,
            confirmButtonText: "Comprar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if(result.isConfirmed){
                Swal.fire({
                    title: "Tu compra fue realizada con éxito.",
                    text: "Mentira, es un simulacro",
                });
                vaciarCarrito();
            }
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
    function traerId(evento){
        const id = evento.target.dataset.id;
        cargarProductos(id);
    };

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
                btnEsculturas.classList.remove("activo");
                btnPinturas.classList.add("activo");
                btnFotos.classList.add("activo");
                break;
            case "Pinturas":
                var productosFiltrados = productos.filter(a => a.categoria === filtro);
                btnPinturas.classList.remove("activo");
                btnEsculturas.classList.add("activo");
                btnFotos.classList.add("activo");
                break;
            case "Fotos":
                var productosFiltrados = productos.filter(a => a.categoria === filtro);
                btnFotos.classList.remove("activo");
                btnPinturas.classList.add("activo");
                btnEsculturas.classList.add("activo");
                break;
            default:
            var productosFiltrados = productos.filter(a => a.id == filtro);
                btnFotos.classList.add("activo");
                btnEsculturas.classList.add("activo");
                btnPinturas.classList.add("activo");
            
              break;
        }
        console.log(productosFiltrados)

        if(productosFiltrados.length > 1){
        // POR CATEGORIA 
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
            const divProductosDescripcion = document.createElement('button');
            divProductosDescripcion.classList.add('btnInfo');
            divProductosDescripcion.setAttribute("id",'btnInfo');
            divProductosDescripcion.textContent = `+`;
            divProductosDescripcion.dataset.id = info.id;
            divProductosDescripcion.addEventListener('click', traerId);
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
    }else{
                // POR ID 
                productosFiltrados.forEach((info) => {
                    const divProductos = document.createElement('div');
                    divProductos.classList.add('card', 'col-12');
                    const divProductosCardBody = document.createElement('div');
                    divProductosCardBody.classList.add('card-body', "row");
                    const divProductosTitle = document.createElement('h5');
                    divProductosTitle.classList.add('card-title');
                    divProductosTitle.textContent = info.nombre;
                    const divProductosImagen = document.createElement('img');
                    divProductosImagen.classList.add('img-fluid', "col-12", "col-md-4");
                    divProductosImagen.setAttribute('src', info.imagen);
                    const divProductosDescripcion = document.createElement('p');
                    divProductosDescripcion.classList.add('card-text', "col-12", "col-md-5");
                    divProductosDescripcion.textContent = info.descripcion;
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
    }

    function agregarAlCarrito(evento) {
        carrito.push(evento.target.getAttribute('marcador'))
        actualizarCarrito();
        guardarCarritoEnLocalStorage();
        abrirCarrito.classList.add("show");
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
            miBoton.classList.add('btn');
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
    cargarProductos("Esculturas");
    actualizarCarrito();
};
importarProductos()
});
