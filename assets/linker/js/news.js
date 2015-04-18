var currentNews = {
	id: undefined,
	title: '',
	text: '',
	description: ''
};

var urls = {
	create: '/admin/news/create',
	update: '/admin/news/update',
	destroy: '/admin/news/destroy',
	get: '/admin/news/get'
};

function clearData() {
	currentNews = {
		id: undefined,
		title: '',
		text: '',
		description: ''
	}
}

function syncCardWithData() {
	$('#input-title').val(currentNews.title);
	$('#input-description').val(currentNews.description);
	CKEDITOR.instances['input-text'].setData(currentNews.text);
	if (typeof(currentNews.id) === 'undefined' || currentNews.id == null) {
		$('#delete-btn').hide();
	} else {
		$('#delete-btn').show();
	}
}

function syncDataWithCard() {
	currentNews.title = $('#input-title').val().trim();
	currentNews.description = $('#input-description').val().trim();
	currentNews.text = CKEDITOR.instances['input-text'].getData().trim();
}

function isCardValid() {
	return !(currentNews.title == '' || currentNews.text == '' || currentNews.description == '');
}

function responseHandler(data, jwres) {
	if (jwres.statusCode !== 200) {
		console.log('error');
		console.log(data);
		console.log(jwres);
		return;
	}
	$('#news-card').modal('toggle');
	window.location.replace('/admin/news');
}

function responseHandlerRefresh(data, jwres) {
	if (jwres.statusCode !== 200) {
		console.log('error');
		console.log(data);
		console.log(jwres);
		return;
	}
	window.location.replace('/admin/news');
}

$(function() {
	CKEDITOR.replace('input-text');

	$('#add-btn').click(function() {
		clearData();
		syncCardWithData();
		$('#news-card').modal('toggle');
	});

	$('#save-btn').click(function() {
		syncDataWithCard();
		if (!isCardValid()) {
			alert('Внимательно заполните все поля!');
			return;
		}
		io.socket.post(
			currentNews.id ? urls.update : urls.create,
			currentNews,
			responseHandler
		);
	});

	$('#delete-btn').click(function() {
		if (!currentNews.id) {
			return;
		}
		io.socket.post(urls.destroy, currentNews, responseHandler);
	});

	$('.edit-btn').click(function() {
		var id = $(this).data('id');
		io.socket.get(urls.get, {id: id}, function(data, jwres) {
			if (jwres.statusCode !== 200) {
				console.log('error');
				console.log(data);
				console.log(jwres);
				return;
			}
			currentNews = {
				id: data.id,
				title: data.title,
				text: data.text,
				description: data.description
			};
			syncCardWithData();
			$('#news-card').modal('toggle');
		});
	});

	$('.delete-btn').click(function() {
		var id = $(this).data('id');
		io.socket.post(urls.destroy, {id: id}, responseHandlerRefresh);
	});
});