#node-imagecapture-server
Fire up a server that will take a screenshot of your website. Uses Chrome headless, via [puppeteer](https://github.com/GoogleChrome/puppeteer).

## Getting started

    $ npm install
    $ node server.js


## Options

| Parameter | Description
| --------- | ---------------------------------------------------------
| url       | The target URL for the screenshot
| ww        | (optional) The width of the window. (default: 1024)
| wh        | (optional) The height of the window. (defaults to height of content)
| wait      | (optional - true,false) Wait for the target webpage to trigger *window.triggerScreenshot();*
| timeout   | (optional - integer) Timeout in ms (defaults to 30000)
