//Page "Index"//

//Creation des Produits//

function createBlockFurnitures(furnitures) {
    let divMainParent = document.createElement("div");
    const containerFurniture = document.getElementById("containerFurniture");
    containerFurniture.appendChild(divMainParent);
    divMainParent.classList.add("row-cols-1", "row-cols-md-4", "row-cols-lg-5", "d-flex", "flex-wrap", "justify-content-between", "align-items-between");

//Création d'un bloc par produit présent dans l'API//

    for (let i=0; i < furnitures.length; i++) {
        let divParent = document.createElement("div");
        divMainParent.appendChild(divParent);
        divParent.classList.add("card", "col", "m-3", "pt-3");

        let imgFurniture = document.createElement("img");
        divParent.appendChild(imgFurniture);
        imgFurniture.classList.add("card-image-top", "photo", "img-fluid");
        imgFurniture.src = furnitures[i].imageUrl;

        let divBlockBody = document.createElement("div");
        divParent.appendChild(divBlockBody);
        divBlockBody.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");

        let titleFurniture = document.createElement("h3");
        divBlockBody.appendChild(titleFurniture);
        titleFurniture.classList.add("card-title", "title");
        titleFurniture.textContent = furnitures[i].name;

        let descriptionFurniture = document.createElement("p");
        divBlockBody.appendChild(descriptionFurniture);
        descriptionFurniture.classList.add("description","text-justify");
        descriptionFurniture.textContent = furnitures[i].description;

        let divLinkPrice = document.createElement("div");
        divBlockBody.appendChild(divLinkPrice);
        divLinkPrice.classList.add("d-flex", "flex-row", "justify-content-between");

        let priceFurniture = document.createElement("p");
        divLinkPrice.appendChild(priceFurniture);
        priceFurniture.classList.add("price", "my-2", "font-weight-bold");
        priceFurniture.textContent = furnitures[i].price/100 + '€';

        let linkProduct = document.createElement("a");
        divLinkPrice.appendChild(linkProduct);
        getUrlProduct(furnitures,i,linkProduct);
        createBtnLinkProduct(linkProduct);
    }
}

//Récupération de l'id pour page "product"//

function getUrlProduct(furnitures,i,linkProduct) {

    //-----Récupération de l'url//

    let splitUrl = window.location.pathname.split("/");
    let lastItem = splitUrl.pop();
    let url = window.location.origin + window.location.pathname.replace(lastItem, './pages/product.html');

    let urlObject = new URL(url);
    let idFurnitures = furnitures[i]._id;

    urlObject.searchParams.append("id", idFurnitures);
    linkProduct.href = urlObject;
}

//Bouton de Redirection vers page "product"//

function createBtnLinkProduct(linkProduct) {
    let btnBuy = document.createElement("button");
    linkProduct.appendChild(btnBuy);
    btnBuy.classList.add("btn", "btn-warning", "block-right");
    btnBuy.textContent = "Voir l'article";
}

//Appel de l'API//

async function getFurnitures() {
    try {
        let response = await fetch("http:localhost:3000/api/furniture");
        if (response.ok) {
            let furnitures = await response.json();
            createBlockFurnitures(furnitures);
        } else {
            console.error('retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}

//Appel de la fonction//

getFurnitures()