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
        renderHeroeCard(element, response);
        renderChart(response);
    });

    return this;
}

//Función para renderizar los datos del superheroe
function renderHeroeCard(element, response) {
    // Array de objetos con claves y valores para los atributos del superheroe
    const heroAttributes = [
        { label: 'Conexiones', value: response.connections['group-affiliation'] },
        { label: 'Ocupación', value: response.work['occupation'] },
        { label: 'Primera aparición', value: response.biography['first-appearance'] },
        { label: 'Alianzas', value: response.biography['aliases'].join(', ') },
        { label: 'Altura', value: response.appearance['height'].map(height => height.replace(' ', '')).join(' - ') },
        { label: 'Peso', value: response.appearance['weight'].map(weight => weight.replace(' ', '')).join(' - ') }
    ];

    // Crear el HTML para la tarjeta del superheroe (como eran muchos parrafos los procesé con map)
    const cardHtml = `
        <div class="card mb-3 border-0">
            <div class="row g-0">
                <div class="col-md-4 d-flex align-items-center">
                    <img src="${response.image.url}" class="img-fluid h-100 object-fit-cover" alt="Foto de perfil del superheroe ${response.name}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${response.name} <small class="text-body-secondary"> ${response.biography['publisher']} </small></h5>
                        ${heroAttributes.map(attr => `
                            <p class="card-text">${attr.label}: ${attr.value}</p>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>`;

    // Usar `element` para mostrar el contenido y la tarjeta del superheroe
    $("#resultadoTitle").show();
    element.html(cardHtml);
}

// Función para renderizar los datos del superhéroe en un gráfico
function renderChart(response) {
    const chartData = [];
    const stats = response.powerstats;

    // Recopilar datos para el gráfico
    for (const power in stats) {
        if (stats[power] !== "null") {
            chartData.push({ label: power, y: Number(stats[power]) });
        }
    }

    // Verificar si hay datos para mostrar en el gráfico
    if (chartData.length === 0) {
        // Mostrar mensaje e imagen si no hay datos
        $("#chartContainer").html(`
            <p class='text-danger fw-bold'>Este héroe no tiene poderes registrados :(</p>
            <img class='img-fluid w-75 yamcha' src='assets/img/yamcha.jpg' alt='Imagen de Yamcha'>
        `);
    } else {
        // Configurar y renderizar el gráfico si hay datos
        let chart = new CanvasJS.Chart("chartContainer", {
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            animationEnabled: true,
            title: {
                text: `Stats de ${response.name}`
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: chartData
            }]
        });
        chart.render();
    }
}
