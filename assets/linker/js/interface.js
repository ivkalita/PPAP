$(function() {
	$('.selectpicker').selectpicker();
	$('#locale-select').change(function() {
		window.location.replace('/locale?locale=' + $('#locale-select').val());
	});
});