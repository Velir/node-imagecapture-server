#node-imagecapture-server
Fire up a server that will take a screenshot of your website. Uses [node-webshot](https://github.com/brenden/node-webshot).

## Getting started

    $ npm install
    $ node server.js


## Options

| Parameter | Description
| --------- | ---------------------------------------------------------
| url       | The target URL for the screenshot
| w         | (optional) The width of the screenshot. Will default to the full width of the web page.
| h         | (optional) The height of the screenshot. Will default to the full height of the web page.
| ww        | (optional) The width of the window. (default: 1024)
| wh        | (optional) The height of the window. (default: 768)
| wait      | (optional - true,false) Wait for the target webpage to trigger *window.callPhantom('takeShot');*
