//Page "cart"//

//Déclaration des variables//

const arrayPrice = [];
let products = [];
let contact = {};
//Déclaration de la Classe//
class ContactData {
    constructor(name, surname, address, city, email) {
        this.firstName = name;
        this.lastName = surname;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

//Création de la trame HTML du panier//

function createCart(itemFurniture, cartContent) {
    let plugCart = document.getElementById("plugCart");
    plugCart.classList.add("my-3");

    let divCart = document.createElement('div');
    plugCart.appendChild(divCart);
    divCart.classList.add("d-flex", "flex-row", "justify-content-between", "my-2", "px-1", "bold");

    let nameFurniture = document.createElement('p');
    divCart.appendChild(nameFurniture);
    nameFurniture.textContent = itemFurniture.name;

    let varnishFurniture = document.createElement('p');
    divCart.appendChild(varnishFurniture);
    varnishFurniture.textContent = cartContent[i].selectedVarnish;

    let priceFurniture = document.createElement('p');
    divCart.appendChild(priceFurniture);
    priceFurniture.textContent = itemFurniture.price/100 + "€";
    priceFurniture.classList.add("price");
}

//Tableau de prix//

function addItemPrice(itemFurniture) {
    let itemPrice = itemFurniture.price;
    arrayPrice.push(itemPrice);
}

//Ajout des Ids des articles//

function addIdProducts(cartContent) {
    products.push(cartContent[i].idFurniture);
}

//Prix total//

function totalPriceOrder(arrayPrice) {
    let totalPrice = document.getElementById('totalPrice');
    let total = 0;
    for (i = 0; i < arrayPrice.length; i++) {
        total = total + arrayPrice[i];
        totalPrice.textContent = "Prix total : " + total/100 + "€";
        totalPrice.classList.add("font-weight-bold", "total-price");
        localStorage.setItem("totalOrder", JSON.stringify(total));
    }
}

//Création du panier//

async function getCart() {
    try {
        let response = await fetch("http://localhost:3000/api/furniture");
        if (response.ok) {
            let furnitures = await response.json();

            let cartContent = JSON.parse(localStorage.getItem("cartContent")) || {};

            for (i = 0; i < cartContent.length; i++) {
                let itemFurniture = furnitures.find(furnitures => furnitures['_id'] == cartContent[i].idFurniture);
                console.log(itemFurniture);
                createCart(itemFurniture, cartContent);
                addItemPrice(itemFurniture);
                addIdProducts(cartContent);
            }
            totalPriceOrder(arrayPrice);
        } else {
            console.error('retour du serveur : ' , response.status);
        }
    } catch(e) {
        console.log(e);
    }
}

//Suppression des articles//

function deleteCart() {
    let divbtnClear = document.getElementById('button-clear-cart');
    let btnClearCart = document.createElement("button");

    divbtnClear.appendChild(btnClearCart);
    btnClearCart.classList.add("btn", "btn-confirm" , "block-right");
    btnClearCart.textContent = "Vider le panier";

    btnClearCart.addEventListener('click', function() {
        localStorage.removeItem('cartContent');
        localStorage.removeItem('totalOrder');
        let mainCart = document.getElementById('plugCart');
        while (mainCart.firstChild) {
            mainCart.removeChild(mainCart.firstChild);
            let totalPrice = document.getElementById('totalPrice');
            totalPrice.textContent = "Prix total : 0 €";
        }
    })
}


//Récupération de l'Id de Commande //

function getOrderConfirmationId(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}

//Récupération des données du Formulaire//

function getForm() {
    let firstname = document.getElementById('firstName').value;
    let lastname = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;

    contact = new ContactData(firstname, lastname, address, city, email);
}

//Requete POST pour envoyer l'objet Contact et le tableau des produits //

async function postForm(dataToSend) {
    try {
        let response = await fetch("http://localhost:3000/api/furniture/order", {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: dataToSend,
        });
        if (response.ok) {
            let responseId = await response.json();
            getOrderConfirmationId(responseId);
            window.location.href = "confirmation.html";
        } else {
            console.error('retour du serveur : ' , response.status);
        }
    } catch(e) {
        console.log(e);
    }
}

//Validation de la commande et envoie de la commande//

function confirmationOrder() {
    getForm();
    dataToSend = JSON.stringify({ contact, products});
    console.log(dataToSend);
    postForm(dataToSend);
}

//Validation des données du formulaire//

function validateForm() {
    let btnValidation = document.getElementById('btn-validation');
    btnValidation.addEventListener('click', function() {
        let firstname = document.getElementById('firstName').value;
        let lastname = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
        if (firstname, lastname, address, city, email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            confirmationOrder();
            return true;
        } else {
            alert("Saisissez tous les champs et entrez un email valide");
            return false;
        }
    })
}

//Appel des fonctions//

getCart();
deleteCart();
validateForm();