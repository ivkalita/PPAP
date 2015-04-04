$(function() {
	$('.selectpicker').selectpicker();
	$('#locale-select').change(function() {
		window.location.assign('/locale?locale=' + $('#locale-select').val());
	});
	$('#admin-enter').click(function() {
		window.location.assign('/admin');
	});
});