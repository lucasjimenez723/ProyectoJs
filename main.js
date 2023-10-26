

/*
const estudiantes = [
    { nombre: "Lucas", notas: [6, 9, 8] },
    { nombre: "Ale", notas: [10, 10, 10] },
    { nombre: "Mati", notas: [6, 6, 7] },
];

function calcularPromedio(estudiantes) {
    let sumaTotal = 0;
    let totalNotas = 0;

    for (let i = 0; i < estudiantes.length; i++) {
    const notasEstudiante = estudiantes[i].notas;

    let sumaEstudiante = 0;
    for (let j = 0; j < notasEstudiante.length; j++) {
        sumaEstudiante += notasEstudiante[j];
    }

    const promedioEstudiante = sumaEstudiante / notasEstudiante.length;
    sumaTotal += promedioEstudiante;
    totalNotas += 1;
    }
    const promedioTotal = sumaTotal / totalNotas;
    return promedioTotal;
    }
const promedioNotas = calcularPromedio(estudiantes);
console.log(`El promedio de notas de todos los estudiantes es: ${promedioNotas}`);
*/


/*
const lucas ={
    nombre:"Lucas",
    apellido:"Jimenez",
    edad:"18",
    pasatiempos:["Gimnasio", "Escucharmusica", "Jugar"],
    redessociales:{
        gmail:"lucasjimenez553@gmail.com"
        movil:"3888344514"
        instagram:"lucasjimenez.12"
    },
    saludar:function(){
        console.log("Hola")
    }
}
console.log(lucas.pasatiempos);
*/
/*
class Usuarios{
    constructor(nombre, email, contraseña) {
        this.nombre = nombre;
        this.email = email;
        this.constraseña = constraseña;
    }
    comprobarUsuario(email, constraseña) {
        if (email === this.email && constraseña === this.password) {
        return this.nombre;
    } else {
        return false;
    }
    }
}

let usuario1 = new User("Lucas", "Lucas@gmail.com", 2023);
let usuario2 = new User("Mario", "Mario@gmail.com", 2019);
let usuario3 = new User("Lauty", "Lauty@gmail.com", 2018);

let respuesta;

do {
    let email = prompt("Ingrese su email:");
    let constraseña = prompt("Ingrese su contraseña:");
    respuesta = user.comprobarUsuario(email, parseInt(constraseña));
    if (respuesta) alert("Bienvenido, " + respuesta + "!");
    else alert("Intentelo nuevamente.");
} while (!respuesta);
*/

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};