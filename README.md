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


## PhantomJs

Some older sites use the PhantomJs branch rather than the main Puppeteer branch. Note that these branches are slightly incompatible. Switching a site using one branch to the other requires slightly different JavaScript when using the `wait` param to have the site trigger taking a screenshot. Switching without making the required code changes will result in timeout errors.

The PhantomJs branch can be set up as a Windows service (using [NSSM](https://nssm.cc/) to run `node.exe server.js` for example), or as an IIS site. To set it up as an IIS site, create a new site in IIS as normal, go to Default Document, and add server.js.

You can test that the site is set up correctly by browsing to `<yourPhantomJsIisSite>?url=<someTestSiteLikeGoogle>`. If you receive an error about spawning phantomJs, make sure that the `phantomPath` configured in server.js is the correct location for phantomJs.exe. You can also run "phantomjs testing.js" to check for console errors.
