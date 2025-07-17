var originAJAX = $.ajax;

$.ajax = function(options) {
	!options.headers && (options.headers = {});
	!options.headers['CSRF-TOKEN'] && (options.headers['CSRF-TOKEN'] = localStorage.getItem('CSRF-TOKEN') || '');
	return originAJAX.call($, options);
}