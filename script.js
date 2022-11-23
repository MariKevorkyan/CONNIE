
    import { DATOSPRODUCTOS } from "./datosProductos.js";

// Declaro variables
let carrito = [];
let carritoStorage = [];

let items = document.querySelector('#libros');
let productoscarrito = document.querySelector('#compras');

// Funcion para mostrar los productos en el index
export function renderizarProductos() {
    DATOSPRODUCTOS.forEach((info) => {
        const nodocard = document.createElement('div');
        nodocard.classList.add('card', 'mb-3');
        
        const nodorow = document.createElement('div');
        nodorow.classList.add('row', 'g-0');
        
        const nodocol4 = document.createElement('div');
        nodocol4.classList.add('col-md-4');
        
        const nodofoto = document.createElement('img');
        nodofoto.classList.add('img-fluid', 'rounded-start');
        nodofoto.setAttribute('src', info.foto);
        
        const nodocol8 = document.createElement('div');
        nodocol8.classList.add('col-md-8');
        
        const nodocardbody = document.createElement('div');
        nodocardbody.classList.add('card-body');
        
        const nodotitulo = document.createElement('h5');
        nodotitulo.classList.add('card-title');
        nodotitulo.textContent = info.nombre;
        
        const nododescripcion = document.createElement('p');
        nododescripcion.classList.add('card-text');
        nododescripcion.textContent = info.descripcion;
        
        const nodopaginas = document.createElement('p');
        nodopaginas.classList.add('card-text');
        nodopaginas.textContent = `${info.paginas}${' páginas'}`;
        
        const nodoprecio = document.createElement('p');
        nodoprecio.classList.add('card-text');
        nodoprecio.textContent = `${'Precio: $'}${info.precio}`;
        
        const nodoboton = document.createElement('button');
        nodoboton.classList.add('btn', 'btn-primary');
        nodoboton.textContent = 'Añadir al Carrito';
        nodoboton.addEventListener('click', agregarAlCarrito);
        nodoboton.setAttribute('marcador', info.id);


        nodocard.appendChild(nodorow);
        
        nodorow.appendChild(nodocol4);
        nodorow.appendChild(nodocol8);
        
        nodocol4.appendChild(nodofoto);
        
        nodocol8.appendChild(nodocardbody);
        
        nodocardbody.appendChild(nodotitulo);
        nodocardbody.appendChild(nododescripcion);
        nodocardbody.appendChild(nodopaginas);
        nodocardbody.appendChild(nodoprecio);
        nodocardbody.appendChild(nodoboton);
        
        items.appendChild(nodocard); 
    });
}

// Funcion para agregar productos al carrito
function agregarAlCarrito (evento) {
        carritoStorage = JSON.parse(sessionStorage.getItem("carrito"));
    
    if (carritoStorage != null) { //Chequeo si esta vacio
        carrito = carritoStorage //Si no esta vacio, lo guardo
    }

    let idItemNuevo = evento.target.getAttribute('marcador')
    if (carrito != null &&  carrito.find((item) => item.itemId === idItemNuevo)){
        let item = carrito.find((itemCantidad) => itemCantidad.itemId === idItemNuevo)
        item.cantidad += 1;
        console.log(carrito)
    } else{
        var itemCantidad = new Object();
        itemCantidad.itemId = idItemNuevo;
        itemCantidad.cantidad = 1;
        carrito.push(itemCantidad);  
        console.log(carrito)  
    }

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarritoItemNuevo();
}

function renderizarCarritoItemNuevo () {
    productoscarrito.textContent = '';
    carrito = JSON.parse(sessionStorage.getItem("carrito"));
    carrito.forEach((itemCantidad) => {      
        let miItem = DATOSPRODUCTOS.find((itemDATOSPRODUCTOS) => itemDATOSPRODUCTOS.id === parseInt(itemCantidad.itemId))
        console.log(miItem)
        
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
        
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn');
        miBoton.textContent = 'Borrar';
        miBoton.dataset.itemCantidad = JSON.stringify(itemCantidad);
        miBoton.addEventListener('click', borrarItemCarrito);
        
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
        
        minodoinfo.appendChild(miBoton);
        productoscarrito.appendChild(minodo);
   })
}

function borrarItemCarrito (evento) {
    let id = JSON.parse(evento.target.dataset.itemCantidad).itemId;
    let carritoG = JSON.parse(sessionStorage.getItem("carrito"));
    if(carritoG != null){
        carrito = carritoG
    }
    
    let itemABorrar = carrito.find((item) => item.itemId === id);
    if(itemABorrar.cantidad > 1){
        itemABorrar.cantidad = itemABorrar.cantidad -1
    }else{
        carrito = carrito.filter((item) => 
        item.itemId !== id
    )
    }
    
    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarritoItemNuevo ();
}

renderizarProductos();
renderizarCarritoItemNuevo();

//cantidadProductos.textContent = 1;
//opcionEnvio()