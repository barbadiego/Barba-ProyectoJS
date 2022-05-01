
// LOCAL STORAGE DE CARRITO
let carrito = [];
if(localStorage.getItem('carrito') != null){
    const storageDeCarrito = JSON.parse(localStorage.getItem('carrito'));
    carrito = storageDeCarrito; 
}
document.getElementById("sumarAlCarrito").innerHTML = carrito.length;

// LOCALSTORAGE DE MONTO TOTAL DE COMPRA
let precioTotal = 0;
if(localStorage.getItem('precioTotal') != 0){
    const totalDelCarrito = JSON.parse(localStorage.getItem('precioTotal'));
    precioTotal = totalDelCarrito; 
}
document.getElementById("sumaTotal").innerHTML = precioTotal;


// ARRAY DE PRODUCTOS
const Productos = [
    { id: 1, nombre: "Agnes", precio: 1600, stock: 20, imagen: "../images/producto1.jpg"},
    { id: 2, nombre: "Emma", precio: 1900, stock: 0, imagen: "../images/producto2.jpg"},
    { id: 3, nombre: "Agnes Aqcua", precio: 1600, stock: 3, imagen: "../images/producto3.jpg"},
    { id: 4, nombre: "Magnolia", precio: 1100, stock: 12, imagen: "../images/producto4.jpg"},
    { id: 5, nombre: "Leia", precio: 900, stock: 0, imagen: "../images/producto5.jpg"},
    { id: 6, nombre: "Amelia", precio: 1200, stock: 5, imagen: "../images/producto6.jpg"},
    { id: 7, nombre: "Leia", precio: 900, stock: 1, imagen: "../images/producto7.jpg"},
    { id: 8, nombre: "Agnes", precio: 1600, stock: 14, imagen: "../images/producto8.jpg"},
]



// GENERADOR DE CARDS CON INFO DE PRODUCTOS
generadorDeCards(Productos);


// ********************************************
// **************** FUNCIONES *****************
// ********************************************


function generadorDeCards(productosSec){
    let cardsAcumuladas = ``;
    productosSec.forEach((elementoDelArray) => {
        cardsAcumuladas += `<div class="card-body">
            <img class="card-img-top" src="${elementoDelArray.imagen}" alt="Card image cap">
            <h5 class="card-title">${elementoDelArray.nombre}</h5>
            <p class="card-text">Precio: $${elementoDelArray.precio}.</p>
            <p class="card-text">Stock: <span id="pruebaStock">${elementoDelArray.stock > 0 ? elementoDelArray.stock : "Sin stock" }</span>.</p>
            <button class="btn btn-primary" ${elementoDelArray.stock < 1 ? 'disabled' : ''} onclick="agregarAlCarrito (${elementoDelArray.id})">${elementoDelArray.stock > 0 ? "Añadir al carrito" : 'No hay stock'}</button>
            </div>`
    });
    // MUESTRA CARDS EN HTML
    mostrarCardsEnElHTML(cardsAcumuladas)
}


// Función para mostrar cards en web
function mostrarCardsEnElHTML(cards){
    document.getElementById("listaDeProductosSecundaria").innerHTML = cards;
}


// Agrega al carrito el producto seleccionado, mostrandose la cantidad de productos y monto total del mismo.
function agregarAlCarrito(idDelProducto){
    const productoEnCarrito = Productos.find(Productos => Productos.id === idDelProducto)
    const indexProducto = carrito.findIndex((producto) => producto.id === idDelProducto)

    
    if (indexProducto === -1){
        productoEnCarrito.cantidad = 1;
        carrito.push(productoEnCarrito)
        avisoPopUp("Se agregó el producto al carrito.")
    } else {
        if (carrito[indexProducto].cantidad < carrito[indexProducto].stock){
            carrito[indexProducto].cantidad++;
            avisoPopUp("Se agregó el producto al carrito.")
        } else {
            avisoPopUp("No hay stock de este producto.", "linear-gradient(to right, #000000, #f8edeb)")
        }
    }

    
    productosEnModal(carrito);
    // modificarStock(carrito);

    document.getElementById("sumarAlCarrito").innerHTML = cantidadProductosCart();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    
    
    precioTotal = calcularPrecio();
    document.getElementById("sumaTotal").innerHTML = precioTotal;
    document.getElementById("sumaCartTotal").innerHTML = precioTotal;
    
    localStorage.setItem("precioTotal", JSON.stringify(precioTotal));
}

function calcularPrecio(){
    let precio = 0;
    carrito.forEach((producto) => {
        precio += producto.precio * producto.cantidad;
    })
    return precio;
}

function cantidadProductosCart(){
    let cantidad = 0;
    carrito.forEach((producto) => {
        cantidad += producto.cantidad;
    })
    return cantidad;
}

function avisoPopUp(texto, color = "linear-gradient(to right, #fec5bb, #f8edeb, #fec5bb)"){
    Toastify({
        text: texto,
        duration: 2000,
        gravity: "bottom",
        position: "right",
        style: {
            background: color,
            color: "black",
            border: "solid 1px black",
        },
    }).showToast();
}



// function sumarCantidad(idDelProducto){
//     const productoEnCarrito = carrito.findIndex((elemento) => {
//         return elemento.id === idDelProducto;
//     })
//     carrito[productoEnCarrito].cantidad += 1;
// }


function productosEnModal(datos){
    let infoMostrar = ``;
    for ( let i = 0; i < datos.length; i++ ){
    infoMostrar += `
    <div class="container-fluid">
        <div class="container">
            <div class="productoCarrito">
                <div class="row columnaCarrito">
                    <div class="col columna1">
                        <img src="../images/producto${datos[i].id}.jpg">
                    </div>
                    <div class="col columna2">
                        <p><b>Producto:</b></p>
                        <p>${datos[i].nombre}</p>
                    </div>
                    <div class="col columna3">
                        <p><b>Cantidad:</b></p>
                        <p>${datos[i].cantidad}</p>
                        <label>Stock: ${datos[i].stock}</label>
                        <button id="quitarProducto" onclick="removerProducto(${datos[i].id})">X</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    }
    
    document.getElementById("mostrarModal").innerHTML = infoMostrar;
}



function removerProducto(id){
    const indiceProd = carrito.findIndex((elemento) => {
        return elemento.id === id;
    });
    avisoPopUp(`Se eliminó ${carrito[indiceProd].nombre} del carrito`)

    carrito.splice(indiceProd, 1)

    productosEnModal(carrito);
    
    document.getElementById("sumarAlCarrito").innerHTML = cantidadProductosCart();
    
    precioTotal = calcularPrecio();
    document.getElementById("sumaTotal").innerHTML = precioTotal;
    document.getElementById("sumaCartTotal").innerHTML = precioTotal;
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("precioTotal", JSON.stringify(precioTotal));
}



// Busca y filtra productos en tiempo real en web productos.html
const productoBuscado = document.getElementById("buscar")
productoBuscado.addEventListener('input', (evt) => {buscarProducto(evt.target.value);})

function buscarProducto(val){ 
    let busqueda = val;
    resultadosDeBusqueda = [];
    for (let i = 0; i < Productos.length; i++){
        if (Productos[i].nombre.toLowerCase().match(busqueda.trim().toLowerCase())){
            resultadosDeBusqueda.push(Productos[i])
        }
    }
    
    generadorDeCards(resultadosDeBusqueda)
}

const elementosFiltrados = document.getElementsByClassName("btnFiltro")
for ( let i = 0; i < elementosFiltrados.length; i++){
    elementosFiltrados[i].addEventListener('click', () => {buscarProducto(elementosFiltrados[i].getAttribute("value"))})
}