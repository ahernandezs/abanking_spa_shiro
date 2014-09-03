<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<!-- Login en jsp :) -->
	<!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<style type="text/css">
			@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\:form{display:block;}
		</style>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>@Banking</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width">
		<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

		<link rel="stylesheet" href="css/29403685.vendor.css">
		<link rel="stylesheet" href="css/24e5db44.main.css">

	</head>
	<body onload='document.loginForm.username.focus();'>
		<!--[if lt IE 7]>
	      <p class="browsehappy">
	      	You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.
	      </p>
	    <![endif]--><!-- Add your site or application content here -->
	    <!-- ngView:  -->
	    
	    <div id="mainDiv" class="ng-scope">
		    <div class="login_back ng-scope">
			    <header class="home_header container">
			    <p class="pull-left">Bienvenido a ABanking</p>
			    <ul class="nav pull-right">
			    <li class="dropdown">
			    <a href="dist/" class="dropdown-toggle" data-toggle="dropdown">
			    Idioma: Español <b class="caret"></b>
			    </a>
			    <ul class="dropdown-menu">
				    <li><a href="dist/">Español</a></li>
				    <li class="divider"></li>
				    <li><a href="dist/">English</a></li>
			    </ul>
			    </li>
			    </ul>
			    </header>
			    <section class="container login-form shadow rounded ng-scope">
				    <div class="logo"><img src="images/845c582d.logo.png"></div>
					<form:form class="form-signin ng-pristine ng-invalid ng-invalid-required" action="authenticate" name="loginForm" modelAttribute="loginForm" method='post' accept-charset='UTF-8'>
					    <!--<p>Inicia sesión</p>--><!-- ngIf: errorMessage -->
						<c:if test="${not empty errorMsg }">
							<div class="alert alert-error">
								<c:out value="${errorMsg}"></c:out>
								<br>
							</div>
						</c:if>					    
					    <label class="border">
					    	<form:input type="text" path="username" name="username" class="form-control ng-pristine ng-invalid ng-invalid-required" placeholder="Usuario" />
					    </label>
					    <label class="border">
					    	<form:input type="password" path="password" name="password" class="form-control ng-pristine ng-invalid ng-invalid-required" placeholder="Contraseña" />
					    </label>
					    <button class="btn" type="submit">Entrar</button>
					    <label class="checkbox"><input type="checkbox"> Recordarme</label>
				    </form:form>
				    <div class="registration text-center">¿Eres nuevo? Regístrate</div>
			    </section>
			   <footer class="home_footer container text-center">
				   <a href="javascript:void(0);">¿Olvidaste tu contraseña?</a>
				   <a href="javascript:void(0);">Sobre nosotros</a>
				   <a href="javascript:void(0);">Busca por internet</a>
				   <a href="javascript:void(0);">Banca móvil</a>
				   <a href="javascript:void(0);">Privacidad</a>
				   © 2014 Anzen Soluciones S.A. de C.V.
			   </footer>
		   </div>
	   </div>
		<!--[if lt IE 9]>
	    	<script src="bower_components/es5-shim/es5-shim.js"></script>
	    	<script src="bower_components/json3/lib/json3.min.js"></script>
	    <![endif]-->
    </body>
</html>