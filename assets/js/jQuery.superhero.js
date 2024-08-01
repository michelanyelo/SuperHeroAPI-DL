jQuery.fn.superhero = function (token, idHeroe) {
    let element = this; // Referencia al objeto jQuery que invoca el método

    // Configuración del AJAX con jQuery
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://superheroapi.com/api.php/${token}/${idHeroe}`,
        "method": "GET",
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        renderHeroeCard(element, response);
    });
    return this;
}

//Función para renderizar los datos del superheroe
function renderHeroeCard(element, response) {
    // Array de objetos con claves y valores para los atributos del superheroe
    const heroAttributes = [
        { label: 'Conexiones', value: response.connections['group-affiliation'] },
        { label: 'Publicado por', value: response.biography['publisher'] },
        { label: 'Ocupación', value: response.work['occupation'] },
        { label: 'Primera aparición', value: response.biography['first-appearance'] },
        { label: 'Alianzas', value: response.biography['aliases'].join(', ') },
        // Nuevos arrays sin espacios entre valor y lb/kg y valor pulgadas/cm para los items de Altura y Peso
        // '183 cm' se convierte en '183cm'
        // Uso de join para retornar un string separados por guion (-)
        // 6ft - 183cm.
        { label: 'Altura', value: response.appearance['height'].map(height => height.replace(' ', '')).join(' - ') },
        { label: 'Peso', value: response.appearance['weight'].map(weight => weight.replace(' ', '')).join(' - ') }
    ];

    // Crear el HTML para la tarjeta del superheroe (como eran muchos parrafos los procesé con map)
    const cardHtml = `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${response.image.url}" class="img-fluid h-100 object-fit-cover" alt="Foto de perfil del superheroe ${response.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Nombre: ${response.name}</h5>
                        ${heroAttributes.map(attr => `
                            <p class="card-text">${attr.label}: ${attr.value}</p>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>`;

    // Usar `element` para mostrar el contenido y la tarjeta del superheroe
    console.log("Card HTML:", element);
    $("#resultadoTitle").show();
    element.html(cardHtml);
}