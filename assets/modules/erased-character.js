// **** Erased a character ****    
const tabId = new Array();

function erasedCharacter(image) {
    Array.from(document.querySelectorAll(".btnDelete")).forEach((button, i) => {
        button.addEventListener("click", async () => {
            const erasesConfirm = confirm("Do you want to delete this character?");

            if (erasesConfirm) {
                const id = tabId[i];
                console.log(id);

                try {
                    const answer = await fetch(`https://character-database.becode.xyz/characters/${id}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const deleteChar = await answer.json();
                    console.log(deleteChar);
                    location.reload();

                    if (!answer.ok) {
                        console.error(answer.status);
                    }

                } catch (error) {
                    console.error(error);
                }
            } else {
                alert("This character has not been deleted!");
            }
        })
    })
}

export { erasedCharacter };