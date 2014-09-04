<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>

<!doctype html><!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7">
<![endif]-->
<!--[if IE 7]><html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--><html class="no-js"><!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>@Banking</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width">
	<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
	<link rel="stylesheet" href="styles/29403685.vendor.css">
	<link rel="stylesheet" href="styles/24e5db44.main.css">
	<body ng-app="spaApp"><!--[if lt IE 7]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]--><!-- Add your site or application content here -->
    <div id="mainDiv" ng-view="">
    </div>
    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID --><script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
       (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
       m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
       })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

       ga('create', 'UA-XXXXX-X');
       ga('send', 'pageview');</script><!--[if lt IE 9]>
    <script src="bower_components/es5-shim/es5-shim.js"></script>
    <script src="bower_components/json3/lib/json3.min.js"></script>
    <![endif]-->
    <script src="https://cdn.pubnub.com/pubnub.min.js"></script>
    <script src="scripts/b014f144.vendor.js"></script>
    <script src="scripts/df346e56.scripts.js"></script>
    <script>

    app.run(['api', '$rootScope', '$cookies', function(api, $rootScope, $cookies) {

    	var session = $cookies.session;    	
    	$rootScope.usuario = '<shiro:principal property="clientName"/>';
		$rootScope.last_access_date = '<shiro:principal property="last_access_date"/>';
		$rootScope.last_access_media = '<shiro:principal property="last_access_media"/>';
		$rootScope.XBANKTOKEN = '<shiro:principal property="xbanktoken"/>';
		$rootScope.session_token = '<shiro:principal property="xauthtoken"/>';
		api.init();
    }]);

    </script>
