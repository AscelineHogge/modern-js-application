function imageCharacter() {
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
}
