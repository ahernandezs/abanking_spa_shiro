package mx.com.prosa.app.mail.beans;

/**
 * Bean for authenticate some user .
 * @author carlos
 *
 */
public class LoginForm {

    public LoginForm(){};
    
	public LoginForm(String username, String password, String access_media) {
        super();
        this.username = username;
        this.password = password;
        this.access_media = access_media;
    }
	
	
    private String username;
	private String password;
	private String access_media;
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    public String getAccess_media() {
        return access_media;
    }
    public void setAccess_media(String access_media) {
        this.access_media = access_media;
    }
}
