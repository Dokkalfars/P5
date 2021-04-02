//page "confirmation"//

//Confirmation de la commande//

function addConfirmationOrder() {
    const confirmationId = localStorage.getItem("orderConfirmationId");
    const messageConfirmation = document.getElementById("orderId");
    messageConfirmation.classList.add("font-italic");
    messageConfirmation.textContent = confirmationId;
    const totalPrice = localStorage.getItem("totalOrder");
    const confirmationPrice = document.getElementById("totalPrice");
    confirmationPrice.innerHTML = "Prix total : " + totalPrice/100 + "€";
}

//Vider le panier//

function resetOrder() {
    btnHome = document.getElementById("btn-confirmation");
    btnHome.addEventListener('click', function() {
        localStorage.removeItem("orderConfirmationId");
        localStorage.removeItem("cartContent");
        localStorage.removeItem("totalOrder");
        window.location.href = "../index.html";
    })
}

//Appel des fonctions//

addConfirmationOrder();
resetOrder();
