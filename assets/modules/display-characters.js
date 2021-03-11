// **** Display Character ****
const tabId = new Array(); //Créé un nouveau tableau qu'on utilisera pour ajouter les IDs.

function displayCharacter(data) {
    data.forEach(({ name, shortDescription, image, description, id }) => {
        const temp = document.querySelector("#template");
        const target = document.querySelector("#target");
        const copy = temp.cloneNode(true).content;

        copy.querySelector(".name").innerText = name;
        copy.querySelector(".signaletics").innerText = shortDescription;
        copy.querySelector(".image").src = `data:image/*;base64,${image}`;
        copy.querySelector(".description").innerText = description;

        target.appendChild(copy);

        tabId.push(id);
    });

    console.log(tabId);
}

export { displayCharacter };