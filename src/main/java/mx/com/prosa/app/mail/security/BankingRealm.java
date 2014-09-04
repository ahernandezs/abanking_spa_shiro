package mx.com.prosa.app.mail.security;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import mx.com.prosa.app.mail.beans.LoginForm;
import mx.com.prosa.app.mail.beans.UserSession;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.databind.ObjectMapper;

public class BankingRealm extends AuthorizingRealm {
		
    private @Value("${url-rest}") String restURL;

    private @Value("${X-BANK-TOKEN}") String XBANKTOKEN;

	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		return null;
	}

	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
	    
		UsernamePasswordToken upToken = (UsernamePasswordToken) token;
	    ObjectMapper mapper = new ObjectMapper();
		
		String userID = new String(upToken.getUsername());
		String password = new String(upToken.getPassword());
		UserSession userSession = new UserSession();
		String authToken = "";
		
	    try { 
	        	        
	        URL url = new URL(restURL); 
	        HttpURLConnection connection = (HttpURLConnection) url.openConnection(); 

	        connection.setDoOutput(true);
	        connection.setRequestMethod("POST"); 
	        connection.setRequestProperty("Content-Type", "application/json"); 
	        connection.setRequestProperty("X-BANK-TOKEN", XBANKTOKEN);

	        String input = mapper.writeValueAsString(new LoginForm(userID,password,"SPA"));
	        	        
	        OutputStream os = connection.getOutputStream();
	        os.write(input.getBytes());
	        os.flush();	        
	        
	        if (connection.getResponseCode() != HttpURLConnection.HTTP_CREATED) {
	            throw new AuthenticationException();
	        }
	        	 
	        authToken = connection.getHeaderField("X-AUTH-TOKEN");
	        BufferedReader br = new BufferedReader(new InputStreamReader((connection.getInputStream())));
	 
	        String response="";
	        String out;	        
	        while ((out = br.readLine()) != null){
	            response += out;
	        }
            connection.disconnect();	            
	        userSession = mapper.readValue(response, UserSession.class);
	        userSession.setXbanktoken(XBANKTOKEN);
	        userSession.setXauthtoken(authToken);

	    } catch (Exception e) {
            throw new AuthenticationException(e.getMessage());
        }		
		return new SimpleAuthenticationInfo(userSession, password, getName());
	}

}
