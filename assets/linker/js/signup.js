var url = '/signup';
$(function() {
	$('#btn-ok').click(function(event) {
		event.preventDefault();
		var credentials = {
			login: $('#login-text').val(),
			password: $('#password-text').val(),
			firstName: $('#firstname-text').val(),
			lastName: $('#lastname-text').val(),
			middleName: $('#middlename-text').val()
		}
		io.socket.post(url, {user: credentials}, function(data, jwres) {
			if (jwres.statusCode !== 200) {
				alert(data);
				exit;
			}
			//redirect to main page
			window.location.replace('/');
		});
		return false;
	});
});