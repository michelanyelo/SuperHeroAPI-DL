$(document).ready(function () {
    $("#btnHeroe").click(function (e) {
        e.preventDefault();
        let idHeroe = getHeroeID();
        if (idHeroe === null) {
            alert("Reintenta con un dígito numérico por favor");
        } else {
            let token = "d99f24a4825f426f9b0b4b4410645787";
            $("#resultadoHero").superhero(token, idHeroe);
        }
    });
});

// validacion tipo numérico
function getHeroeID() {
    const regex = /^\d+$/;
    let idHeroe = $("#inputHeroe").val();
    if (regex.test(idHeroe)) {
        return idHeroe;
    } else {
        return null;
    }
}