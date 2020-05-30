$(document).ready(() => {
    $('#click-form').on('click', () => {
        var password = $('#claveActivar').val();
        var mlv = "miltonProgramador";

        if (password == mlv) {
            $('#formulario').toggle(1000);
            $('#mvt').toggle(1000);
        }
    });
});