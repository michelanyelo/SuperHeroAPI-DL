$(document).ready(function () {
    $("#btnHeroe").click(function (e) {
        e.preventDefault();
        let numHeroe = getHeroeID();
        if (numHeroe !== null) {
            fetchHeroeData(numHeroe);
        } else {
            alert("Reintenta con un dígito numérico por favor");
        }
    });
});

// validacion tipo numérico
function getHeroeID() {
    const regex = /^\d+$/;
    let numHeroe = $("#inputHeroe").val();
    if (regex.test(numHeroe)) {
        return numHeroe;
    } else {
        return null;
    }
}

// acceder al ajax mediante jquery
function fetchHeroeData(numHeroe) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://superheroapi.com/api.php/d99f24a4825f426f9b0b4b4410645787/${numHeroe}`,
        "method": "GET",
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        renderHeroeCard(response);
    });
}

// renderizar los datos del api
function renderHeroeCard(data) {
    const cardHtml = `
    <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center">
                <img src="${data.image.url}" class="img-fluid h-100 object-fit-cover" alt="Foto de perfil del héroe ${data.name}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">Nombre: ${data.name}</h5>
                    <p class="card-text">Conexiones: ${data.connections['group-affiliation']} </p>
                    <p class="card-text">Publicado por: ${data.biography['publisher']}</p>
                    <p class="card-text">Ocupación: ${data.work['occupation']}</p>
                    <p class="card-text">Primera aparición: ${data.biography['first-appearance']}</p>
                    <p class="card-text">Altura: ${data.appearance['height']}</p>
                    <p class="card-text">Peso: ${data.appearance['weight']}</p>
                    <p class="card-text">Alianzas: ${data.biography['aliases']}</p>
                </div>
            </div>
        </div>
    </div>`;

    $('#resultadoTitle').show();
    $('#resultadoHero').html(cardHtml);
}