(() => {
    import { fetchCharacter } from "./modules/fetchCharacter.js";
    import { displayCharacter } from "./modules/displayCharacter.js";
    import { viewCharacter } from "./modules/viewCharacter.js";
    import { createCharacter } from "./modules/createCharacter.js";
    //import {editCharacter} from "./modules/editCharacter.js";
    import { erasedCharacter } from "./modules/deleteCharacter.js";
    //   **** Get api and show elements ****

    const tabId = new Array(); //la const sert a creer un tableau
    const allVal = Array.from(document.querySelectorAll("input"));
    // querySelectorAll() renvoie une NodeList statique

    let apiChar = fetchCharacter();
    /* Appel de fonctions */
    apiChar.then(data => {
        displayCharacter(data);
        viewHeroes();
        createCharacter();
        editCharacter();
        erasedCharacter();
        imageCharacter();
    })
})();





//   **** Get api and show elements ****

/*  **** MAIN ****  */


