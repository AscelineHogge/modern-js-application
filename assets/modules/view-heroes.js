// **** View Heroes ****
function viewCharacter() {
    const buttonView = document.getElementsByClassName("cardBtn");

    const nameCard = document.getElementsByClassName("name");
    const signaleticsCard = document.getElementsByClassName("signaletics");
    const longDescriptionCard = document.getElementsByClassName("description");
    const imgCard = document.getElementsByClassName("image");

    Array.from(document.querySelectorAll(".cardBtn")).forEach((btn, i) => {
        btn.addEventListener("click", () => {
            let nameModal = document.querySelector(".modal-title");
            let signaleticsModal = document.querySelector(".signaleticsModal");
            let descriptionModal = document.querySelector(".cardModal");
            let imgModal = document.querySelector(".imgModal");

            nameModal.innerText = nameCard[i].innerText;
            signaleticsModal.innerText = signaleticsCard[i].innerText;
            descriptionModal.innerText = longDescriptionCard[i].innerText;
            imgModal.src = imgCard[i].src;
        })
    });
}

export { viewCharacter };