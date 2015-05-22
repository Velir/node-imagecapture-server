var webshot = require('webshot'),
	http = require('http'),
	fs = require('fs'),
	url = require('url');

http.createServer(function (req, res) {

	var options = url.parse(req.url, true).query;

	var targetUrl = decodeURI(options.url);
	var shotWidth = +options.width;
	var shotHeight = +options.height;

	var options = {
		shotSize: {
			width: shotWidth || 'all',
			height: shotHeight || 'all'
		},
		defaultWhiteBackground: true,
		takeShotOnCallback: options.wait
	};

	webshot(targetUrl, options, function (err, renderStream) {
		renderStream.pipe(res);
	});

}).listen(process.env.PORT || 9000);
