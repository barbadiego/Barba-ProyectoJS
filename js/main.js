// ARRAY DE CARRITO
const carrito = []

// ARRAY DE PRODUCTOS
const ProductoMain = [
    { id: 1, nombre: "Agnes", precio: 1600, stock: 20, imagen: "../images/producto1.jpg"},
    { id: 2, nombre: "Emma", precio: 1900, stock: 10, imagen: "../images/producto2.jpg"},
    { id: 3, nombre: "Agnes Aqcua", precio: 1600, stock: 0, imagen: "../images/producto3.jpg"},
    { id: 4, nombre: "Magnolia", precio: 1500, stock: 2, imagen: "../images/producto4.jpg"},
]


// *******************************************
// **************** FUNCIONES ****************
// *******************************************

// función para mostrar cards en web
generadorDeCards(ProductoMain);

function generadorDeCards(productosMain){
    let cardsAcumuladas = ``;
    productosMain.forEach((elementoDelArray) => {
        cardsAcumuladas += `<div class="card-body">
            <img class="card-img-top" src="${elementoDelArray.imagen}" alt="Card image cap">
            <h5 class="card-title">${elementoDelArray.nombre}</h5>
            <p class="card-text">Precio: $${elementoDelArray.precio}.</p>
            <p class="card-text">Stock: ${elementoDelArray.stock > 0 ? elementoDelArray.stock : 'No hay stock'}.</p>
            <a class="btn btn-primary disabled">Añadir al carrito</a>
        </div>`
    });
    mostrarCardsEnElHTML(cardsAcumuladas)
}

// ********************************************
// **************** FUNCIONES ****************
// *******************************************

// función para que, al escribir producto en input de busqueda, al presionar enter realice la misma
const inputIngresado = document.getElementById("buscar");
inputIngresado.addEventListener("keypress", function onEvent(event) {
    if (event.key === "Enter") {
        document.getElementById("boton-buscar").click();
    }
});


// agregar al carrito el producto seleccionado
function mostrarCardsEnElHTML(cards){
    document.getElementById("listaDeProductosMain").innerHTML = cards;
}

// busca y filtra productos en web index.html
function buscarProducto(){
    const productoBuscado = document.getElementById("buscar").value.toLowerCase().trim();

    const productoFiltrado = ProductoMain.filter((producto) => {
        return producto.nombre.toLowerCase().match(productoBuscado);
    })

    generadorDeCards(productoFiltrado)
}