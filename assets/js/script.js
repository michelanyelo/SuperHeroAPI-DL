$(document).ready(function () {
    $("#btnHeroe").click(function (e) {
        e.preventDefault();
        let numHeroe = getHeroeID();
        fetchHeroeData(numHeroe);
    });
});

function getHeroeID() {
    return $("#inputHeroe").val();
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
