// **** Fetch our API ****
async function fetchCharacter() {
    try {
        const api = await fetch('https://character-database.becode.xyz/characters');
        const data = await api.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error(error);
    }
}

export { fetchCharacter };