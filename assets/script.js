(() => {
    //   **** Get api and show elements ****

    const tabId = new Array(); //la const sert a creer un tableau
    const allVal = Array.from(document.querySelectorAll("input"));
    // querySelectorAll() renvoie une NodeList statique

    // **** Fetch our API ****
    //Dans la fonction fetchCharacter, on va recuperer l'api avant de le changer en .json dans une nouvelle variable
    //"Return" met fin a l'exec. de la fonction et specifie une valeur ("data") a renvoyer
    //"Catch" sert a recommencer la fonction s'il y a une erreur
    async function fetchCharacter() { //async permet un comport. asynchrone basé sur des promesses, évitant ainsi les chaînes de promesses.
        try {
            const api = await fetch('https://character-database.becode.xyz/characters');
            const data = await api.json();
            console.log(data);
            return data;

        } catch (error) {
            console.error(error);
        }
    }

    // **** Display Character ****
    //la fonction "displayCharacter" sert a aller chercher les persos sur l'api pour les afficher
    //on cree une boucle data.forEach pour indiquer les elements a afficher ({sert a specifier, il faut rentrer dans les details})
    /* les const vont chercher le "#template" et le "#target" dont on a besoin ensuite on clone le contenu avec 
        "cloneNode(true)"*/
    //Une fois copie, on peut aller chercher independemment tout les elements desires afin de les afficher en text/image
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
            //"appendChild()" ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié

            tabId.push(id);
            //Push donne aux applis web la possib. de recevoir des mess. depuis un serveur
        });

        console.log(tabId);
    }

    // **** View Heroes ****
    //La fonction "viewHeroes" permet d'afficher, dans un modal, les infos des heros
    function viewHeroes() {
        //en cliquant sur le bouton, on ouvre la carte d'infos
        const buttonView = document.getElementsByClassName("cardBtn");

        //les consts sont les elements qui doivent etre affiches dans la carte
        const nameCard = document.getElementsByClassName("name");
        const signaleticsCard = document.getElementsByClassName("signaletics");
        const longDescriptionCard = document.getElementsByClassName("description");
        const imgCard = document.getElementsByClassName("image");

        //"Array.from" copiée à partir d'un objet semblable à un tableau
        //Et il est affile a une boucle afin de chercher tout ce qu'on a besoin
        Array.from(document.querySelectorAll(".cardBtn")).forEach((btn, i) => {
            //"addEventListener()" met en place une fonction qui appelle un événement spécifié qui sera délivré à la cible
            btn.addEventListener("click", () => {
                //les "let" comprennent sont les evenements delivres
                let nameModal = document.querySelector(".modal-title");
                let signaleticsModal = document.querySelector(".signaleticsModal");
                let descriptionModal = document.querySelector(".cardModal");
                let imgModal = document.querySelector(".imgModal");
                //on change les infos en texte afin de les lire 
                nameModal.innerText = nameCard[i].innerText;
                signaleticsModal.innerText = signaleticsCard[i].innerText;
                descriptionModal.innerText = longDescriptionCard[i].innerText;
                imgModal.src = imgCard[i].src;
            })
        });
    }

    // **** Create a character ****
    //La fonction "createCharacter" permet de creer un hero a l'aide d'un modal
    function createCharacter() {
        document.querySelector("#addBtn").addEventListener("click", async () => {
            //allVal recupere toutes les valeurs dans le tableau
            //".map()" cree un nouvel array
            //".trim" enlever les espaces superflus
            const values = allVal.map(({ value }) => value.trim());
            const [name, shortDescription, description] = values;
            //en dessous, ca sert a le rajouter dans l'api en donnant la methode a faire
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
            //permet de rafraichir la page une fois l'hero rajouter
            document.location.reload();

            if (!post.ok) {
                console.error(post.status);
            }
        })
    }

    // **** Edit a Character ****

    function editCharacter() {
        //const editButton = document.querySelectorAll(".btnEdit");
        const changeButton = document.querySelectorAll("#changeBtn");

        const nameCard = document.getElementsByClassName("name");
        const signaleticsCard = document.getElementsByClassName("signaletics");
        const longDescriptionCard = document.getElementsByClassName("description");
        //const imgCard = document.getElementsByClassName("image");

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

    // **** Erased a character ****    
    //la fonction "erasedCharacter" permet de supprimer un hero
    function erasedCharacter() {
        //"Array.from" copiée à partir d'un objet semblable à un tableau
        //Et il est affile a une boucle afin de chercher tout ce qu'on a besoin
        Array.from(document.querySelectorAll(".btnDelete")).forEach((button, i) => {
            //Quand on clique sur le bouton, 
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
    let apiChar = fetchCharacter();

    let image = "";
    document.querySelector("#inputImg").addEventListener("change", (event) => {
        const fileList = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            image = reader.result.replace('data:', '').replace(/^.+,/, '');
            console.log(image);
        };
        reader.readAsDataURL(fileList);
    });

    /* Appel de fonctions */
    apiChar.then(data => {
        displayCharacter(data);
        viewHeroes();
        createCharacter();
        editCharacter();
        erasedCharacter();
    })
})();