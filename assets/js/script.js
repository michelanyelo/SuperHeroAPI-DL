$(document).ready(function () {
    $("#btnHeroe").click(function (e) {
        e.preventDefault();
        let numHeroe = getHeroeID();
        if (numHeroe !== null) {
            fetchHeroeData(numHeroe);
        } else {
            alert("Reintenta con un dígito numérico por favor")
        }
    });
});

// validacion numérico
function getHeroeID() {
    const regex = /^\d+$/;
    let numHeroe = $("#inputHeroe").val();
    if (regex.test(numHeroe)) {
        return numHeroe;
    } else {
        return null;
    }
}

function fetchHeroeData(numHeroe) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://superheroapi.com/api.php/d99f24a4825f426f9b0b4b4410645787/${numHeroe}`,
        "method": "GET",
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}