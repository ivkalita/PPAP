$(function() {
	$('#add-news').click(function() {
		window.location.replace('/admin/news/new');
	});

	$('.delete-btn').click(function() {
		var newsId = $(this).data('id');
		io.socket.post('/admin/news/delete', {id: newsId}, function(data, jwres) {
			if (jwres.statusCode !== 200) {
				alert('Произошла какая-то ошибка!');
				console.log(data);
				console.log(jwres);
				return;
			}
			window.location.replace('/admin/news');
		});
	});

	$('.edit-btn').click(function() {
		window.location.replace('/admin/news/edit?id=' + $(this).data('id'));
	});
});