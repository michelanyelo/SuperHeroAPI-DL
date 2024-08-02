$(document).ready(function () {
    $("#btnHeroe").click(function (e) {
        e.preventDefault();
        let idHeroe = getHeroeID();
        if (idHeroe === null) {
            // Alerta para el error del manejo de tipo de dato
            alert("Reintenta con un dígito numérico por favor");
        } else {
            let token = "d99f24a4825f426f9b0b4b4410645787";
            $("#resultadoHero").superhero(token, idHeroe);

            // Apuntar el scroll hacia los resultados
            $("html, body").animate({
                scrollTop: $("#resultadoHero").offset().top
            }, 600);
        }
    });
});

// Validacion tipo numérico
function getHeroeID() {
    const regex = /^\d+$/;
    let idHeroe = $("#inputHeroe").val();
    if (regex.test(idHeroe)) {
        return idHeroe;
    } else {
        return null;
    }
}