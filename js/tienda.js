// let pass = 123;
// let password;
// do{
//     password = parseInt(prompt("Ingrese el password. (no digas nada pero es 123)"))
// }while(password !== pass)


function crearCompra(cantidad, cuotas){
    let acantidad = parseInt(cantidad)
    let acuotas = parseInt(cuotas);
    let acumulado = 5000 * acantidad;
let interes = 0

switch (acuotas) {
    case acuotas<=3:
        interes = acumulado/acuotas
        break;
    case cuotas<=6:
        interes = acumulado * 1.10/acuotas
        break;
    case cuotas<=6:
        interes = acumulado * 1.15/acuotas
        break;
    default:
        interes = acumulado * 1.25/acuotas
        break;}

    return ("LLevas gastados "+ acumulado +" vas a pagar "+acuotas+" cuotas de " +interes)
}
function crearHTML(mensaje) {
    let html;
     html = `
    <p class="col-2 mx-0">${mensaje}</p>
    
  `;
    
    contenedor.innerHTML = html;
}

btnComprar.addEventListener("click", () => {
    let cantidad = document.querySelector("#cantidad"),
    cuotas = document.querySelector("#cuotas");

    cantidad = localStorage.setItem("cantidad", cantidad.value);
    cuotas = localStorage.setItem("cuotas", cuotas.value);

    let mensaje = crearCompra(localStorage.getItem("cantidad"), localStorage.getItem("cuotas"));
    crearHTML(mensaje)
});




