package mx.com.prosa.app.mail.controller;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import mx.com.prosa.app.mail.beans.LoginForm;
import mx.com.prosa.app.mail.beans.UserSession;
import mx.com.prosa.app.mail.services.impl.AuthenticationServiceImpl;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WebAppController {

    @Autowired
	AuthenticationServiceImpl authcService;
	
    @RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(ModelMap model) {
		model.addAttribute("loginForm", new LoginForm());
		return "login";
	}

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public String postLogin(@ModelAttribute(value = "loginForm") LoginForm loginForm, ModelMap model, HttpServletResponse response) {
		
		UsernamePasswordToken token = new UsernamePasswordToken();
		token.setUsername(loginForm.getUsername());
		token.setPassword(loginForm.getPassword().toCharArray());

		Subject currentUser = SecurityUtils.getSubject();

		try {
			currentUser.login(token);			
			
			Cookie ck = new Cookie("session", currentUser.getPrincipal().toString());
			ck.setMaxAge(-1);
			//ck.setHttpOnly(true);
			response.addCookie(ck);
		} catch (Exception e) {
		    currentUser.logout();
			model.addAttribute("error", true);
			model.addAttribute("errorMsg", "Error de autenticación");
			return "login";
		}
		
		return "redirect:/";
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(ModelMap model) {
	    System.out.println("Saliendo...");
		Subject currentUser = SecurityUtils.getSubject();
		currentUser.logout();
		model.addAttribute("loginForm", new LoginForm());
		return "login";
	}

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String getHome(ModelMap model) {
        return "SPA";
    }

}
