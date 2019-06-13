var page = require('webpage').create();
/*
page.open('http://www.google.com/', function() {
  page.render('google.png');
  page.viewportSize = { width: 800, height: 600 };
  phantom.exit();
});
*/
page.open('https://ppiaarp.velir.com/export/image/?url=https%3A%2F%2Fppiaarp.velir.com%2Findicator%2F65%2Fpopulation-by-age-sex-raceethnicity%3Fclean%3Dclean%23%2Fmap%3Floc%3D1%26dist1%3D49%26dist2%3D7%26dist5%3D23%26tf%3D15%26fmt%3D247%26showLabels', function() {
	window.setTimeout(function () {
		  page.render('vizualisation-test.png');
		  page.viewportSize = { width: 800, height: 600 };
		  phantom.exit();
	  }, 2000);
});

