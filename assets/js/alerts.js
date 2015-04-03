function Alert () {
}

Alert.prototype.success = function(text) {
	$('#error-message-div').hide();
	$('#success-message').text(text);
	$('#success-message-div').show();
	$('#success-message-div').delay(3000).fadeOut({duration: 1000});
}

Alert.prototype.error = function(text) {
	$('#success-message-div').hide();
	$('#error-message').text(text);
	$('#error-message-div').show();
	$('#error-message-div').delay(3000).fadeOut({duration: 1000});
}

$(function() {
	$('#error-message-div').hide();
	$('#success-message-div').hide();
});

var messages = new Alert();