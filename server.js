const puppeteer = require('puppeteer');
const http = require('http');
const	fs = require('fs');
const url = require('url');
const config = require('config');
const uuidv1 = require('uuid/v1');
const winston = require('winston');
require('winston-daily-rotate-file');

// Logging
const transport = new (winston.transports.DailyRotateFile)
  (config.get('winstonDailyRotateLog'));

const _log = new (winston.Logger)({
  transports: [ transport ]
});

http.createServer(function (req, res) {

  const requestId = uuidv1();

	// Session loggers
	const logMsg = msg => `${requestId} ${msg}`;
	const log = {
    debug: msg => _log.debug(logMsg(msg)),
    info: msg => _log.info(logMsg(msg)),
    warn: msg => _log.warn(logMsg(msg)),
    error: msg => _log.error(logMsg(msg))
  };

	log.info(`Begin request: ${req.url}`);

	const options = url.parse(req.url, true).query;

	const targetUrl = decodeURI(options.url);
	const windowWidth = +options.ww;
	const windowHeight = +options.wh;
	const timeout = +options.timeout || config.get('timeout');

	const viewPort = {
    width: windowWidth || config.get('defaultWidth'),
    height: windowHeight || config.get('defaultHeight')
  };

  const wait = options.wait;

  function handleError(e){
    log.error(e);
    res.writeHead(500, 'Server Error');
    res.end();
    console.log('Server Error', req.url, e);
  }

	puppeteer.launch()
	  .then(browser => browser.newPage()
	    .then(page => {

          if(wait){
            log.debug('Waiting for screenshotTrigger');
            return new Promise(function(resolve, reject) {

              const waitTimeout = setTimeout(() => {
                log.error('Wait timed out');
                reject(new Error('Wait timed out'));
              }, timeout);

              const handleTrigger = event => () => {
                log.debug(`Trigger detected: ${event}`);
                clearTimeout(waitTimeout);
                log.debug('Taking screenshot');
                resolve(page.screenshot({
                  fullPage: true
                }));
              }

              page.exposeFunction('triggerScreenshot', handleTrigger('triggerScreenshot'))
                .then(() => page.exposeFunction('callPhantom', handleTrigger('callPhantom')))
                .then(() => page.setViewport(viewPort))
                .then(() => page.goto(targetUrl))
                .catch(handleError);
            });
          }
          else{
            log.debug('No waiting branch');
            return page.setViewport(viewPort)
              .then(() => page.goto(targetUrl))
              .then(() => {
                log.debug('Taking screenshot');
                return page.screenshot({
                  fullPage: true
                });
              });
          }
        })
	      .then(buffer => {
          if(!buffer){
            handleError(new Error('Buffer is null'));
            return;
          }
          log.debug('Writing buffer');
	        res.write(buffer);
	        res.end();
          log.info('Success');
	        browser.close();
        }))
    .catch(handleError);

}).listen(process.env.PORT || 9000);
