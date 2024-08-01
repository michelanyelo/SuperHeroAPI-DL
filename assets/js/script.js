$(document).ready(function () {
    $("#btnHeroe").click(function (e) {
        e.preventDefault();
        let numHeroe = $("#inputHeroe").val();
        console.log(numHeroe);
    });
});