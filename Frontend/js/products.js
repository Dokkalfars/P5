//Page "product"//

//Création d'une classe pour structurer le tableau "product"//

class MyProduct {
    constructor(idFurniture, selectedVarnish) {
        this.idFurniture = idFurniture;
        this.selectedVarnish = selectedVarnish;
    }
}

//Récupération de l'Id dans l'URL//

function getIdUrlandBlock(furnitures) {
    let urlSearch = new URLSearchParams(window.location.search);
    console.log(urlSearch);
    let idFurniture = urlSearch.get('id');
    console.log(idFurniture);
    getFurnitureItem(furnitures, idFurniture);
}

//Récupération de l'article avec l'Id//

function getFurnitureItem(furnitures, idFurniture) {
    let selectedFurniture = furnitures.find(furnitures => furnitures['_id'] == idFurniture);
    console.log(selectedFurniture);
    createBlockFurniture(selectedFurniture, idFurniture);
}

//création de la structure HTML//

function createBlockFurniture(selectedFurniture, idFurniture) {
    let divMainParent = document.createElement("div");
    const plugProduct = document.getElementById("plugProduct");
    plugProduct.appendChild(divMainParent);
    divMainParent.classList.add("row", "mx-auto", "my-3", "w-75");

    let divParent = document.createElement("div");
    divMainParent.appendChild(divParent);
    divParent.classList.add("card", "col", "m-auto", "p-5");

    let titleFurniture = document.createElement("h3");
    divParent.appendChild(titleFurniture);
    titleFurniture.classList.add("card-title", "title-product", "text-center");
    titleFurniture.textContent = selectedFurniture.name;

    let imgFurniture = document.createElement("img");
    divParent.appendChild(imgFurniture);
    imgFurniture.classList.add("card-image-top", "img-fluid");
    imgFurniture.src = selectedFurniture.imageUrl;

    let divBlockBody = document.createElement("div");
    divParent.appendChild(divBlockBody);
    divBlockBody.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");

    let descriptionFurniture = document.createElement("p");
    divBlockBody.appendChild(descriptionFurniture);
    descriptionFurniture.classList.add("description-product", "text-justify");
    descriptionFurniture.textContent = selectedFurniture.description;
  
    chooseVarnish(divBlockBody, selectedFurniture);

    let divLinkPrice = document.createElement("div");
    divBlockBody.appendChild(divLinkPrice);
    divLinkPrice.classList.add("d-flex", "flex-md-row", "flex-column", "justify-content-between", "align-items-center");

    let priceFurniture = document.createElement("p");
    divLinkPrice.appendChild(priceFurniture);
    priceFurniture.classList.add("price-product", "font-weight-bold");
    priceFurniture.textContent = selectedFurniture.price/100 + '€';

    let linkProduct = document.createElement("a");
    divLinkPrice.appendChild(linkProduct);
    linkProduct.href = "cart.html";

    let btnBuy = document.createElement("button");
    linkProduct.appendChild(btnBuy);
    btnBuy.classList.add("btn", "block-right");

    btnBuy.textContent = "Ajouter au panier";
    console.log(idFurniture);
    getVarnishFurniture(btnBuy, idFurniture);
}

//Ajout de la selection de Vernis//

function chooseVarnish(divBlockBody, selectedFurniture) {
    let sentenceChooseVarnish = document.createElement("p");
    divBlockBody.appendChild(sentenceChooseVarnish);
    sentenceChooseVarnish.classList.add("text-left", "my-3");
    sentenceChooseVarnish.textContent = "Choisir le vernis :";

    let choiceVarnish = document.createElement("select");
    divBlockBody.appendChild(choiceVarnish);
    choiceVarnish.classList.add("form-control", "mb-5");
    choiceVarnish.id = "list";

    idVarnish = selectedFurniture.varnish;
    for (let i = 0; i < idVarnish.length; i++) {
        let optionVarnish = document.createElement("option");
        choiceVarnish.appendChild(optionVarnish);
        optionVarnish.textContent = selectedFurniture.varnish[i];
    }
}

//Ajout dans le panier//

function getVarnishFurniture(btnBuy, idFurniture) {
    btnBuy.addEventListener('click', function() {
        let cartContent = JSON.parse(localStorage.getItem("cartContent"));
        let selectedVarnish = document.getElementById('list').value;

        if (cartContent === null) {
            cartContent = [];
        }
        let product = new MyProduct(idFurniture, selectedVarnish);
        cartContent.push(product);
        localStorage.setItem("cartContent", JSON.stringify(cartContent));
    })
}

//Appel de l'API//

async function getFurnitures() {
    try {
        let response = await fetch("http://localhost:3000/api/furniture");
        if (response.ok) {
            let furnitures = await response.json();
            console.log(furnitures);
            getIdUrlandBlock(furnitures);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch(e) {
        console.log(e);
    }
}

//Appel de la fonction//

getFurnitures()