$(function() {
	$('#btn-save').click(function() {
		var login = $('#login').val();
		var data = {
			elem: {
				login: login
			}
		}
		io.socket.post('/test', data, function(data, jwres) {
			console.log(data);
			if (jwres.statusCode !== 200) {
				alert('Error occured!');
				exit;
			}
			alert('all right');
		});
	});
});