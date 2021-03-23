var webshot = require('node-webshot'),
	http = require('http'),
	fs = require('fs'),
	url = require('url');

http.createServer(function (req, res) {
	if(req.method == 'POST') {
		var targetUrl = '';
		var options = {};
		var jsonString = '';		
        req.on('data', function (data) {
            jsonString += data;
        });
        req.on('end', function () {
			try {
				options = JSON.parse(jsonString);
				targetUrl = options['url'];
		
				var shotWidth = +options.w;
				var shotHeight = +options.h;
				var windowWidth = +options.ww;
				var windowHeight = +options.wh;
				var timeout = +options.timeout;

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
					phantomPath: 'phantomjs.exe',
					phantomConfig: {'ignore-ssl-errors': 'true' },
					defaultWhiteBackground: true,
					takeShotOnCallback: options.wait,
					timeout: timeout
				};

				webshot(targetUrl, options, function (err, renderStream) {
					// if (renderStream) {
						renderStream.pipe(res);
					// }
				});
			}
			catch(error) {
				// res.write(error);
			}
        });
	}
	else {
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
			phantomPath: 'phantomjs.exe',
			phantomConfig: {'ignore-ssl-errors': 'true' },
			defaultWhiteBackground: true,
			takeShotOnCallback: options.wait,
		};

		webshot(targetUrl, options, function (err, renderStream) {
			renderStream.pipe(res);
		});
	}
}).listen(process.env.PORT || 9000);
