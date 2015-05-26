var webshot = require('webshot'),
	http = require('http'),
	fs = require('fs'),
	url = require('url');

http.createServer(function (req, res) {

	var options = url.parse(req.url, true).query;

	var targetUrl = decodeURI(options.url);
	var shotWidth = +options.w;
	var shotHeight = +options.h;
	var windowWidth = +options.ww;
	var windowHeight = +options.wh;

	var options = {
		shotSize: {
			width: shotWidth || 'all',
			height: shotHeight || 'all'
		},
		windowSize: {
			width: windowWidth || 1024,
			// The standard default of 768 doesn't allow for screen caps less than 768 tall
			// Making the window height 1 will allow for shorter auto height images
			height: windowHeight || 1
		},
		defaultWhiteBackground: true,
		takeShotOnCallback: options.wait
	};

	webshot(targetUrl, options, function (err, renderStream) {
		renderStream.pipe(res);
	});

}).listen(process.env.PORT || 9000);
