// **** Edit a Character ****

function editCharacter() {
    const changeButton = document.querySelectorAll("#changeBtn");

    const nameCard = document.getElementsByClassName("name");
    const signaleticsCard = document.getElementsByClassName("signaletics");
    const longDescriptionCard = document.getElementsByClassName("description");

    Array.from(document.querySelectorAll(".btnEdit")).forEach((button, i) => {
        let editName = document.getElementById("editName");
        let editSignalitics = document.getElementById("editSignaletics");
        let editDescription = document.getElementById("editDescription");

        editName.value = nameCard[i].textContent;
        editSignalitics.value = signaleticsCard[i].textContent;
        longDescriptionCard.textContent = editDescription[i].textContent;

        changeButton.addEventListener("click", async () => {
            const editAdd = Array.from(document.getElementsByClassName("edits"));
            const newValues = editAdd.map(({ value }) => value.trim());

            newValues[3] = cut;

            if (newValues.some((value) => value === "")) {
                alert("Please, don't leave an empty input!");
                return;
            }
            else {
                const [name, shortDescription, description, image] = newValues;
                const id = characterId[i];

                try {
                    const rep = await fetch(`https://character-database.becode.xyz/characters/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },

                        body: JSON.stringify({
                            name,
                            shortDescription,
                            description,
                            image,
                        }),
                    });

                    const editChar = await rep.json();
                    console.log(editChar);
                    location.reload();

                } catch (error) {
                    console.error(error);
                }
            }
        })
    })
}

export { editCharacter };