$(function() {
	CKEDITOR.replace('input-text');
	$('#save-btn').click(function() {
		var title = $('#input-title').val().trim(),
			description = $('#input-description').val().trim(),
			text = CKEDITOR.instances['input-text'].getData().trim()
		;
		if (title == '' || description == '' || text == '') {
			alert('Внимательно заполните все поля!');
			return;
		}
		io.socket.post('/admin/news/new', {title: title, description: description, text: text}, function(data, jwres) {
			if (jwres.statusCode !== 200) {
				alert('Возникла какая-то ошибка!');
				console.log(data);
				console.log(jwres);
				return;
			}
			window.location.replace('/admin/news');
		});
	});
});

