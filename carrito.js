import { DATOSPRODUCTOS } from "./datosProductos.js";

let carrito = []
let finCarrito = document.querySelector('#finCarrito');
let precioSubtotal  = document.querySelector('#subtotalcompra');
let precioEnvio = document.querySelector('#enviocompra');
let precioTotal = document.querySelector('#totalcompra');
let opcionEnvioDomicilio = document.querySelector('#enviodomicilio');
let opcionRetiroTienda = document.querySelector('#retirotienda');
let cantidadProductos = document.querySelector('#cantidadproductos');

function calcularTotal () {
    let sumaTotal = 0;
    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    console.log(carrito)
    carrito.forEach((item) => 
        sumaTotal += DATOSPRODUCTOS.find((itemDATOSPRODUCTOS) => itemDATOSPRODUCTOS.id === parseInt(item.itemId)).precio * item.cantidad)
    console.log(sumaTotal)
    precioSubtotal.textContent = sumaTotal
}

export function opcionEnvio () {
    let opcionEnvioElegido = document.querySelector('input[name="metododeenvio"]:checked').value;
    console.log(opcionEnvioElegido)
    if (opcionEnvioDomicilio.value == opcionEnvioElegido) {
        precioEnvio.textContent = 350;
        precioTotal.textContent = parseFloat(precioSubtotal.textContent) + parseFloat(precioEnvio.textContent);
    }
    else if (opcionRetiroTienda.value == opcionEnvioElegido) {
        precioEnvio.textContent = 0;
        precioTotal.textContent = parseFloat(precioSubtotal.textContent) + parseFloat(precioEnvio.textContent);
    }
}

document.querySelector("#enviodomicilio").addEventListener('click', opcionEnvio)
document.querySelector("#retirotienda").addEventListener('click', opcionEnvio)

function mostrarCarrito () {
    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    let miCarrito = carrito

    miCarrito.forEach((itemCantidad) => {
        let miItem = DATOSPRODUCTOS.find((itemDATOSPRODUCTOS) => itemDATOSPRODUCTOS.id === parseInt(itemCantidad.itemId))        
        const minodo = document.createElement('a');
        minodo.classList.add('list-group-item', 'list-group-item-action', 'd-flex', 'gap-3', 'py-3');
        
        const minodofoto = document.createElement('img');
        minodofoto.setAttribute ('src', miItem.foto);
        minodofoto.style.height = '55px';
        minodofoto.style.width = '37px';

        const minodoinfo = document.createElement('div');
        minodoinfo.classList.add('d-flex', 'gap-2', 'w-100', 'justify-content-between');

        const minododiv = document.createElement('div');
        minododiv.classList.add ('row');
        
        const minodotitulo = document.createElement('h6');
        minodotitulo.classList.add('mb-0', 'text-nowrap');
        minodotitulo.textContent = miItem.nombre;

        const minodocantidad = document.createElement('p');
        minodocantidad.textContent = itemCantidad.cantidad;
        
        const minodoprecio = document.createElement('p');
        minodoprecio.classList.add ('text-nowrap');
        minodoprecio.textContent = `$${miItem.precio}`;

        minodo.appendChild(minodofoto);
        minodo.appendChild(minodoinfo);
        minodoinfo.appendChild(minododiv);
        minododiv.appendChild(minodotitulo);
        minododiv.appendChild(minodocantidad);
        minodoinfo.appendChild(minodoprecio);

        console.log("LLEGO AL INAL")
        finCarrito.appendChild(minodo);
    })
    precioSubtotal.textContent = calcularTotal ();
    // cantidadProductos.textContent = agregarAlCarrito ();
} 

mostrarCarrito();
calcularTotal();