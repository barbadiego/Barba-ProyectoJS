// ARRAY DE PRODUCTOS
const ProductoMain = [
    { id: 1, nombre: "Agnes", precio: 1600, stock: 20, imagen: "./images/producto1.jpg"},
    { id: 2, nombre: "Emma", precio: 1900, stock: 10, imagen: "./images/producto2.jpg"},
    { id: 3, nombre: "Agnes Aqcua", precio: 1600, stock: 0, imagen: "./images/producto3.jpg"},
    { id: 4, nombre: "Magnolia", precio: 1500, stock: 2, imagen: "./images/producto4.jpg"},
]

// ********************************************
// **************** FUNCIONES *****************
// ********************************************


// Función de creación de cards.-
// ********************************************
generadorDeCards(ProductoMain);

function generadorDeCards(productosMain){
    let cardsAcumuladas = ``;
    productosMain.forEach((elementoDelArray) => {
        cardsAcumuladas += `<div class="card-body">
            <img class="card-img-top" src="${elementoDelArray.imagen}" alt="Card image cap">
            <h5 class="card-title">${elementoDelArray.nombre}</h5>
            <p class="card-text">Precio: $${elementoDelArray.precio}.</p>
        </div>`
    });
    mostrarCardsEnElHTML(cardsAcumuladas)
}


// Función para mostrar las cards generadas con function generadorDeCards() en web.-
// ********************************************
function mostrarCardsEnElHTML(cards){
    document.getElementById("listaDeProductosMain").innerHTML = cards;
}


// Busca y filtra productos en web index.html.-
// ********************************************
function buscarProducto(){
    const productoBuscado = document.getElementById("buscar").value.toLowerCase().trim();
    
    const productoFiltrado = ProductoMain.filter((producto) => {
        return producto.nombre.toLowerCase().match(productoBuscado);
    })
    
    generadorDeCards(productoFiltrado)
}


// Al escribir producto en input de busqueda y presionar enter modifica el main con el producto buscado.-
// ********************************************
const inputIngresado = document.getElementById("buscar");
inputIngresado.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("boton-buscar").click();
    }
});