// **** Create a character ****
const allVal = Array.from(document.querySelectorAll("input"));

function createCharacter(image) {
    document.querySelector("#addBtn").addEventListener("click", async () => {
        const values = allVal.map(({ value }) => value.trim());
        const [name, shortDescription, description] = values;
        const post = await fetch("https://character-database.becode.xyz/characters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                shortDescription,
                description,
                image,
            })
        })
        document.location.reload();

        if (!post.ok) {
            console.error(post.status);
        }
    })
}

export { createCharacter, allVal };