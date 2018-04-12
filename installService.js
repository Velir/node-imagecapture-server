var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Webshot',
  description: 'Screenshot application',
  script: require('path').join(__dirname, 'server.js')
});

svc.on('install',function(){
  svc.start();
});

svc.install();
