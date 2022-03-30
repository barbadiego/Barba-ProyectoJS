
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
    { id: 8, nombre: "Leia", precio: 900, stock: 1, imagen: "../images/producto8.jpg"},
    { id: 10, nombre: "Agnes", precio: 1600, stock: 14, imagen: "../images/producto10.jpg"},
]

// GENERADOR DE CARDS CON INFO DE PRODUCTOS
generadorDeCards(Productos);

function generadorDeCards(productosSec){
    let cardsAcumuladas = ``;
    productosSec.forEach((elementoDelArray) => {
        cardsAcumuladas += `<div class="card-body">
            <img class="card-img-top" src="${elementoDelArray.imagen}" alt="Card image cap">
            <h5 class="card-title">${elementoDelArray.nombre}</h5>
            <p class="card-text">Precio: $${elementoDelArray.precio}.</p>
            <p class="card-text">Stock: ${elementoDelArray.stock > 0 ? elementoDelArray.stock : "Sin stock" }.</p>
            <button class="btn btn-primary" ${elementoDelArray.stock < 1 ? 'disabled' : ''} onclick="agregarAlCarrito (${elementoDelArray.id})">${elementoDelArray.stock > 0 ? "Añadir al carrito" : 'No hay stock'}</button>
            </div>`
    });
    // MUESTRA CARDS EN HTML
    mostrarCardsEnElHTML(cardsAcumuladas)
}

// ********************************************
// **************** FUNCIONES *****************
// ********************************************


// Función para mostrar cards en web
function mostrarCardsEnElHTML(cards){
    document.getElementById("listaDeProductosSecundaria").innerHTML = cards;
}

// Agrega al carrito el producto seleccionado, mostrandose la cantidad de productos y monto total del mismo.
function agregarAlCarrito(idDelProducto){
    const productoEnCarrito = Productos.find(Productos => Productos.id === idDelProducto)
    carrito.push(productoEnCarrito)
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    document.getElementById("sumarAlCarrito").innerHTML = carrito.length;
    
    precioTotal = productoEnCarrito.precio + precioTotal;
    localStorage.setItem("precioTotal", JSON.stringify(precioTotal));
    document.getElementById("sumaTotal").innerHTML = precioTotal;
    
    console.log(carrito)
}

// Busca y filtra productos en tiempo real en web productos.html
const productoBuscado = document.getElementById("buscar")
productoBuscado.addEventListener('input', buscarProducto)

function buscarProducto(){ 
    let busqueda = document.getElementById('buscar').value;
    resultadosDeBusqueda = [];
    for (let i = 0; i < Productos.length; i++){
        if (Productos[i].nombre.toLowerCase().match(busqueda.trim().toLowerCase())){
            resultadosDeBusqueda.push(Productos[i])
        }
    }
    
    generadorDeCards(resultadosDeBusqueda)
}


// Evento para que, al escribir producto en input de busqueda, al presionar enter realice la misma
// Se reemplazó con función que filtra productos en tiempo real. Al momento no se está utilizando este evento.
// const inputIngresado = document.getElementById("buscar");
// inputIngresado.addEventListener("keypress", function onEvent(event) {
//     if (event.key === "Enter") {
//         document.getElementById("boton-buscar").click();
//     }
// });