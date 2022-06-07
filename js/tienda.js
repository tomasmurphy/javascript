let pass = 123;
let password;
do{
    password = parseInt(prompt("Ingrese el password. (no digas nada pero es 123)"))
}while(password !== pass)

let esculturas = {Escultura1:10000,Escultura2:20000,Escultura3:30000};

let ingreso = "";
let acumulado= 0;

for (x in esculturas) {
    ingreso = parseInt(prompt("La "+x+" vale $"+esculturas[x]+" Cuantas queres?"));
    gasto = (esculturas[x]*ingreso);
    acumulado += gasto;
}
let cuotas = 0
do {
    cuotas = prompt("En cuantas cuotas queres pagar?");
    if(cuotas>12){
        alert("La maxima cantidad de cuotas es 12")
    }    
} while (cuotas>12)


let interes = 0
switch (cuotas) {
    case cuotas<=3:
        interes = acumulado/cuotas
        break;
    case cuotas<=6:
        interes = acumulado * 1.10/cuotas
        break;
    case cuotas<=6:
        interes = acumulado * 1.15/cuotas
        break;
    case cuotas<=9:
        interes = acumulado * 1.20/cuotas
        break;
    default:
        interes = acumulado * 1.25/cuotas
        break;
}

function imprimirResultado() {
    var objetivo = document.getElementById('total');
    objetivo.innerHTML = ("Llevas gastados $"+acumulado+"<br>"+ "Vas a pagar "+cuotas+" cuotas de $"+interes);      
} 
imprimirResultado()

