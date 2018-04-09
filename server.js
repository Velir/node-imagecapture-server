var puppeteer = require('puppeteer');
var http = require('http');
var	fs = require('fs');
var url = require('url');

http.createServer(function (req, res) {

	var options = url.parse(req.url, true).query;

	var targetUrl = decodeURI(options.url);
	var windowWidth = +options.ww;
	var windowHeight = +options.wh;
	var timeout = +options.timeout || 30000;

	var viewPort = {
    width: windowWidth || 1024,
    height: windowHeight || 1
  };

  var wait = options.wait;

	puppeteer.launch()
	  .then(browser => browser.newPage()
	    .then(page => page.setViewport(viewPort)
        .then(() => page.goto(targetUrl))
	      .then(() => {
	        
	        if(wait){
            return new Promise(function(resolve, reject) {
              var waitTimeout = setTimeout(reject, timeout);

              page.exposeFunction('triggerScreenshot', () => {
                clearTimeout(waitTimeout);
                resolve(page.screenshot({
                  fullPage: true
                }));
              });
            });
          }
          else{
            return page.screenshot({
              fullPage: true
            });
          }
        })
	      .then(buffer => {
	        res.write(buffer);
	        res.end();
	        browser.close();
        })))
    .catch(e => {
      // TODO: Log error to file
      res.writeHead(500, 'Server Error');
      res.end();
      console.log('Server Error', req.url, e);
    });

}).listen(process.env.PORT || 9000);
