function prepareCard(card, id) {
	var url = card.data('url');
	io.socket.get(url, {id: id}, function(resData, jwres) {
		if (jwres.statusCode !== 200) {
			console.log('server returns ' + jwres.statusCode);
			console.log('prepareCard');
			return;
		}
		for (attr in resData) {
			if (attr === 'id') {
				card.find('button[data-attr="id"]').data('id', resData[attr]);
			}
			var elem = card.find('[data-attr="' + attr + '"]');
			if (elem) {
				if (attr === 'additionalInfo') {
					CKEDITOR.instances[elem.attr('id')].setData(resData[attr]);
				} else {
					elem.val(resData[attr]);
				}
			}
		}
		clearCard(card);
		card.modal('show');
	});
}

function clearCard(card) {
	card.find('input, textarea').val();
}

function disableDelete(card) {
	card.find('button.delete').prop('disabled', true);
}

function enableDelete(card) {
	card.find('button.delete').prop('disabled', false);
}

function refreshIf200(resData, jwres) {
	if (jwres.statusCode !== 200) {
		alert('!');
		console.log('server returns ' + jwres.statusCode);
		console.log('refreshIf200');
		return;
	}
	location.reload();
}

$(function() {
	$('button.edit').click(function() {
		var dtype = $(this).data('type'),
			id = $(this).data('id'),
			card = $('#' + dtype + '-card')
		;
		enableDelete(card);
		prepareCard(card, id);
	});

	$('button.add').click(function() {
		var dtype = $(this).data('type'),
			card = $('#' + dtype + '-card')
		;
		clearCard(card);
		disableDelete(card);
		card.modal('show');
	});

	$('div.modal button.save').click(function() {
		var dtype = $(this).data('type'),
			id = $(this).data('id'),
			card = $('#' + dtype + '-card'),
			url = card.data('url'),
			inputs = card.find('input, textarea'),
			data = {}
		;
		inputs.each(function() {
			if ($(this).data('isck')) {
				data[$(this).data('attr')] = CKEDITOR.instances[$(this).attr('id')].getData().trim();
			} else {
				data[$(this).data('attr')] = $(this).val().trim();
			}
		});
		if (id) {
			data.id = id;
			io.socket.put(url, data, refreshIf200);
		} else {
			io.socket.post(url, data, refreshIf200);
		}
	});

	$('#btn-save-main').click(function() {
		event.preventDefault();
		var data = {
			firstName: $('#first-name-text').val().trim(),
			lastName: $('#last-name-text').val().trim(),
			middleName: $('#middle-name-text').val().trim(),
			birthday: $('#birthday').val(),
			password: $('#password').val() ? $('#password').val() : undefined
		};
		if (data.firstName == '' || data.lastName == '') {
			alert('!');
			return;
		}
		//send info here
		console.log(data);
	});

	$('button.delete').click(function() {
		event.preventDefault();
		var dtype = $(this).data('type'),
			id = $(this).data('id'),
			url = "/profile/" + dtype
		;
		io.socket.delete(url, {id: id}, refreshIf200);
	});
});