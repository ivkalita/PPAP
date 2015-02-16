var url = '/login';
$(function() {
	$('#btn-enter').click(function(event) {
		event.preventDefault();
		var credentials = {
			login: $('#login-text').val(),
			password: $('#password-text').val()
		}
		io.socket.post(url, {user: credentials}, function(data, jwres) {
			if (jwres.statusCode !== 200) {
				alert(data);
				return;
			}
			//redirect to main page
			window.location.replace('/');
		});
		return false;
	});
});