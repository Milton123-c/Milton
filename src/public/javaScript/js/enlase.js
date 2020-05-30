$(document).ready(() => {
    var longitud = $('#longitud').text();

    var numero = parseInt(longitud);


    for (let i = 0; i < numero; i++) {
        $(`#valor${i}`).on('click', () => {

            $(`#key${i}`).toggle();

            var texto = $(`#valor${i}`).text();
            if (texto == "Ver") {
                $(`#valor${i}`).text("Ocultar");
            } else if (texto == "Ocultar") {
                $(`#valor${i}`).text("Ver");
            }

        });
    }

});