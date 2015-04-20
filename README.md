#node-imagecapture-server
Fire up a server that will take a screenshot of your website. Uses [node-webshot](https://github.com/brenden/node-webshot).

## Getting started

  $ npm install
  $ node server.js


## Options

| Parameter | Description
| --------- | ---------------------------------------------------------
| url       | The target URL for the screenshot
| width     | (optional) The width of the screenshot. Will default to the full width of the web page.
| height    | (optional) The height of the screenshot. Will default to the full height of the web page.
| wait      | (optional - true | false) Wait for the target webpage to trigger *window.callPhantom('takeShot');*
